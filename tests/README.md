# Kiểm thử tự động

Chạy cả hai bộ kiểm thử trước khi đưa một thay đổi lên `main`.

## 1. Kiểm thử vật lí (không cần cài gì)

```
node tests/physics.test.js
```

Kiểm tra: N = A − Z cho mọi đồng vị; quy tắc ΔA, ΔZ của α, β⁻, β⁺, γ;
trung bình Monte Carlo của bài Chu kì bán rã; Eₗₖ/A so với AME2020 (sai lệch ≤ 1 keV/nucleon);
bảo toàn A, Z và Q của các phản ứng phân hạch, nhiệt hạch; tỉ lệ truyền qua của α, β, γ;
bề dày bán giảm của tia γ; các bài dùng chung một bộ hằng số vật lí.

## 2. Kiểm thử giao diện (cần Playwright)

```
npm install --no-save playwright
npx playwright install chromium
node tests/smoke.mjs
```

Mở 9 trang ở kích thước máy tính (1440 × 1000) và điện thoại (390 × 844), bấm nút chạy chính,
chuyển qua 3 chế độ, báo lỗi JavaScript, tràn ngang hoặc chế độ hiển thị sai.
Kiểm thử cũng báo lỗi nếu trang tải tệp từ máy chủ khác, có tệp bị thiếu (404),
hoặc nhập sai mà không hiện thông báo trong trang. Không cần mạng khi chạy.
Ảnh chụp từng trang được lưu ở `tests/output/` để so sánh trước và sau khi sửa.
