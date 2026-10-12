# NuclearPhysicsLab

Phòng thí nghiệm Vật lí hạt nhân trực tuyến: tám bài mô phỏng dành cho học sinh trung học phổ thông. Mỗi bài đi qua ba bước:

1. **Khám phá:** quan sát hiện tượng và tìm quy luật.
2. **Thí nghiệm:** thực hiện nhiệm vụ, đo và xử lí số liệu.
3. **Kiểm chứng:** đối chiếu kết quả với số liệu đo thật.

| Mô-đun | Bài | Thư mục |
| --- | --- | --- |
| 1. Cấu tạo và năng lượng hạt nhân | 1. Cấu tạo hạt nhân và đồng vị | `simulations/nuclear-structure/` |
| | 2. Năng lượng liên kết hạt nhân | `simulations/binding-energy/` |
| 2. Phóng xạ | 3. Các dạng phân rã phóng xạ | `simulations/radioactive-decay-types/` |
| | 4. Định luật phóng xạ và chu kì bán rã | `simulations/half-life/` |
| 3. Tương tác của bức xạ với vật chất | 5. Khả năng đâm xuyên của bức xạ | `simulations/radiation-penetration/` |
| | 6. Suy giảm cường độ tia gamma | `simulations/gamma-attenuation/` |
| 4. Phản ứng hạt nhân | 7. Phân hạch hạt nhân | `simulations/nuclear-fission/` |
| | 8. Nhiệt hạch hạt nhân | `simulations/nuclear-fusion/` |

## Cấu trúc thư mục

```
index.html                 Trang chủ (bản đồ hạt nhân N–Z và danh sách bài)
simulations/<bài>/         Mỗi bài: index.html, css/style.css, js/
  js/*-data.js             Số liệu của bài (khối lượng, chu kì bán rã, hệ số μ, ...)
  js/physics.js            Công thức vật lí, không phụ thuộc giao diện (có kiểm thử)
  js/real-data.js          Phần "Đối chiếu với dữ liệu thực" ở chế độ Kiểm chứng
assets/shared/
  tokens.css               Màu, phông chữ, khoảng cách dùng chung
  lesson-ui.css, .js       Khung chung của các bài: định hướng, ba chế độ, thông báo
  real-data.css, .js       Khung chung của phần đối chiếu dữ liệu thực
  constants.js             Hằng số vật lí dùng chung (1 u·c², khối lượng neutron, ...)
  site.css                 Trang chủ
assets/fonts/              Literata và Lab Sans (SIL OFL), xem README trong thư mục
assets/vendor/chartjs/     Chart.js 4.4.1 (MIT), lưu kèm để không phụ thuộc CDN
assets/images/             Hình minh họa và bản đồ hạt nhân
tools/                     Công cụ dựng lại bản đồ hạt nhân
tests/                     Kiểm thử vật lí và kiểm thử giao diện, xem tests/README.md
```

Trang không tải bất kì tệp nào từ máy chủ khác, nên vẫn chạy khi mạng của trường chặn CDN hoặc Google Fonts. Có thể mở trực tiếp bằng một máy chủ tĩnh bất kì, ví dụ `python3 -m http.server` rồi vào `http://localhost:8000`.

## Nguồn số liệu

| Số liệu | Nguồn |
| --- | --- |
| Khối lượng nguyên tử | AME2020 (Wang và cộng sự, Chinese Physics C 45, 030003, 2021) |
| Hằng số vật lí | CODATA 2018 và 2022 (NIST), ghi rõ trong `assets/shared/constants.js` |
| Chu kì bán rã | NNDC, Brookhaven National Laboratory |
| Hệ số suy giảm khối của tia γ | NIST, X-Ray Mass Attenuation Coefficients |
| Tầm xa của β | Công thức Katz–Penfold |
| Độ phổ biến đồng vị | CIAAW 2021 |
| Động năng mảnh phân hạch U-235 | Yanez và cộng sự (2015), arXiv:1512.06731 |

## Khi sửa mã

1. Chạy kiểm thử (xem `tests/README.md`):
   ```
   node tests/physics.test.js
   node tests/smoke.mjs
   ```
2. Tăng số phiên bản `?v=` của các tệp đã sửa để trình duyệt của học sinh tải lại bản mới:
   ```
   python3 tests/bump-versions.py main
   ```
3. Hằng số vật lí dùng ở nhiều bài chỉ được khai báo trong `assets/shared/constants.js`. Kiểm thử sẽ báo lỗi nếu một bài tự khai báo lại.

## Xuất bản bằng GitHub Pages

1. Vào **Settings → Pages**.
2. Ở **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn nhánh **main** và thư mục **/(root)**.
4. Lưu lại và chờ GitHub Pages xuất bản.

Mọi đường dẫn nội bộ đều là đường dẫn tương đối nên phù hợp với GitHub Pages dạng project site.

## Giấy phép của thành phần bên ngoài

- Chart.js 4.4.1: giấy phép MIT, `assets/vendor/chartjs/LICENSE.md`.
- Phông Literata và Lab Sans (bản rút gọn của IBM Plex Sans): SIL Open Font License 1.1, `assets/fonts/`.
