// Original demo questions; not verbatim textbook extracts. Edition/page alignment pending.
export const subjects={math:'Toán',vietnamese:'Tiếng Việt',science:'Tự nhiên và Xã hội',english:'Tiếng Anh'};
const rows={
math:[
['27 + 15 bằng bao nhiêu?','42','32','41','52','Cộng hàng đơn vị: 7 + 5 = 12. Viết 2, nhớ 1 sang hàng chục.'],
['60 − 24 bằng bao nhiêu?','36','46','34','44','60 − 20 = 40; 40 − 4 = 36.'],
['2 × 6 bằng bao nhiêu?','12','8','10','14','Sáu nhóm, mỗi nhóm 2, có tất cả 12.'],
['5 × 4 bằng bao nhiêu?','20','9','15','25','5 + 5 + 5 + 5 = 20.'],
['18 : 2 bằng bao nhiêu?','9','8','6','7','Vì 2 × 9 = 18 nên 18 : 2 = 9.'],
['25 : 5 bằng bao nhiêu?','5','4','6','3','Vì 5 × 5 = 25 nên 25 : 5 = 5.'],
['Số nào lớn nhất?','708','678','687','680','708 có 7 trăm; các số còn lại có 6 trăm.'],
['Số 352 có chữ số hàng chục là gì?','5','3','2','0','352 gồm 3 trăm, 5 chục và 2 đơn vị.'],
['1 mét bằng bao nhiêu xăng-ti-mét?','100 cm','10 cm','1 cm','1000 cm','1 m = 100 cm.'],
['Có 12 bút, chia đều cho 2 bạn. Mỗi bạn được mấy bút?','6 bút','5 bút','7 bút','10 bút','12 : 2 = 6. Mỗi bạn được 6 bút.'],
['Hình tam giác có mấy cạnh?','3','2','4','5','Hình tam giác có 3 cạnh.'],
['230 + 140 bằng bao nhiêu?','370','360','470','330','2 trăm cộng 1 trăm là 3 trăm; 3 chục cộng 4 chục là 7 chục.']
],
vietnamese:[
['Từ nào chỉ hoạt động?','chạy','bàn','xanh','mèo','Chạy là hoạt động; bàn và mèo chỉ sự vật, xanh chỉ màu sắc.'],
['Từ nào chỉ đồ dùng học tập?','bút','mây','cá','núi','Bút là đồ dùng để viết.'],
['Từ nào trái nghĩa với “cao”?','thấp','dài','rộng','sáng','Cao và thấp là hai từ trái nghĩa.'],
['Từ nào trái nghĩa với “nóng”?','lạnh','đẹp','mềm','nhanh','Nóng và lạnh chỉ hai trạng thái nhiệt độ đối lập.'],
['Cuối câu “Bạn tên là gì” cần dấu nào?','Dấu hỏi chấm','Dấu chấm','Dấu phẩy','Dấu hai chấm','Đây là câu hỏi nên kết thúc bằng dấu hỏi chấm.'],
['Tên người nào được viết đúng?','Lan','lan','lAn','laN','Chữ cái đầu của tên riêng cần viết hoa: Lan.'],
['Trong câu “Chú mèo ngủ trên ghế”, con vật nào đang ngủ?','Chú mèo','Chú chó','Con chim','Con cá','Câu văn cho biết chú mèo đang ngủ.'],
['“Hoa tưới cây mỗi sáng.” Hoa làm gì?','Tưới cây','Đọc sách','Đá bóng','Vẽ tranh','Hoạt động được nêu trong câu là tưới cây.'],
['Em nói gì khi được bạn giúp đỡ?','Cảm ơn bạn!','Đi ra ngay!','Mặc kệ bạn!','Đừng nói nữa!','Lời cảm ơn thể hiện sự trân trọng khi được giúp đỡ.'],
['Em vô ý làm rơi bút của bạn. Em nên nói gì?','Mình xin lỗi bạn.','Mình mặc kệ.','Bạn đi chỗ khác.','Không liên quan mình.','Em nên xin lỗi và nhặt bút trả lại bạn.'],
['Từ nào chỉ màu sắc?','đỏ','hát','sách','bơi','Đỏ là một màu sắc.'],
['“Nam đọc sách ở thư viện.” Nam đọc sách ở đâu?','Ở thư viện','Ở sân bóng','Ở bể bơi','Ở chợ','Cụm từ “ở thư viện” cho biết nơi Nam đọc sách.']
],
science:[
['Để giữ sân trường sạch, em bỏ rác ở đâu?','Trong thùng rác','Dưới gốc cây','Giữa sân','Dưới bàn','Bỏ rác đúng nơi giúp giữ môi trường sạch.'],
['Khi thấy dây điện bị đứt, em nên làm gì?','Tránh xa và báo người lớn','Cầm dây lên','Dùng tay nối dây','Rủ bạn chạm vào','Dây điện đứt có thể nguy hiểm. Hãy tránh xa và báo người lớn.'],
['Bộ phận nào giúp cây hút nước từ đất?','Rễ','Hoa','Quả','Hạt','Rễ hút nước từ đất để nuôi cây.'],
['Con vật nào sống chủ yếu dưới nước?','Cá chép','Gà','Mèo','Trâu','Cá chép sống trong môi trường nước.'],
['Trước khi ăn, em cần làm gì?','Rửa tay sạch','Nghịch đất','Chơi với rác','Lau tay vào giày','Rửa tay sạch trước khi ăn giúp giữ vệ sinh.'],
['Khi đi xe máy cùng người lớn, em cần đội gì?','Mũ bảo hiểm đúng cách','Mũ giấy','Vòng hoa','Mũ sinh nhật','Mũ bảo hiểm cần vừa đầu và cài quai đúng cách.'],
['Cơ quan nào giúp chúng ta hít thở?','Phổi','Dạ dày','Xương đùi','Răng','Phổi là bộ phận quan trọng của cơ quan hô hấp.'],
['Để bảo vệ cây ở trường, em nên làm gì?','Tưới cây vừa đủ','Bẻ cành','Giẫm lên cây','Nhổ cây','Tưới vừa đủ nước giúp cây phát triển.'],
['Nghề nào dạy học cho học sinh?','Giáo viên','Thợ may','Đầu bếp','Thợ xây','Giáo viên tổ chức việc dạy và học.'],
['Khi trời mưa, đồ dùng nào giúp em tránh ướt?','Áo mưa','Kính bơi','Quạt giấy','Khăn ăn','Áo mưa giúp che cơ thể khi đi dưới mưa.'],
['Hành động nào giúp bảo vệ nguồn nước?','Bỏ rác đúng chỗ','Ném rác xuống ao','Đổ dầu xuống suối','Vứt túi nhựa xuống sông','Bỏ rác đúng chỗ giúp hạn chế rác đi vào nguồn nước.'],
['Khi bị lạc ở siêu thị, em nên nhờ ai giúp?','Nhân viên bảo vệ tại quầy hỗ trợ','Người lạ rủ ra xe','Một em bé nhỏ hơn','Người rủ đi chỗ vắng','Hãy ở nơi an toàn và nhờ nhân viên tại quầy hỗ trợ liên hệ người thân.']
],
english:[
['Từ “cat” có nghĩa là gì?','Con mèo','Con chó','Con cá','Con bò','Cat nghĩa là con mèo.'],
['Từ nào có nghĩa là “con chó”?','dog','cat','fish','bird','Dog nghĩa là con chó.'],
['“Red” là màu gì?','Đỏ','Xanh lá','Vàng','Đen','Red nghĩa là màu đỏ.'],
['Từ nào có nghĩa là “màu xanh lá”?','green','red','black','white','Green nghĩa là màu xanh lá.'],
['“Two” là số mấy?','2','1','3','4','Two là số 2.'],
['“Five” là số mấy?','5','4','6','7','Five là số 5.'],
['Từ nào có nghĩa là “quyển sách”?','book','ball','car','kite','Book nghĩa là quyển sách.'],
['“Ball” có nghĩa là gì?','Quả bóng','Cái bàn','Cái bút','Con chim','Ball nghĩa là quả bóng.'],
['Để chào bạn bằng tiếng Anh, em có thể nói gì?','Hello!','Goodbye!','Thank you!','Sorry!','Hello là lời chào khi gặp nhau.'],
['Để cảm ơn, em nói gì?','Thank you!','Goodbye!','Hello!','Good night!','Thank you dùng để cảm ơn.'],
['Từ nào có nghĩa là “con cá”?','fish','bird','dog','cat','Fish nghĩa là con cá.'],
['“Kite” có nghĩa là gì?','Cái diều','Quả bóng','Quyển sách','Cái bút','Kite nghĩa là cái diều.']
]};
export const questions=Object.entries(rows).flatMap(([subject,items])=>items.map(([prompt,answer,...rest],i)=>({id:`g2-${subject}-${i+1}`,grade:2,subject,prompt,options:[answer,...rest.slice(0,3)],answer:0,explanation:rest[3],review:'self-reviewed-demo',alignment:'2026-edition-pending',sourceRef:subject==='math'?'hts-math2':'pending-'+subject})));
export function shuffledOptions(q,rng=Math.random){const a=q.options.map((text,index)=>({text,correct:index===q.answer}));for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
