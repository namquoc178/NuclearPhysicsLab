"""Tạo bảng hệ số suy giảm khối μ/ρ của tia γ cho Bài 5 và Bài 6.

Nguồn: J.H. Hubbell, S.M. Seltzer, "Tables of X-Ray Mass Attenuation
Coefficients and Mass Energy-Absorption Coefficients", NIST Standard
Reference Database 126 (https://physics.nist.gov/PhysRefData/XrayMassCoef/).
Lưu các trang bảng (HTML) vào một thư mục với tên:
    nist-chi.html (chì, Z = 82)      nist-nhom.html (nhôm, Z = 13)
    nist-nuoc.html (nước lỏng)       nist-H.html, nist-C.html, nist-O.html

Giấy được coi là cellulose (C6H10O5). μ/ρ của hợp chất tính theo quy tắc
cộng khối lượng: μ/ρ = Σ wᵢ·(μ/ρ)ᵢ, với wᵢ là phần khối lượng của nguyên
tố i (khối lượng nguyên tử chuẩn IUPAC: H 1,008; C 12,011; O 15,999).

Chạy: python3 tools/build-nist-gamma.py <thư mục chứa các tệp HTML>
Kết quả: assets/shared/gamma-mu-data.js
"""
import html
import json
import re
import sys
from pathlib import Path

E_MIN, E_MAX = 0.01, 5.0  # MeV: chỉ giữ khoảng năng lượng cần cho bài

folder = Path(sys.argv[1])
ROW = re.compile(r"(?:\b[KLM]\d?\s+)?(\d\.\d+E[-+]\d+)\s+(\d\.\d+E[-+]\d+)\s+(\d\.\d+E[-+]\d+)")


def read_table(name):
    text = html.unescape(re.sub(r"<[^>]+>", " ", (folder / name).read_text(encoding="latin-1")))
    rows = [(float(e), float(mu)) for e, mu, _ in ROW.findall(text)]
    if len(rows) < 20:
        raise SystemExit(f"{name}: không đọc được bảng")
    return rows


def clip(rows):
    # Giữ thêm một điểm ở mỗi đầu để nội suy được tới đúng biên.
    inside = [i for i, (e, _) in enumerate(rows) if E_MIN <= e <= E_MAX]
    lo, hi = max(inside[0] - 1, 0), min(inside[-1] + 1, len(rows) - 1)
    return rows[lo:hi + 1]


lead = clip(read_table("nist-chi.html"))
aluminum = clip(read_table("nist-nhom.html"))
water = clip(read_table("nist-nuoc.html"))
h, c, o = (read_table(f"nist-{x}.html") for x in "HCO")

# Cellulose C6H10O5
masses = {"H": 10 * 1.008, "C": 6 * 12.011, "O": 5 * 15.999}
total = sum(masses.values())
w = {k: v / total for k, v in masses.items()}
energies_h = [e for e, _ in h]
assert energies_h == [e for e, _ in c] == [e for e, _ in o], "lưới năng lượng H, C, O phải trùng nhau"
paper = clip([(e, w["H"] * mh + w["C"] * mc + w["O"] * mo)
              for (e, mh), (_, mc), (_, mo) in zip(h, c, o)])

def pack(rows):
    return [[e, float(f"{mu:.4g}")] for e, mu in rows]

data = {
    "lead": {"label": "Chì", "density": 11.35, "table": pack(lead)},
    "aluminum": {"label": "Nhôm", "density": 2.699, "table": pack(aluminum)},
    "water": {"label": "Nước", "density": 1.0, "table": pack(water)},
    "paper": {"label": "Giấy (cellulose)", "density": 0.8, "table": pack(paper)},
}

out = Path(__file__).resolve().parent.parent / "assets" / "shared" / "gamma-mu-data.js"
body = ",\n".join(f'    {key}: {json.dumps(value, ensure_ascii=False, separators=(",", ":"))}'
                  for key, value in data.items())
out.write_text(f"""// gamma-mu-data.js – tạo tự động bằng tools/build-nist-gamma.py. Không sửa tay.
//
// Hệ số suy giảm khối μ/ρ (cm²/g, gồm cả tán xạ kết hợp) của photon theo
// năng lượng E (MeV), từ NIST Standard Reference Database 126
// (Hubbell & Seltzer). Giấy coi là cellulose C6H10O5, tính theo quy tắc cộng
// khối lượng từ bảng của H, C, O: w(H) = {w['H']:.5f}, w(C) = {w['C']:.5f}, w(O) = {w['O']:.5f}.
// Khối lượng riêng (g/cm³): chì 11,35; nhôm 2,699; nước 1,0; giấy ≈ 0,8.
// Mỗi bảng: [[E (MeV), μ/ρ (cm²/g)], ...]; điểm trùng E là bờ hấp thụ K.

const GAMMA_MU_DATA = {{
{body}
}};


// μ/ρ (cm²/g) tại năng lượng E (MeV): nội suy tuyến tính theo log E và log μ/ρ,
// như NIST khuyến nghị. Ở bờ hấp thụ K của chì (88 keV), lấy nhánh phía
// năng lượng cao khi E lớn hơn hoặc bằng năng lượng bờ.
function getMassAttenuation(material, energyMeV) {{
    const entry = GAMMA_MU_DATA[material];
    if (!entry) throw new Error(`Không có bảng μ/ρ cho vật liệu "${{material}}".`);
    const table = entry.table;
    if (energyMeV < table[0][0] || energyMeV > table[table.length - 1][0]) {{
        throw new Error(`Năng lượng ${{energyMeV}} MeV nằm ngoài bảng μ/ρ.`);
    }}
    let i = 0;
    while (i < table.length - 2 && table[i + 1][0] <= energyMeV) i++;
    const [e1, m1] = table[i];
    const [e2, m2] = table[i + 1];
    if (e2 === e1) return m2;
    const t = Math.log(energyMeV / e1) / Math.log(e2 / e1);
    return Math.exp(Math.log(m1) + t * Math.log(m2 / m1));
}}


// Hệ số suy giảm tuyến tính μ (mm⁻¹) = (μ/ρ)·ρ / 10.
function getLinearAttenuationPerMm(material, energyMeV) {{
    return getMassAttenuation(material, energyMeV) * GAMMA_MU_DATA[material].density / 10;
}}
""", encoding="utf-8")
print(out, out.stat().st_size, "byte;", {k: len(v["table"]) for k, v in data.items()})
