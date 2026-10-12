"""Tạo hình nền bản đồ hạt nhân (N–Z) cho trang chủ.

Dữ liệu: tệp periodictable/mass.py của thư viện periodictable
(https://github.com/pkienzle/periodictable), trong đó
- khối lượng lấy từ AME2020 (Wang và cộng sự, Chinese Phys. C 45, 030003, 2021);
- độ phổ biến tự nhiên lấy từ CIAAW 2021.

Ô nhạt: hạt nhân có khối lượng đo được trong AME2020 (bỏ các giá trị ước
lượng có dấu #). Ô đậm: hạt nhân có trong tự nhiên (độ phổ biến > 0).

Chạy: python3 tools/build-nuclide-chart.py <đường dẫn tới mass.py>
Kết quả: assets/images/nuclide-chart.svg và lớp đánh dấu bài học được
chèn vào index.html giữa hai chú thích <!-- nuclide-chart:start/end -->.
"""
import re
import sys
from pathlib import Path

# Khung tọa độ dùng chung với lớp đánh dấu bài học trong index.html:
# x = N, y = Z_TOP - Z (Z tăng lên phía trên), mỗi hạt nhân là một ô 1 × 1.
Z_TOP = 112
VIEWBOX = "-16 -4 186 128"

source = Path(sys.argv[1]).read_text(encoding="utf-8")
row = re.compile(r"^(\d+)-([A-Z][a-z]?)-(\d+),([^,]*),([^,]*),", re.M)

measured, natural = [], []
for z, _sym, a, mass, abundance in row.findall(source):
    z, a = int(z), int(a)
    n = a - z
    if z == 0:
        continue
    if abundance.strip():
        natural.append((n, z))
    elif "#" not in mass:
        measured.append((n, z))


def cells(points):
    # Mỗi ô là một đoạn đường khép kín; gộp tất cả vào một <path> cho nhẹ.
    return "".join(f"M{n} {Z_TOP - z}h1v1h-1z" for n, z in sorted(points))


svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX}" preserveAspectRatio="xMidYMid meet">
<!-- Bản đồ hạt nhân. Tạo bằng tools/build-nuclide-chart.py.
     Ô nhạt: {len(measured)} hạt nhân có khối lượng đo được (AME2020).
     Ô đậm: {len(natural)} hạt nhân có trong tự nhiên (CIAAW 2021). -->
<path d="{cells(measured)}" fill="#c9d3e0"/>
<path d="{cells(natural)}" fill="#15233b"/>
</svg>
"""

# ----------------------------------------------------------------------
# Lớp phủ: trục, đường N = Z và điểm đánh dấu tám bài học.
# Mỗi bài gắn với một hạt nhân tiêu biểu; vòng tròn số đặt lệch sang vùng
# trống của bản đồ và nối với ô hạt nhân bằng một đoạn thẳng.
LESSONS = [
    # (số, đường dẫn, tên bài, hạt nhân, N, Z, vị trí vòng tròn x, y)
    (1, "nuclear-structure", "Cấu tạo hạt nhân và đồng vị", "carbon-12", 6, 6, 7, 92),
    (2, "binding-energy", "Năng lượng liên kết hạt nhân", "sắt-56", 30, 26, 19, 73),
    (3, "radioactive-decay-types", "Các dạng phân rã phóng xạ", "uranium-238", 146, 92, 159, 31),
    (4, "half-life", "Định luật phóng xạ và chu kì bán rã", "iodine-131", 78, 53, 64, 47),
    (5, "radiation-penetration", "Khả năng đâm xuyên của bức xạ", "strontium-90", 52, 38, 41, 61),
    (6, "gamma-attenuation", "Suy giảm cường độ tia gamma", "caesium-137", 82, 55, 97, 67),
    (7, "nuclear-fission", "Phân hạch hạt nhân", "uranium-235", 143, 92, 131, 8),
    (8, "nuclear-fusion", "Nhiệt hạch hạt nhân", "helium-4", 2, 2, 18, 108),
]


def overlay():
    base = Z_TOP + 1.5
    parts = ['<g class="chart-axes" aria-hidden="true">',
             f'<path d="M-1 {base}H164M-1 {base}V-1"/>']
    for n in range(0, 161, 20):
        parts.append(f'<path d="M{n} {base}v1.6"/><text x="{n}" y="{base + 5.6}" text-anchor="middle">{n}</text>')
    for z in range(0, 111, 20):
        parts.append(f'<path d="M-1 {Z_TOP - z + 0.5}h-1.6"/><text x="-4" y="{Z_TOP - z + 1.7}" text-anchor="end">{z}</text>')
    parts.append(f'<text class="axis-title" x="164" y="{base - 2.4}" text-anchor="end">Số neutron N</text>')
    parts.append('<text class="axis-title" x="1.5" y="2.5">Số proton Z</text>')
    parts.append(f'<path class="nz-line" d="M0 {Z_TOP}L104 {Z_TOP - 104}"/>')
    parts.append(f'<text class="nz-label" x="99" y="{Z_TOP - 104}" text-anchor="end">N = Z</text>')
    parts.append('</g>')
    for number, slug, title, nuclide, n, z, mx, my in LESSONS:
        cx, cy = n + 0.5, Z_TOP - z + 0.5
        parts.append(
            f'<a class="chart-marker" href="simulations/{slug}/index.html" '
            f'aria-label="Bài {number}: {title} ({nuclide})">'
            f'<title>Bài {number}: {title} ({nuclide})</title>'
            f'<path class="marker-leader" d="M{cx} {cy}L{mx} {my}"/>'
            f'<rect class="marker-cell" x="{n - 0.6}" y="{Z_TOP - z - 0.6}" width="2.2" height="2.2"/>'
            f'<circle cx="{mx}" cy="{my}" r="4.2"/>'
            f'<text x="{mx}" y="{my + 1.75}" text-anchor="middle">{number}</text></a>')
    return "\n".join(parts)


out = Path(__file__).resolve().parent.parent / "assets" / "images" / "nuclide-chart.svg"
out.write_text(svg, encoding="utf-8")
print(f"{out}: {len(measured)} measured, {len(natural)} natural, {out.stat().st_size} bytes")

index = out.parent.parent.parent / "index.html"
html = index.read_text(encoding="utf-8")
start, end = "<!-- nuclide-chart:start -->", "<!-- nuclide-chart:end -->"
if start in html and end in html:
    head, rest = html.split(start, 1)
    _, tail = rest.split(end, 1)
    block = (f'{start}\n<svg class="chart-overlay" viewBox="{VIEWBOX}" preserveAspectRatio="xMidYMid meet" '
             f'role="group" aria-label="Tám bài học đặt trên bản đồ hạt nhân">\n{overlay()}\n</svg>\n{end}')
    index.write_text(head + block + tail, encoding="utf-8")
    print("index.html: overlay updated")
