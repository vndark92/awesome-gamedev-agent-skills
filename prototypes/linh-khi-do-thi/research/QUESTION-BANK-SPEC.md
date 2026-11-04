# Ngân hàng lớp 2 từ PDF người dùng cung cấp

Trạng thái: đang trích xuất OCR, CHƯA xuất bản ngân hàng mới.

## Quy tắc độ khó

- Dễ: nhận biết hoặc nhớ một kiến thức, một thao tác trực tiếp; câu ngắn, dữ kiện rõ.
- Bình thường: hiểu nội dung và áp dụng một quy tắc trong tình huống quen thuộc; một đến hai bước đơn giản.
- Khó: kết hợp hai kiến thức đã học, suy luận hoặc giải tình huống mới trong phạm vi lớp 2. Không dùng kiến thức lớp trên hoặc rút ngắn đồng hồ để định nghĩa độ khó.

Độ khó là dự kiến biên soạn, cần hiệu chỉnh theo kết quả thử với học sinh. Không đồng nhất tốc độ đọc và mức hiểu.

## Một câu hỏi

id, grade, subject, semester, topic, learningObjective, difficulty (easy/normal/hard), prompt, options (đúng 4), answerIndex, explanation, distractorRationales, sourceBookId, sourcePdfPage, sourcePrintedPage, sourceLesson, derivation (original/adapted), reviewStatus.

## Điều kiện đưa vào ứng dụng

1. Đã đọc trang gốc, kiểm tra ảnh với OCR; không dùng số hoặc dấu toán do OCR chưa xác minh.
2. Có đúng một đáp án, các phương án không trùng và không mơ hồ.
3. Bài phụ thuộc hình phải kèm hình; không đưa câu nghe vào trò chơi chỉ có chữ.
4. Câu đọc hiểu có đủ ngữ cảnh tự biên soạn hoặc trích dẫn phù hợp để trả lời mà không cần mở sách.
5. Có giải thích, ghi rõ bài/trang PDF và trang in; không phỏng đoán nguồn.
6. Phân biệt SGK và vở bài tập. Đối chiếu hai bản Toán tập một trước khi tính độ phủ; không xem tên file là bằng chứng trùng.
7. JSON cho app, CSV cho rà soát, ma trận độ phủ bài học. Chỉ tính bài thực sự đã kiểm tra; công khai phần chưa bao phủ.

## Hồ sơ xử lý

Nguồn gốc giữ nguyên ở D:/Sách lớp 2. Manifest SHA-256 và số trang, ảnh render cùng văn bản OCR lưu cục bộ tại tmp/pdfs/books. Không đưa toàn văn PDF, OCR hoặc ảnh trang sách lên repo công khai hay vào gói game. Cần đọc và kiểm tra nội dung sau OCR; OCR hoàn tất không đồng nghĩa đã nghiên cứu toàn bộ.
