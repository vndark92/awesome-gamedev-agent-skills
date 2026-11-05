# Hướng phát triển Học viện Linh thú

## Bản 0.6: đã triển khai
- Ba kỹ năng có tên riêng: Tinh cầu tri thức, Quyền ánh sáng, Linh thú hợp kích. Kết hợp năm màu/nguyên tố hiện có.
- Nhân vật vận phép, tiến lên ra chiêu; NPC trúng đòn bật sáng/lùi lại. NPC phát phép về nhân vật, nhân vật phản ứng trúng đòn và có vòng chắn khi trả lời đúng. Số sát thương canvas khớp 100/125/150, thay cho số 1 cũ.
- Chuỗi trả lời đúng mang tính cổ vũ, không tăng sát thương hay phạt mất thưởng.
- Sổ tay: năm mảnh ghép theo bản đồ, bốn huy hiệu từ thành tích thực, lời nhắn của linh thú.
- Góc ôn tập: lưu tối đa 100 ID câu trả lời sai, ôn tối đa năm câu mỗi phiên, không tính thời gian hoặc trừ sinh lực. Câu ôn đúng được bỏ khỏi danh sách; không cộng thành tích chiến đấu. Dữ liệu cũ được giữ.
- Hiệu ứng lập trình trên canvas, dùng lại đồ họa hiện có. Không phải hoạt hình khung xương hoặc bộ sprite mới. Chế độ giảm chuyển động theo thiết bị.

## Ưu tiên tiếp theo (đề xuất, chưa triển khai)
1. Giáo viên rà soát 300 câu, gắn mục tiêu học, bài và trang nguồn; mở rộng bài học theo tuần. Đây là ưu tiên trước khi phát hành cho nhiều trẻ.
2. Tùy chọn đọc câu hỏi bằng giọng Việt, với nút nghe lại; kiểm tra phát âm và khả năng offline. Không đọc đáp án tự động khi trẻ đang chọn.
3. Nhiệm vụ kể chuyện ngắn ở mỗi bản đồ: chăm cây, tìm đồ thất lạc, giúp bạn; câu hỏi gắn với tình huống, không chỉ đứng đánh quái.
4. Hồ sơ phụ huynh trên máy: nhóm kiến thức đã luyện và cần ôn, không xếp hạng trẻ, không coi điểm game là kết luận năng lực.
5. Thú đồng hành đổi biểu cảm theo hành động, hoạt hình nhiều khung và âm thanh riêng từng nguyên tố; thử hiệu năng trên điện thoại phổ thông trước khi thêm.
6. Bài chơi 5–10 phút, kết thúc bằng một câu chuyện nhỏ và lời nhắc nghỉ tùy chọn. Không phạt bỏ ngày, không hộp thưởng ngẫu nhiên hoặc buộc đăng nhập mỗi ngày.

## Phạm vi kiểm thử
Kiểm tra chức năng ôn tập, dữ liệu cũ, mức sát thương, chuyển lượt; build APK sạch và xác minh định nghĩa MainActivity trong DEX. Thử trực tiếp trên Android vẫn cần thiết, nhất là WebView, bộ nhớ, xoay màn hình và âm thanh.
