"""Tạo tệp dữ liệu hạt nhân cho Bài 1 từ NUBASE2020.

Nguồn: F.G. Kondev, M. Wang, W.J. Huang, S. Naimi, G. Audi,
"The NUBASE2020 evaluation of nuclear physics properties",
Chinese Physics C 45, 030001 (2021). Tệp nubase_4.mas20.txt tải từ
https://www-nds.iaea.org/amdc/ (Atomic Mass Data Center).

Chỉ lấy trạng thái cơ bản (không lấy đồng phân) của các hạt nhân đã được
quan sát, tức là có năm phát hiện trong cột "Discovery". Các hạt nhân
chỉ có giá trị ước lượng từ hệ thống (không có năm phát hiện) bị bỏ qua:
với Bài 1, đó là các hạt nhân "chưa được quan sát".

Chạy: python3 tools/build-nubase-data.py <đường dẫn tới nubase_4.mas20.txt>
Kết quả: simulations/nuclear-structure/js/nubase-data.js
"""
import json
import re
import sys
from pathlib import Path

# Đổi đơn vị chu kì bán rã ra giây. 1 năm = 365,2422 ngày, như NUBASE2020 dùng.
YEAR = 365.2422 * 86400
UNIT_SECONDS = {
    "ys": 1e-24, "zs": 1e-21, "as": 1e-18, "fs": 1e-15, "ps": 1e-12,
    "ns": 1e-9, "us": 1e-6, "ms": 1e-3, "s": 1.0, "m": 60.0, "h": 3600.0,
    "d": 86400.0, "y": YEAR, "ky": 1e3 * YEAR, "My": 1e6 * YEAR,
    "Gy": 1e9 * YEAR, "Ty": 1e12 * YEAR, "Py": 1e15 * YEAR,
    "Ey": 1e18 * YEAR, "Zy": 1e21 * YEAR, "Yy": 1e24 * YEAR,
}

source = Path(sys.argv[1]).read_text(encoding="utf-8").splitlines()

symbols = {}
rows = []
for line in source:
    if line.startswith("#") or len(line) < 20:
        continue
    A = int(line[0:3])
    Z = int(line[4:7])
    state = line[7]
    name = line[11:16].strip()
    symbol = re.sub(r"^\d+", "", name)
    symbols.setdefault(Z, symbol)
    if state != "0":
        continue
    discovery = line[114:118].strip()
    if not discovery:
        continue

    t_value = line[69:78].strip()
    t_unit = line[78:80].strip()
    branches = line[119:].strip()

    if t_value == "stbl":
        half_life = "stbl"
        seconds = None
    elif t_value == "p-unst" or not t_value:
        half_life = t_value or "?"
        seconds = None
    else:
        half_life = f"{t_value} {t_unit}".strip()
        number = re.sub(r"[^0-9.eE+-]", "", t_value)
        try:
            seconds = float(number) * UNIT_SECONDS[t_unit]
        except (ValueError, KeyError):
            seconds = None

    abundance = None
    modes = []
    for part in branches.split(";"):
        part = part.strip()
        if not part:
            continue
        key = re.split(r"[=<>~ ]", part, maxsplit=1)[0]
        if key == "IS":
            match = re.match(r"IS=([0-9.]+)", part)
            if match:
                abundance = float(match.group(1))
            continue
        modes.append(key)

    rows.append([Z, A, half_life, None if seconds is None else float(f"{seconds:.4g}"),
                 abundance, " ".join(modes[:3])])

rows.sort(key=lambda r: (r[0], r[1]))
max_z = max(symbols)
symbol_list = [symbols.get(z, "") for z in range(max_z + 1)]

out = Path(__file__).resolve().parent.parent / "simulations" / "nuclear-structure" / "js" / "nubase-data.js"
lines = [
    "// nubase-data.js – tạo tự động bằng tools/build-nubase-data.py. Không sửa tay.",
    "//",
    "// Nguồn: NUBASE2020 – F.G. Kondev, M. Wang, W.J. Huang, S. Naimi, G. Audi,",
    "// Chinese Physics C 45, 030001 (2021). Tệp nubase_4.mas20.txt (AMDC/IAEA).",
    f"// Trạng thái cơ bản của {len(rows)} hạt nhân đã được quan sát (có năm phát hiện).",
    "//",
    "// Mỗi dòng: [Z, A, chu kì bán rã như trong NUBASE (\"stbl\" = bền),",
    "//            chu kì bán rã quy ra giây (null nếu bền hoặc không rõ),",
    "//            độ phổ cập trong tự nhiên (%, null nếu không có trong tự nhiên),",
    "//            các kiểu phân rã chính theo kí hiệu NUBASE]",
    "",
    "const NUBASE_SYMBOLS = " + json.dumps(symbol_list, ensure_ascii=False) + ";",
    "",
    "const NUBASE_NUCLIDES = [",
]
lines += ["    " + json.dumps(r, ensure_ascii=False, separators=(",", ":")) + "," for r in rows]
lines[-1] = lines[-1].rstrip(",")
lines += ["];", ""]
out.write_text("\n".join(lines), encoding="utf-8")
print(f"{out}: {len(rows)} hạt nhân, {out.stat().st_size} byte")
