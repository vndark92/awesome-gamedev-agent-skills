# Kiểm tra Họa cảnh 0.2

Ngày kiểm tra: 2026-11-04.

- `node scripts/check-art.mjs`: đạt; 23 ảnh WebP, 18 icon SVG, 3 khung SVG; kiểm tra 15 tổ hợp đạo lộ/ngũ hành qua 5 thời điểm hiệu ứng. Tổng ảnh tải 3.59 MiB, texture giải nén 46.8 MiB.
- `node --test tests/engine.test.mjs`: 6/6 đạt; phần thưởng offline, giới hạn khu vực, save, tiến trình, ngũ hành và khả năng vượt boss của ba đạo lộ.
- `python scripts/validate-skills.py` tại gốc repo: 78 skill và liên kết repo hợp lệ.
- Kiểm tra trình duyệt: nhân vật, nền, chân sprite và bóng; đổi ba đạo lộ, ba vùng và thử hiệu ứng trong Họa quyển. Toàn bộ 23 ảnh đã tải.
- Kiểm tra màn hình 390 × 844: không tràn ngang, không ảnh lỗi trong DOM. Đây là kiểm tra bố cục trên trình duyệt, chưa phải kiểm thử hiệu năng trên điện thoại thật.
- Ảnh minh chứng giao diện: `previews/game-desktop.png`.

Giới hạn: sprite chuyển động bằng nội suy; chưa có animation từng khung hình, skeleton rig hoặc nền parallax nhiều lớp.
