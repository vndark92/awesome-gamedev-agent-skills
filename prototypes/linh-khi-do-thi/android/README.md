# Học viện Linh thú — Android demo 0.5

Android 8.0 trở lên. Bản thử nghiệm cài trực tiếp, chưa phải bản Play Store.

## Nội dung
300 câu hỏi lớp 2, 100 câu mỗi mức Dễ / Bình thường / Khó. Phim mở đầu 10 giây, hướng dẫn, 5 bản đồ và chiến đấu theo lượt. Chọn độ khó mỗi lượt gây 100 / 125 / 150 sát thương. NPC phản công gây 1 sinh lực sau câu đúng, 2 sau câu sai. Có giải thích đáp án.

Game, phim và hình ảnh được đóng gói trong APK, chơi offline, không cần tài khoản. Tiến độ bản đồ được lưu trên thiết bị; trận chưa kết thúc sẽ bắt đầu lại khi đóng/mở app. Không có quyền Internet, camera, vị trí hoặc lưu trữ rộng. Tải JSON/CSV bằng hộp thoại chọn nơi lưu của Android; liên kết HTTPS bên ngoài mở trình duyệt.

## Build
JDK 17, Gradle 8.9, Android SDK Platform 35, Build Tools 35.0.0. Đồng bộ dist vào app/src/main/assets/game bằng scripts/sync-android.ps1 trước khi build. Khai báo sdk.dir trong local.properties (không commit). Chạy .\gradlew.bat :app:assembleDebug :app:lintDebug. Nếu công cụ Java gặp lỗi đường dẫn tiếng Việt, sao chép dự án và JDK vào đường dẫn không dấu trước khi build. APK được ký bằng khóa debug, không dùng để phát hành Play Store.

## Kiểm tra trên điện thoại
1. Cài APK, bật chế độ máy bay rồi mở: thấy màn chào, xem phim 10 giây, hoàn thành hướng dẫn.
2. Chọn từng độ khó; trả lời đúng/sai; NPC phản công đúng một lần; nút tấn công khóa khi NPC đang đánh.
3. Xoay ngang/dọc, toàn màn hình, Back để tạm dừng, ra nền và mở lại.
4. Hoàn thành bản đồ, đóng/mở app, kiểm tra mảnh ghép còn lưu.
5. Thử lưu JSON/CSV và mở nguồn sách trong trình duyệt.

Ngân hàng câu hỏi tự biên soạn, chưa được giáo viên thẩm định hoặc đối chiếu đầy đủ mọi trang SGK. Không dùng điểm chơi để đánh giá năng lực trẻ.
