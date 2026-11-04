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
- Phong cảnh, nhân vật và VFX vẽ bằng Canvas; hình ảnh anime mới ở mức cách điệu, chưa phải asset sản xuất hoàn chỉnh.

Giới hạn: địch thường trong cùng vùng dùng chung chỉ số; chưa có kỹ năng boss riêng, ba ô trang bị độc lập, âm thanh hoặc hệ thống tài khoản. Mục đích là kiểm chứng vòng chơi và lựa chọn đạo lộ.

## Tài liệu

- [Cốt truyện](docs/STORY.md)
- [Thiết kế và kế hoạch](docs/PLAN.md)

Nguồn hướng dẫn: `router`, `rpg`, `save-systems` trong repo. Mã game nằm riêng, không sửa catalog skill. Sites đóng gói thư mục `dist` để phát hành riêng tư.

