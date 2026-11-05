# Học viện Linh thú 0.5 — demo Android

Ngày đóng gói: 05/11/2026.

## Cài đặt
1. Chép HocVienLinhThu-0.5-demo.apk sang điện thoại Android 8.0 trở lên.
2. Mở file APK. Nếu Android hỏi, cho phép ứng dụng đang mở file cài ứng dụng từ nguồn này, rồi chọn Cài đặt.
3. Mở Học viện Linh thú. Chọn Bắt đầu câu chuyện để xem phim 10 giây và vào hướng dẫn.
4. Có thể tắt mạng: game và câu hỏi đã nằm trong APK. Liên kết tham khảo ngoài app cần mạng.

## Đã có
- 300 câu lớp 2, ba mức độ; bốn môn.
- Mở đầu, hướng dẫn, năm bản đồ, kết thúc hành trình.
- Lượt học viên và lượt NPC; sát thương 100 / 125 / 150.
- Giao diện ngang/dọc, toàn màn hình, nút Back, lưu tiến độ bản đồ trên máy.
- Xuất ngân hàng JSON/CSV qua hộp thoại lưu tệp Android.

## Kiểm tra đã thực hiện
- 18/18 kiểm tra JavaScript đạt.
- assembleDebug và lintDebug thành công: 0 lỗi, 5 cảnh báo đã xem xét (API tương thích, phiên bản thư viện, xoay màn hình, JavaScript cần cho game, cấu hình sao lưu).
- apksigner xác minh chữ ký APK v2 thành công.
- Kiểm tra manifest: Android tối thiểu API 26, target API 35, Activity khởi động hợp lệ, không yêu cầu quyền Internet.
- Kiểm tra file APK có đúng 300 câu hỏi, phim và hình nền.

## Giới hạn
Đây là APK thử nghiệm ký bằng debug key, chưa phải bản phát hành Play Store. Chưa cài/chạy trên điện thoại thật hoặc máy ảo Android vì không có thiết bị kết nối. Cần thử các bước trong android/README.md trên điện thoại, đặc biệt video, xoay màn hình, Back và lưu tệp. Trận đang chơi chưa hoàn tất sẽ bắt đầu lại sau khi đóng app; bản đồ đã mở và mảnh ghép vẫn lưu. Gỡ app/xóa dữ liệu sẽ mất tiến độ.

Ngân hàng câu hỏi chưa qua giáo viên thẩm định và chưa đối chiếu đầy đủ từng trang sách. Bản demo có các biến thể cùng dạng bài.
