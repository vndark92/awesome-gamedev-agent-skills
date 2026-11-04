# Học viện Linh thú 0.3 — năm mảnh tri thức

## Nội dung thực hiện

300 câu tự biên soạn: Toán 120, Tiếng Việt 60, TNXH 60, Tiếng Anh 60; mỗi mức Dễ/Bình thường/Khó 100 câu. Nguồn biên soạn tái tạo: scripts/build-academy-bank.mjs. Xuất đồng nhất questions.js, question-bank.json và CSV UTF-8 BOM. Các biến thể cùng dạng được công khai; không gắn nhãn phủ đủ chương trình hay đã được giáo viên duyệt.

Mở đầu: MP4 H.264/AAC 960×540, 24 fps, đúng 10 giây. Ba cảnh minh họa với chuyển động máy quay, linh thú, hạt sáng và nhạc tổng hợp gốc. Chữ dẫn trong giao diện, phụ đề VTT, nút bỏ qua, chỉ phát sau tương tác. Không tự bật âm thanh.

Hướng dẫn: ba bước + một câu thực hành, không trừ lá chắn/ghi điểm trong lượt tập. Có thể xem lại trong Tùy chọn.

Năm map khác nền và lời dẫn: Hẻm An Hòa, Thư viện Gió, Vườn Vọng Nguyệt, Ga Mây Xanh, Đồi Bình Minh. Mỗi map có hai chặng (3 và 4 đáp án đúng), ba lá chắn, trạng thái thắng/thua, thử lại, 1–3 sao, mở khóa tuần tự và kết thúc sau năm mảnh ghép. Bản đồ cũ có thể chơi lại. Bộ câu không lặp trong một lượt rút hết bộ theo môn/mức.

Đúng: xem lời giải, tung phép, trừ một lớp sương. Sai/hết giờ: xem lời giải, linh thú đỡ đòn, mất một lá chắn. Tạm dừng giữ câu và thời gian. Tab ẩn dừng đồng hồ và vẽ cảnh. Mặc định không đếm giờ; tùy chọn 15 giây. Độ khó độc lập với thời gian.

Lưu localStorage khóa anhoa-academy-v3, độc lập save idle. Lưu mảnh ghép, sao, tổng câu và tùy chọn; trận đang diễn ra khởi động lại khi tải trang. Có xử lí dữ liệu hỏng hoặc lưu bị chặn. Không tài khoản hay dữ liệu nhận dạng trẻ.

## Đồ họa

Hai ảnh mới tạo bằng built-in image_gen, giữ PNG ở art/source/bg-library.png và bg-rooftop.png, WebP ở dist/assets. Prompt trong art/academy-prompts.json. Video tái tạo bằng scripts/build-intro.mjs, cần sharp và ffmpeg (đường dẫn ACADEMY_FFMPEG có thể ghi đè). Bản source Android được đồng bộ asset sau kiểm tra; chưa có APK đã biên dịch.

## Giới hạn học liệu

Các PDF 973 trang đã cung cấp được OCR cục bộ; chưa đồng nghĩa đã đọc hiểu/kiểm chứng đầy đủ. Chưa công bố map câu hỏi–bài/trang; source.bookPage=null và editionVerified=false là chủ ý trung thực. Cần giáo viên rà soát mức khó và độ phủ trước khi dùng trong lớp học.
