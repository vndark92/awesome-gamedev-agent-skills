# Academy 0.6 — kiểm tra 05/11/2026

24/24 tests Node đạt, gồm ôn câu sai, huy hiệu, dữ liệu cũ, chuyển lượt, sát thương và vẽ 3 nhánh × 5 nguyên tố ở các thời điểm của đòn người chơi/NPC. Kiểm tra giảm chuyển động có giữ số sát thương.

Trình duyệt: mở Sổ tay từ dữ liệu cũ; trả lời sai → NPC phản công → kết thúc trận → mở lại câu sai trong góc ôn → trả lời đúng → câu được xóa khỏi danh sách; reload xác nhận dữ liệu giữ lại. Kiểm tra tấn công Bình thường trừ 125 HP và hiệu ứng canvas hoạt động.

Android: clean assembleDebug lintDebug --no-build-cache --rerun-tasks thành công. verify-android-apk xác nhận lớp MainActivity thực có trong DEX, asset loader, 300 câu và toàn bộ game assets khớp mã nguồn. apksigner xác nhận chữ ký v2 cùng chứng chỉ với 0.5.1. versionCode 7, versionName 0.6-demo.

Chưa chạy APK trên điện thoại thật hoặc emulator. Ngân hàng câu hỏi chưa qua giáo viên thẩm định. Không có nội dung video hoặc sprite mới trong phiên bản này; hiệu ứng lập trình dùng tài nguyên hiện có.
