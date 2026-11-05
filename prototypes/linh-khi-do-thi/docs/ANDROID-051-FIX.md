# Android 0.5.1 — sửa lỗi không khởi động, 05/11/2026

APK 0.5 khai báo vn.anhoa.academy.MainActivity trong manifest nhưng không định nghĩa lớp đó trong bất kỳ classes*.dex nào. Điều này gây lỗi nạp Activity khi mở ứng dụng. Chưa có logcat từ điện thoại người dùng; lỗi đóng gói được xác nhận trực tiếp từ APK đã bàn giao.

Build sạch với clean, --no-build-cache và --rerun-tasks đã đưa MainActivity cùng các lớp con vào classes3.dex. Cache của build tăng dần sau khi di chuyển file Java là nguyên nhân nghi ngờ; chưa tái hiện độc lập cơ chế cache.

- versionCode 6, versionName 0.5.1-demo.
- Cùng applicationId và chứng chỉ ký với 0.5, hỗ trợ cài đè giữ dữ liệu.
- assembleDebug và lintDebug thành công.
- apksigner verify: chữ ký v2 hợp lệ.
- scripts/verify-android-apk.py đối chiếu launcher trong manifest với định nghĩa lớp thực trong tất cả DEX; kiểm tra offline loader, 300 câu và từng file assets trùng nguồn.
- Kiểm tra hồi quy: APK 0.5 bị từ chối vì thiếu lớp; 0.5.1 đạt.
- Chưa chạy bản sửa trên thiết bị Android: adb không có thiết bị kết nối.

Từ nay trước khi bàn giao: build sạch, xác minh chữ ký và chạy verify-android-apk.py; không coi Lint hoặc chữ ký là bằng chứng app khởi động được.
