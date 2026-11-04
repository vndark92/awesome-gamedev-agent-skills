# Thiết kế và phương án triển khai

## Mục tiêu

Kiểm chứng: lựa chọn đạo lộ, ngũ hành và nâng cấp có khiến người chơi muốn thử lại sau một trận khó không? Đối tượng: học sinh, sinh viên, người làm văn phòng. Phiên ngắn 3–10 phút, không yêu cầu giờ cố định.

## Kiến trúc bản thử nghiệm

Buildless HTML/CSS/ES modules, Canvas vẽ thành phố góc chéo. `engine.js` chứa dữ liệu và hàm logic kiểm thử được; `app.js` quản lý UI, giao chiến, nhịp idle và lưu; `world.js` phụ trách hình ảnh. Không có thư viện bên ngoài bắt buộc; font web có fallback. `server.mjs` chỉ phục vụ preview loopback.

Chọn web Canvas cho vòng thử nghiệm nhẹ trên repo hiện có. Đây là renderer tùy biến, không tuyên bố dùng API Godot/Phaser từ các skill. Nếu thử nghiệm đạt, đánh giá chuyển lớp hình ảnh sang engine, giữ dữ liệu truyện và quy tắc đã xác minh.

## Quy tắc

- Tu vi: 1/giây + 0,6 mỗi cảnh giới + 0,2 mỗi lần thanh tẩy. Chi phí đột phá 100 và 450. Trúc Cơ cần thắng thủ lĩnh đầu.
- Tuần tra: trận tự động một nhịp mỗi giây, thắng nhận tài nguyên; dừng ở đợt thứ ba khi chưa vượt thủ lĩnh. Boss luôn bắt đầu thủ công.
- Ngoại tuyến: clamp 0–43.200 giây; không âm khi đồng hồ lùi. Khu vực đã vượt mới nhận linh thạch tuần tra ngoại tuyến. Nhịp thưởng ngoại tuyến cố định, không giả lập thắng boss.
- Ba nhánh khác nhau ở sinh lực, sát thương kỹ năng, phản kích và sức mạnh linh thú. Các nút kỹ năng trong bản đầu là nâng chỉ số; nhánh hành vi chuyên sâu nằm ở mốc sau.
- Khắc hệ +15%; linh thú tương sinh linh căn +12%. Hỏa cộng sát thương; Mộc hồi phục; Thổ giảm sát thương. Kim/Thủy hiện có tác dụng qua khắc hệ và đồng hành.
- Lựa chọn cốt truyện thưởng một lần, lưu theo vùng, mở vùng sau và quyết định kết thúc.
- Lưu schema v1, kiểm tra dữ liệu đầu vào, dự phòng, nhập/xuất. Không lưu đối tượng Canvas hay tham chiếu DOM.

## Phân kỳ

1. **Demo 0.1 — thực hiện trong lượt này:** đủ vòng chơi ba vùng, ba nhánh, năm hành, truyện và lựa chọn; đồ họa thủ tục, lưu local, kiểm thử logic và trình duyệt.
2. **Demo 0.2 — sau phản hồi:** sáu kỹ năng có hành vi riêng mỗi nhánh; cân bằng lại các hành; boss có đòn báo trước, kháng/giải hiệu ứng; ba ô trang bị riêng, nhật ký rơi đồ.
3. **Mỹ thuật:** duyệt một cảnh và một nhân vật mẫu; sau đó sản xuất sprite anime, animation idle/attack/hit, năm linh thú và ba boss; kiểm tra độ rõ trên màn hình nhỏ. Âm thanh và tùy chọn giảm chuyển động.
4. **Bản thử rộng:** lưu đám mây có đăng nhập, dữ liệu được xác nhận phía server nếu có cạnh tranh; tối ưu thiết bị yếu, thêm nội dung và cân bằng theo phản hồi.

## Tiêu chí nghiệm thu 0.1

- Bắt đầu trận đầu trong dưới một phút, hiểu mục tiêu sau phần mở đầu.
- Mỗi đạo lộ có thể vượt ba thủ lĩnh với mức nâng cấp hữu hạn.
- Không mua trùng kỹ năng, không đột phá vượt trần; lựa chọn không nhận thưởng hai lần.
- Save/load đúng; dữ liệu hỏng không thực thi HTML/script; thời gian ngoại tuyến không nhận trùng.
- UI sử dụng được ở desktop và màn hình 390px, không tràn ngang.

## Đánh giá sau khi chơi

Ghi lại thời gian tới boss đầu, số lần thua, số lần đổi đạo lộ, mức dễ hiểu của ngũ hành và lựa chọn yêu thích. Giữ vòng chơi nếu người thử tự điều chỉnh cấu hình sau khi thua; điều chỉnh nếu chỉ chờ đủ số; giảm hệ thống nếu cần giải thích liên tục. Không coi demo là bản thương mại hoàn chỉnh.
