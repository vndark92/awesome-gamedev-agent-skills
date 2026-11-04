# Linh Khí Đô Thị — An Hòa

Demo một người chơi, dùng JavaScript ES modules + Canvas 2D dựng phối cảnh 2.5D. Không cần cài dependency.

## Chạy

Yêu cầu Node.js 22 trở lên. Từ thư mục này:

```sh
node server.mjs
```

Mở http://127.0.0.1:4173. Kiểm tra logic: `node --test tests/engine.test.mjs`.

## Chơi

Chọn đạo lộ và linh căn; tuần tra ba đợt, dùng linh thạch học kỹ năng hoặc nâng cấp, đủ tu vi thì đột phá. Chủ động thử thách thủ lĩnh. Thanh tẩy hoặc trấn áp để mở khu vực kế tiếp. Tất cả đạo lộ, linh căn, pháp bảo và đồng hành có thể đổi miễn phí ngoài trận.

Tu vi tích lũy ngoại tuyến tối đa 12 giờ; linh thạch chỉ tích lũy ngoại tuyến khi đang tuần tra một vùng đã vượt thủ lĩnh. Lưu theo trình duyệt bằng localStorage, có bản dự phòng, xuất/nhập JSON. Không có tài khoản hoặc đồng bộ máy. Demo cho phép chỉnh dữ liệu phía máy người chơi; không dùng cho bảng xếp hạng cạnh tranh.

## Phạm vi thực tế

- Ba đạo lộ với nhịp chiến đấu khác nhau; 18 nút nâng chỉ số, kỹ năng chủ đạo tự phát mỗi ba lượt.
- Năm linh căn, năm đồng hành, tương sinh và tương khắc.
- Ba khu vực, chín tên địch thường, ba thủ lĩnh; sáu đoạn truyện, lựa chọn và hai kết thúc.
- Ba cảnh giới; luyện thể, cường hóa linh trang hợp nhất, ba pháp bảo.
- Bộ hình anime 0.2: 3 nhân vật, 3 bối cảnh, 3 thủ lĩnh, 5 linh thú và 9 quái thường. 18 biểu tượng công pháp SVG, 3 khung co giãn và 5 hiệu ứng ngũ hành bằng Canvas.
- Chân dung theo đạo lộ, ảnh khu vực, sprite có bóng đổ/điểm đặt chân, chuyển động chờ/ra đòn/trúng đòn. Họa quyển tại `gallery.html` cho phép thử mọi tổ hợp mà không đụng tới bản lưu.

Giới hạn: địch thường trong cùng vùng dùng chung chỉ số; chưa có kỹ năng boss riêng, ba ô trang bị độc lập, âm thanh hoặc hệ thống tài khoản. Mục đích là kiểm chứng vòng chơi và lựa chọn đạo lộ.

Hoạt ảnh hiện là chuyển động của sprite tĩnh và VFX lập trình, chưa có bộ khung hình chạy/đánh hoặc rig xương. Nền là ảnh vẽ phẳng theo phối cảnh, kết hợp nhân vật, bóng và hiệu ứng độc lập; không phải bản đồ 3D có thể xoay camera.

## Tài liệu

- [Cốt truyện](docs/STORY.md)
- [Thiết kế và kế hoạch](docs/PLAN.md)
- [Quy chuẩn đồ họa và nguồn tài nguyên](art/ART-DIRECTION.md)

Ảnh gốc nằm trong `art/source/`, ảnh dùng trên web trong `dist/assets/`. `art/prompts.json` lưu bộ prompt. Công cụ chuẩn hóa yêu cầu `sharp`: `node scripts/prepare-art.mjs`; SVG tái tạo bằng `node scripts/build-ui-art.mjs`. Game không cần các dependency biên tập này để chạy. Lưu vẫn dùng schema v1, tương thích bản 0.1.

Nguồn hướng dẫn: `router`, `rpg`, `save-systems` trong repo. Mã game nằm riêng, không sửa catalog skill. Sites đóng gói thư mục `dist` để phát hành riêng tư.

