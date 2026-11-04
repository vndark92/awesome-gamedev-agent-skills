# Họa cảnh An Hòa 0.2

## Hướng đã chọn

Anime đô thị hiện đại, nét mực rõ, đổ bóng cel, điểm nhấn ngọc bích và đồng cổ. Mẫu Pháp tu và cảnh Hẻm An Hòa được chọn làm chuẩn nội bộ từ yêu cầu triển khai đồ họa của người dùng. Không dùng nhân vật hay thiết kế nhận diện của một thương hiệu anime có sẵn.

Đường nét: nhân vật thanh thoát; Thể tu có vai và hộ thủ lớn hơn; Luyện thú sư có khế ước và túi bùa. Linh thú bo tròn, dễ nhận diện ở cỡ nhỏ. Quái thường có mắt và vết nứt tím để chỉ cuồng hóa. Thủ lĩnh lớn, có dấu vết thân phận trong cốt truyện.

## Khung kỹ thuật

- Canvas logic 1000 × 560, góc nhìn phối cảnh cố định. Nhân vật 2D và VFX độc lập trên nền minh họa.
- Nền WebP 1600 × 900; nhân vật WebP RGBA 512 × 640; sinh vật WebP RGBA 640 × 640.
- Không lật ảnh làm sai nguồn sáng. Người chơi và thú hướng phải, địch hướng trái. Bướm có bố cục gần đối xứng.
- Palette: navy #172330, jade #9cdbca, ivory #e9e1c0, đồng #ddc696; cuồng hóa dùng tím làm dấu hiệu riêng.
- Nguồn sáng ấm từ trên trái, bóng mát xanh. Các khoảng sân trung tâm ít tương phản để đọc silhouette.
- Nội suy mượt cho tranh anime. Bản vẽ được crop theo alpha, giữ tỷ lệ và không cắt nội dung. Điểm neo tính riêng từ vùng alpha đặc để chân không nổi do padding của texture.
- Mục tiêu 30fps cho cảnh; tạm dừng vẽ khi tab ẩn. Tôn trọng `prefers-reduced-motion` cho di chuyển nhân vật và hạt nền. Kỹ năng vẫn có phản hồi ngắn.
- Không raster hóa tên, chỉ số hay nút. 18 icon và 3 frame SVG là vector gốc, co giãn bằng CSS; trạng thái tương tác vẫn là DOM.

## Nội dung bàn giao

23 ảnh AI mới bằng công cụ built-in `image_gen`: 3 nhân vật, 3 cảnh, 3 boss, 5 pet, 9 mob. Các lần tạo dùng mẫu tham chiếu được ghi trong `prompts.json`. PNG nguồn giữ nguyên trong `source/`; WebP đã chuẩn hóa trong `../dist/assets/`.

18 icon công pháp và 3 frame được viết bằng SVG qua `scripts/build-ui-art.mjs`. VFX Kim/Mộc/Thủy/Hỏa/Thổ trong `dist/effects.js`: kiếm khí, linh đằng, sóng nước, hỏa cầu và địa chấn. Cách phát chiêu có biến thể pháp ấn, quyền kích, vuốt linh thú theo ba đạo lộ. Các icon biểu thị kỹ năng, không tự thêm cơ chế mới ngoài logic đã có.

## Nguồn gốc và giới hạn

Ảnh được tạo riêng cho dự án bằng built-in image generation, không lấy từ game hoặc kho ảnh bên thứ ba. Công cụ và prompt được lưu để truy vết; bản gốc được sao chép nguyên vẹn trước chuẩn hóa. Không khẳng định tính độc quyền của ảnh AI. Vector và mã hiệu ứng được viết mới trong repo.

Đây là art pass cho demo: chuyển động sprite bằng dịch chuyển, xoay nhẹ, co giãn và sáng khi trúng đòn; chưa có animation frame-by-frame hoặc skeleton rig. Ba nền chưa tách lớp parallax độc lập. Bản đồ không hỗ trợ camera xoay. Các điểm này là phạm vi mở rộng, không được gắn nhãn đã hoàn thành.

## Kiểm tra

`qa-report.json`: kích thước, alpha, khung nội dung, dung lượng và điểm neo. `node scripts/check-art.mjs`: kiểm tra đủ asset, alpha, kích thước, ngân sách texture và đường dẫn. Họa quyển `gallery.html`: xem asset ở cỡ thật, đổi ba đạo lộ, năm hệ, năm pet, ba vùng và bốn loại đối thủ/vùng; thử VFX không thay đổi save.
