"""Tạo dữ liệu mảnh phân hạch U-235 (neutron nhiệt) cho Bài 7.

Nguồn:
- Hiệu suất phân hạch độc lập (MF = 8, MT = 454) của U-235 ở năng lượng
  neutron 0,0253 eV, thư viện ENDF/B-VIII.0 (D.A. Brown và cộng sự,
  Nuclear Data Sheets 148, 1, 2018). Tệp nfpy_9228_92-U-235.dat tải từ
  https://www-nds.iaea.org/public/download-endf/ENDF-B-VIII.0/nfpy/
- Độ dư khối lượng nguyên tử: NUBASE2020 (Kondev và cộng sự, Chinese
  Physics C 45, 030001, 2021), tệp nubase_4.mas20.txt.

Chạy: python3 tools/build-fission-yields.py <tệp ENDF> <nubase_4.mas20.txt>
Kết quả: simulations/nuclear-fission/js/fission-yield-data.js
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

MIN_YIELD = 1e-5  # bỏ các mảnh rất hiếm để tệp gọn


def endf_float(text):
    text = text.strip()
    if not text:
        return 0.0
    # Dạng ENDF: "2.05032-19" nghĩa là 2.05032e-19
    m = re.match(r"^([+-]?\d*\.?\d+)([+-]\d+)$", text)
    return float(f"{m.group(1)}e{m.group(2)}") if m else float(text)


def read_independent_yields(path):
    lines = [l for l in Path(path).read_text().splitlines()
             if len(l) >= 75 and l[70:72].strip() == "8" and l[72:75].strip() == "454"]
    values = []
    for line in lines[1:]:  # bỏ bản ghi HEAD
        values.extend(endf_float(line[i:i + 11]) for i in range(0, 66, 11))
    energy, _, _, _, count, nfp = values[:6]
    if abs(energy - 0.0253) > 1e-6:
        raise SystemExit(f"Bộ số liệu đầu tiên không phải neutron nhiệt (E = {energy} eV)")
    nfp = int(nfp)
    data = values[6:6 + 4 * nfp]
    yields = defaultdict(float)
    for k in range(nfp):
        za, _state, y, _dy = data[4 * k:4 * k + 4]
        za = int(round(za))
        yields[(za // 1000, za % 1000)] += y  # cộng các trạng thái đồng phân
    return yields


def read_mass_excess(path):
    excess = {}
    global symbols
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if line.startswith("#") or len(line) < 40 or line[7] != "0":
            continue
        A, Z = int(line[0:3]), int(line[4:7])
        symbols.setdefault(Z, re.sub(r"^\d+", "", line[11:16].strip()))
        value = line[18:31].strip().replace("#", "")
        if value:
            excess[(Z, A)] = float(value)
    return excess


symbols = {}
yields = read_independent_yields(sys.argv[1])
excess = read_mass_excess(sys.argv[2])

total = sum(yields.values())
mass_yield = defaultdict(float)
for (z, a), y in yields.items():
    mass_yield[a] += y

fragments = sorted(
    [[z, a, float(f"{y:.4g}"), excess[(z, a)]]
     for (z, a), y in yields.items() if y >= MIN_YIELD and (z, a) in excess],
    key=lambda r: (r[1], r[0]))

out = Path(__file__).resolve().parent.parent / "simulations" / "nuclear-fission" / "js" / "fission-yield-data.js"
out.write_text(f"""// fission-yield-data.js – tạo tự động bằng tools/build-fission-yields.py. Không sửa tay.
//
// Phân hạch U-235 bởi neutron nhiệt (0,0253 eV).
// Hiệu suất độc lập: ENDF/B-VIII.0, MF = 8, MT = 454 (Brown và cộng sự,
// Nuclear Data Sheets 148, 1, 2018); tổng hiệu suất độc lập = {total:.4f}
// (hai mảnh mỗi phân hạch). Độ dư khối lượng Δ (keV): NUBASE2020.
//
// FISSION_MASS_YIELD: [A, hiệu suất theo số khối Y(A) = Σ_Z Y(Z, A)], tính trên một phân hạch.
// FISSION_FRAGMENTS: [Z, A, hiệu suất độc lập Y(Z, A), Δ (keV)] với Y ≥ {MIN_YIELD:g}.

const FISSION_MASS_EXCESS_KEV = {{
    U235: {excess[(92, 235)]},
    neutron: {excess[(0, 1)]}
}};

// Kí hiệu nguyên tố của các mảnh (theo NUBASE2020)
const FISSION_SYMBOLS = {json.dumps({z: symbols[z] for z in sorted({r[0] for r in fragments} | {92})}, ensure_ascii=False)};

const FISSION_MASS_YIELD = {json.dumps([[a, float(f"{mass_yield[a]:.4g}")] for a in sorted(mass_yield) if mass_yield[a] >= MIN_YIELD], separators=(",", ":"))};

const FISSION_FRAGMENTS = [
{chr(10).join("    " + json.dumps(r, separators=(",", ":")) + "," for r in fragments).rstrip(",")}
];
""", encoding="utf-8")
print(out, out.stat().st_size, "byte; tổng Y =", round(total, 5), "; mảnh:", len(fragments),
      "; A:", min(mass_yield), "–", max(mass_yield))
