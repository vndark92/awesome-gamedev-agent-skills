import {writeFileSync} from 'node:fs';
const bank=[];
const add=(subject,difficulty,topic,prompt,answer,wrong,explanation,extra={})=>{
 const options=[answer,...wrong].map(String);
 if(options.length!==4||new Set(options).size!==4)throw Error(prompt+' invalid choices');
 bank.push({id:`g2-${subject}-${String(bank.filter(q=>q.subject===subject).length+1).padStart(3,'0')}`,grade:2,subject,difficulty,topic,prompt,options,answer:0,explanation,review:'self-reviewed',alignment:'original-grade2-topic-practice',source:{kind:'original',bookPage:null,editionVerified:false},...extra});
};
const numeric=(level,topic,prompt,n,explanation,calculation)=>add('math',level,topic,prompt,n,[n+1,n+10,n>1?n-1:n+2],explanation,{calculation});
// 120 questions: 40 per level. Parameter variants are explicitly recorded, not 120 distinct learning objectives.
for(let i=0;i<20;i++){
 const a=12+i,b=3+i%7,n=a+b;
 numeric('easy','Cộng trong phạm vi 100',`${a} + ${b} bằng bao nhiêu?`,n,`${a} cộng ${b} bằng ${n}.`,{op:'add',a,b,result:n});
 const x=201+i*13,items=[x,x+3,x+10,x+1];
 add('math','easy','So sánh số',`Số nào lớn nhất trong các số ${items.join(', ')}?`,x+10,[x,x+3,x+1],`${x+10} lớn hơn cả ba số còn lại.`,{calculation:{op:'max',values:items,result:x+10}});
 const m=i<10?2:5,k=i%10+1;
 numeric('normal','Bảng nhân 2 và 5',`Có ${k} túi, mỗi túi ${m} hạt giống. Có tất cả bao nhiêu hạt giống?`,m*k,`Lấy ${m} hạt ở mỗi túi, ${k} lần: ${m} × ${k} = ${m*k}.`,{op:'multiply',a:m,b:k,result:m*k});
 const total=41+i*2,give=12+i%9;
 numeric('normal','Bài toán bớt đi',`Thư viện có ${total} quyển sách. Các bạn mượn ${give} quyển. Thư viện còn bao nhiêu quyển?`,total-give,`Số sách còn lại là ${total} − ${give} = ${total-give} quyển.`,{op:'subtract',a:total,b:give,result:total-give});
 const start=20+i,more=8+i%5,used=3+i%4;
 numeric('hard','Bài toán hai bước',`Linh có ${start} nhãn vở, được tặng thêm ${more} nhãn rồi dùng ${used} nhãn. Linh còn bao nhiêu nhãn?`,start+more-used,`Sau khi được tặng: ${start} + ${more} = ${start+more}. Sau khi dùng: ${start+more} − ${used} = ${start+more-used}.`,{op:'two-step',a:start,b:more,c:used,result:start+more-used});
 const step=i<10?2:5,base=10+i*3,nxt=base+step*4;
 numeric('hard','Quy luật dãy số',`Mỗi số sau tăng thêm cùng một lượng. Điền số tiếp theo: ${base}, ${base+step}, ${base+step*2}, ${base+step*3}, …`,nxt,`Mỗi lần tăng ${step}. Vì thế ${base+step*3} + ${step} = ${nxt}.`,{op:'sequence',a:base,step,result:nxt});
}
const words=[
 ['chạy','hoạt động','sự vật','màu sắc','số lượng'],['nhảy','hoạt động','đồ vật','con vật','màu sắc'],['đỏ','màu sắc','hoạt động','đồ dùng','con vật'],['xanh','màu sắc','người','con vật','hoạt động'],['bút','đồ dùng học tập','con vật','hoạt động','màu sắc'],['vở','đồ dùng học tập','đồ ăn','hoạt động','cây cối'],['mèo','con vật','cây cối','đồ dùng','hoạt động'],['chim','con vật','màu sắc','đồ dùng','hoạt động'],['đọc','hoạt động','con vật','đồ vật','màu sắc'],['viết','hoạt động','cây cối','đồ vật','màu sắc'],['vàng','màu sắc','con vật','người','hoạt động'],['tím','màu sắc','đồ dùng','người','hoạt động'],['thước','đồ dùng học tập','con vật','hoạt động','màu sắc'],['tẩy','đồ dùng học tập','con vật','màu sắc','thời tiết'],['cá','con vật','cây cối','đồ dùng','hoạt động'],['thỏ','con vật','đồ dùng','màu sắc','hoạt động'],['hát','hoạt động','con vật','đồ dùng','màu sắc'],['bơi','hoạt động','đồ dùng','cây cối','màu sắc'],['đen','màu sắc','hoạt động','người','con vật'],['trắng','màu sắc','người','đồ dùng','con vật']
];
for(const [w,a,...d] of words)add('vietnamese','easy','Nhận biết từ',`Trong cách dùng thông thường, từ “${w}” chỉ gì?`,a,d,`“${w}” là từ chỉ ${a}.`);
const language=[
 ['Từ nào trái nghĩa với “cao”?','thấp',['dài','rộng','sáng'],'Cao và thấp có nghĩa trái ngược nhau.'],
 ['Từ nào trái nghĩa với “nóng”?','lạnh',['đẹp','nhanh','mềm'],'Nóng và lạnh chỉ hai trạng thái nhiệt độ trái ngược.'],
 ['Từ nào trái nghĩa với “nhanh”?','chậm',['tròn','xa','vui'],'Nhanh và chậm có nghĩa trái ngược nhau.'],
 ['Từ nào trái nghĩa với “sạch”?','bẩn',['gọn','đẹp','mới'],'Sạch và bẩn có nghĩa trái ngược nhau.'],
 ['Từ nào trái nghĩa với “vui”?','buồn',['xanh','sáng','ngoan'],'Vui và buồn chỉ hai trạng thái cảm xúc khác nhau.'],
 ['Từ nào trái nghĩa với “gần”?','xa',['mềm','tròn','cao'],'Gần và xa diễn tả khoảng cách trái ngược.'],
 ['Cuối câu “Bạn học lớp mấy” cần dấu nào?','Dấu hỏi chấm',['Dấu phẩy','Dấu chấm','Dấu hai chấm'],'Câu này dùng để hỏi nên kết thúc bằng dấu hỏi chấm.'],
 ['Tên người nào viết đúng?','Minh',['minh','mInh','miNh'],'Chữ cái đầu của tên người cần viết hoa.'],
 ['Câu nào giới thiệu một người?','Mai là bạn cùng lớp của em.',['Mai đang đọc sách.','Mai hát rất hay.','Mai chạy ra sân.'],'Câu giới thiệu cho biết Mai là ai.'],
 ['Câu nào nêu một hoạt động?','Bé đang vẽ tranh.',['Bé rất ngoan.','Bé là em của Lan.','Bức tranh rất đẹp.'],'Đang vẽ tranh là hoạt động.'],
 ['Câu nào nêu đặc điểm?','Bông hoa có màu đỏ.',['Hoa đang nở.','Lan tưới hoa.','Mẹ mua hoa.'],'Màu đỏ là đặc điểm của bông hoa.'],
 ['Trong câu “Mẹ nấu cơm”, ai nấu cơm?','Mẹ',['Bố','Em','Bà'],'Câu văn cho biết mẹ là người nấu cơm.'],
 ['Trong câu “Bé chơi ở sân”, bé chơi ở đâu?','Ở sân',['Ở bếp','Ở lớp','Ở vườn'],'Cụm từ “ở sân” cho biết nơi bé chơi.'],
 ['“Sáng nay, Nam đến thư viện.” Nam đến thư viện khi nào?','Sáng nay',['Tối qua','Chiều mai','Đêm nay'],'Sáng nay cho biết thời gian.'],
 ['Bạn cho em mượn bút. Em nên nói gì?','Mình cảm ơn bạn.',['Bạn đi ra đi.','Mình không cần bạn.','Đừng nói nữa.'],'Cảm ơn là lời nói lịch sự khi được giúp đỡ.'],
 ['Em vô ý va vào bạn. Em nên nói gì?','Mình xin lỗi bạn.',['Bạn phải tránh mình.','Mình không quan tâm.','Đi chỗ khác đi.'],'Xin lỗi thể hiện em nhận ra việc làm của mình.'],
 ['Cách viết nào đặt dấu câu đúng?','Em thích đọc sách.',['Em. thích đọc sách','Em thích. đọc sách','Em thích đọc. sách'],'Dấu chấm đặt ở cuối câu kể trọn ý.'],
 ['Từ nào cùng nhóm với “ông, bà, bố”?','mẹ',['bút','mây','sông'],'Đây là nhóm từ chỉ người trong gia đình.'],
 ['Từ nào cùng nhóm với “cam, chuối, xoài”?','ổi',['bàn','chim','áo'],'Cam, chuối, xoài và ổi đều là tên quả.'],
 ['Điền từ phù hợp: “Chúng em … cây trong sân trường.”','chăm sóc',['đọc','nghe','ngủ'],'Chăm sóc cây là cách dùng từ phù hợp trong câu.']
];
for(const [p,a,d,e] of language)add('vietnamese','normal','Từ và câu',p,a,d,e);
const stories=[
 ['Trời sắp mưa. Hà thu quần áo ngoài sân vào nhà.','Vì sao Hà thu quần áo?','Để quần áo không bị ướt',['Để phơi thêm','Để quần áo ướt','Để tưới cây'],'Hà thấy trời sắp mưa nên thu quần áo để tránh bị ướt.'],
 ['Nam thấy cây trong chậu rũ lá, đất rất khô. Em lấy nước tưới vừa đủ.','Nam tưới cây để làm gì?','Giúp cây có nước',['Làm gãy cành','Rửa chậu cho bóng','Làm đất khô hơn'],'Đất khô và cây rũ lá là dấu hiệu cây cần nước.'],
 ['Mai chỉ có một chiếc ô. Thấy Lan đứng dưới mái hiên vì mưa, Mai rủ bạn cùng về dưới ô.','Mai là người thế nào?','Biết quan tâm đến bạn',['Chỉ nghĩ đến mình','Không thích đi học','Thích đứng một mình'],'Mai chia sẻ chiếc ô để bạn không bị ướt.'],
 ['Sau giờ đọc, Bình xếp sách lên giá rồi nhặt giấy vụn dưới bàn.','Bình góp phần làm thư viện thế nào?','Gọn gàng và sạch sẽ',['Ồn ào hơn','Tối hơn','Chật vì rác'],'Xếp sách và nhặt giấy giúp thư viện gọn, sạch.'],
 ['Chim mẹ tha rơm về. Từng cọng rơm được đan lại thành chiếc tổ ấm.','Chim mẹ tha rơm để làm gì?','Làm tổ',['Làm mưa','Trồng rau','Đắp đường'],'Câu sau cho biết rơm được dùng để làm tổ.'],
 ['Hải định chạy qua đường. Thấy đèn đỏ, em dừng lại chờ cùng mẹ.','Hải đã làm điều gì đúng?','Dừng lại khi đèn đỏ',['Chạy thật nhanh','Chơi ở lòng đường','Bỏ mẹ lại'],'Dừng chờ đèn là hành động an toàn.'],
 ['Thấy em nhỏ không với tới sách, An lấy sách giúp rồi đặt chiếc ghế về chỗ cũ.','Điều nào phù hợp nhất với việc An làm?','Giúp em và giữ đồ gọn gàng',['Giấu sách của em','Làm rơi sách','Làm em khóc'],'An giúp em lấy sách và cất ghế đúng chỗ.'],
 ['Bút chì của Tú gãy ngòi. Vy đưa bạn chiếc bút dự phòng để cả hai cùng làm bài.','Vì sao Vy đưa bút cho Tú?','Để Tú tiếp tục làm bài',['Để Tú nghỉ học','Để Tú gọt cả hai bút','Để Tú giấu bút'],'Bút Tú không viết được nên Vy cho bạn mượn.'],
 ['Một cơn gió làm cửa sổ đập mạnh. Sơn khép cửa rồi quay lại đọc sách.','Sơn khép cửa vì điều gì?','Gió làm cửa đập mạnh',['Trời không có gió','Sách bị hết chữ','Em muốn ra sân'],'Thông tin về gió ở câu đầu giải thích hành động khép cửa.'],
 ['Lúc đầu, Dũng chưa đọc rõ. Em luyện mỗi ngày. Cuối tuần, em đọc trôi chảy hơn.','Điều gì giúp Dũng tiến bộ?','Luyện đọc đều đặn',['Cất sách không đọc','Chỉ nhìn bìa sách','Bỏ qua mọi từ khó'],'Dũng luyện hằng ngày nên đọc tốt hơn.'],
 ['Lớp tổ chức trồng hoa. Nhóm Lan đào hố, nhóm Minh mang cây, nhóm Hoa tưới nước.','Các bạn đã làm việc như thế nào?','Cùng nhau chia việc',['Mỗi bạn bỏ về','Chỉ đứng nhìn','Tranh nhau một việc'],'Mỗi nhóm làm một phần để hoàn thành việc chung.'],
 ['Bé nhặt được ví ở sân trường. Bé đưa ví cho cô giáo để tìm người đánh rơi.','Việc làm của bé thể hiện điều gì?','Trung thực',['Tham lam','Lười biếng','Kiêu căng'],'Bé không giữ của rơi mà nhờ cô tìm người trả lại.'],
 ['Bà đi chậm vì chân đau. Linh bước chậm lại, nắm tay bà cùng đi.','Linh bước chậm để làm gì?','Đi cùng và giúp bà',['Để bỏ bà phía sau','Để chạy thi','Để giấu đường đi'],'Linh điều chỉnh bước chân cho phù hợp với bà.'],
 ['Buổi sáng, sân còn vắng. Khi tiếng trống vang lên, các bạn nhanh chóng vào lớp.','Tiếng trống báo hiệu điều gì trong đoạn?','Đến giờ vào lớp',['Đến giờ đi ngủ','Đã hết năm học','Đến giờ ăn tối'],'Các bạn vào lớp ngay sau tiếng trống.'],
 ['Hoa quên mang bình nước. Bạn bên cạnh rót nước sạch vào cốc riêng cho Hoa.','Bạn đã giúp Hoa bằng cách nào?','Chia sẻ nước uống',['Đưa nước bẩn','Giấu bình nước','Bảo Hoa đừng uống'],'Bạn rót nước sạch cho Hoa vào cốc riêng.'],
 ['Trước khi ra khỏi phòng, bố tắt đèn. Căn phòng không còn ai sử dụng.','Bố tắt đèn nhằm làm gì?','Tiết kiệm điện',['Làm đèn sáng hơn','Để đọc sách rõ hơn','Làm phòng đông người'],'Không có người dùng thì tắt đèn giúp tránh lãng phí điện.'],
 ['Con mèo nằm im bên cửa. Nghe tiếng mở hộp thức ăn, nó đứng dậy chạy đến.','Điều gì khiến mèo chạy đến?','Tiếng mở hộp thức ăn',['Tiếng trống trường','Tiếng xe lửa','Tiếng mưa ngoài vườn'],'Câu sau nêu tiếng mở hộp thức ăn trước khi mèo chạy đến.'],
 ['Quân viết sai một từ. Em nhìn lại mẫu rồi sửa, thay vì bỏ cả trang vở.','Quân đã xử lí lỗi như thế nào?','Kiểm tra và sửa lại',['Bỏ luôn việc học','Xé hết sách','Giấu vở của bạn'],'Quân xem mẫu để sửa đúng từ đã viết sai.'],
 ['Trên đường, nhóm bạn thấy biển “Giữ yên lặng”. Các bạn hạ giọng khi đi qua phòng đọc.','Vì sao các bạn hạ giọng?','Để không làm phiền người đọc',['Để gọi nhau xa hơn','Để tạo tiếng ồn','Để chạy nhanh hơn'],'Biển nhắc giữ yên lặng, phù hợp với phòng đọc.'],
 ['Giờ ra chơi, sân rất nắng. Cô dẫn các bạn đến chỗ có bóng cây để nghỉ.','Cô chọn chỗ có bóng cây vì sao?','Để các bạn tránh nắng',['Để các bạn nóng hơn','Để các bạn bị ướt','Để tắt hết ánh sáng'],'Bóng cây là chỗ mát hơn để tránh nắng.']
];
for(const [passage,p,a,d,e] of stories)add('vietnamese','hard','Đọc hiểu ngắn',passage+'\n\n'+p,a,d,e,{passageOrigin:'original'});
const nature=[
 ['Trường học','Nghề nào dạy học sinh?','Giáo viên',['Thợ may','Đầu bếp','Thợ xây'],'Giáo viên tổ chức việc dạy và học.',
 'Sân trường có giấy vụn. Em nên làm gì?','Bỏ giấy vào thùng rác',['Đá giấy đi','Giấu dưới bàn','Ném ra cổng'],'Bỏ rác đúng chỗ giúp sân sạch.',
 'Lớp vừa quét xong, gió lại thổi giấy vào. Cách nào giúp giữ sân sạch lâu hơn?','Nhặt giấy và đậy nắp thùng rác',['Đổ rác ra sân','Mở tất cả túi rác','Để giấy bay tiếp'],'Nhặt rác và ngăn rác bay ra xử lí cả nguyên nhân lẫn kết quả.'],
 ['Gia đình','Ai là mẹ của mẹ em?','Bà ngoại',['Bà nội','Chị gái','Em gái'],'Bà ngoại là mẹ của mẹ.',
 'Đồ chơi bày kín lối đi. Em nên làm gì?','Cất đồ chơi gọn lại',['Bày thêm đồ','Nhảy qua đồ','Che bằng chăn'],'Dọn lối đi giúp tránh vấp ngã.',
 'Em nhỏ đang ngủ, em muốn nghe nhạc. Cách nào phù hợp?','Nghe nhỏ ở nơi không làm phiền em',['Mở loa lớn cạnh em','Đánh thức em dậy','Để loa sát giường'],'Cần quan tâm giấc ngủ của em và tránh tiếng ồn.'],
 ['Cây cối','Bộ phận nào của cây thường hút nước từ đất?','Rễ',['Hoa','Quả','Hạt'],'Rễ giúp hút nước từ đất.',
 'Cây trong chậu có đất khô. Em nên làm gì?','Tưới lượng nước phù hợp',['Bẻ hết lá','Nhổ rễ lên','Đổ nước sôi'],'Tưới phù hợp giúp cây có nước.',
 'Hai cây cùng loại, một cây được tưới phù hợp, một cây thiếu nước lâu ngày. Cây nào dễ héo hơn?','Cây thiếu nước',['Cây đủ nước','Cả hai luôn như nhau','Không cây nào cần nước'],'Cây cần nước để sống, thiếu nước lâu dễ héo.'],
 ['Động vật','Con nào sống chủ yếu dưới nước?','Cá chép',['Gà','Mèo','Trâu'],'Cá chép sống trong nước.',
 'Muốn bảo vệ cá trong ao, em nên làm gì?','Giữ nước ao sạch',['Ném rác xuống ao','Đổ dầu xuống ao','Vứt pin xuống ao'],'Nước sạch giúp bảo vệ môi trường sống của cá.',
 'Ao có nhiều rác và cá yếu đi. Việc nào cần người lớn cùng thực hiện?','Dọn rác an toàn và ngăn xả rác xuống ao',['Thêm rác vào ao','Đổ nước xà phòng','Để trẻ tự xuống ao sâu'],'Vừa làm sạch vừa ngăn ô nhiễm; trẻ không tự xuống ao sâu.'],
 ['Vệ sinh','Trước khi ăn, em cần làm gì?','Rửa tay sạch',['Nghịch đất','Chạm rác','Lau tay vào giày'],'Rửa tay trước khi ăn giúp giữ vệ sinh.',
 'Sau khi chơi với đất, em chuẩn bị ăn bánh. Em nên làm gì trước?','Rửa tay bằng nước sạch và xà phòng',['Ăn ngay','Chỉ phủi tay','Lau tay vào tóc'],'Phủi tay không thay cho rửa tay sạch.',
 'Bạn nói tay không nhìn thấy bẩn thì không cần rửa trước khi ăn. Em chọn ý nào?','Vẫn cần rửa tay vì có chất bẩn khó nhìn thấy',['Bạn luôn đúng','Chỉ rửa một ngón','Không bao giờ cần rửa'],'Tay có thể có chất bẩn khó thấy bằng mắt.'],
 ['Hô hấp','Bộ phận nào thuộc cơ quan hô hấp?','Phổi',['Dạ dày','Xương đùi','Răng'],'Phổi giúp cơ thể trao đổi không khí.',
 'Em nên tránh nơi nào để giữ không khí hít thở sạch hơn?','Nơi nhiều khói bụi',['Vườn thoáng sạch','Phòng thông thoáng','Sân sạch'],'Khói bụi làm không khí ô nhiễm.',
 'Có người đốt rác gần chỗ chơi. Em nên làm gì?','Rời xa khói và báo người lớn',['Đứng sát đám khói','Hít thật sâu khói','Tự nhảy vào dập lửa'],'Rời xa khói giúp tránh hít khói; nhờ người lớn xử lí.'],
 ['Giao thông','Khi ngồi xe máy, em cần đội gì?','Mũ bảo hiểm đúng cách',['Mũ giấy','Mũ sinh nhật','Vòng hoa'],'Cần đội mũ bảo hiểm vừa đầu, cài quai đúng cách.',
 'Đèn dành cho người đi bộ đang đỏ. Em nên làm gì?','Dừng chờ ở nơi an toàn',['Chạy qua ngay','Chơi giữa đường','Đi theo xe máy'],'Chờ tín hiệu cho phép rồi sang đường an toàn.',
 'Đèn sang đường đã xanh nhưng có xe chưa dừng. Em nên làm gì?','Quan sát và chờ an toàn rồi đi cùng người lớn',['Chạy ngay không nhìn','Nhắm mắt đi','Đứng giữa làn xe'],'Đèn xanh vẫn cần quan sát để bảo đảm an toàn.'],
 ['An toàn điện','Vật nào có thể gây nguy hiểm khi chạm vào?','Dây điện bị đứt',['Quyển vở','Bút chì','Khăn mềm'],'Dây điện đứt có thể gây điện giật.',
 'Thấy ổ cắm hỏng, em nên làm gì?','Tránh chạm và báo người lớn',['Chọc bút vào','Tự tháo ra','Đổ nước lên'],'Không tự sửa hay chạm ổ cắm hỏng.',
 'Bóng rơi cạnh dây điện đứt. Em chọn cách nào?','Đứng xa, nhờ người lớn xử lí an toàn',['Lấy que chọc dây','Chạy vào lấy bóng','Rủ bạn nhặt cùng'],'Không đến gần dây điện để lấy đồ vật.'],
 ['Nước','Nước nào phù hợp để uống?','Nước uống sạch đã được chuẩn bị an toàn',['Nước ao','Nước cống','Nước có dầu'],'Nước uống phải được bảo đảm sạch và an toàn.',
 'Rửa tay xong, em cần làm gì với vòi nước?','Khóa vòi',['Để chảy mãi','Mở to hơn','Bẻ vòi'],'Khóa vòi tránh lãng phí nước.',
 'Vòi vẫn nhỏ giọt dù đã khóa. Em nên làm gì?','Báo người lớn để sửa',['Mặc kệ mãi','Bẻ mạnh vòi','Đổ thêm nước'],'Rò rỉ cần người lớn sửa để không lãng phí.'],
 ['Thời tiết','Đồ dùng nào giúp tránh ướt khi đi dưới mưa?','Áo mưa',['Kính bơi','Quạt giấy','Khăn ăn'],'Áo mưa che cơ thể khi trời mưa.',
 'Trời nắng, em đi bộ ngoài trời. Em nên làm gì?','Đội mũ và tránh nắng gắt',['Bỏ mũ để phơi nắng','Mặc áo mưa kín suốt','Không uống nước cả ngày'],'Che nắng và tránh nắng gắt giúp bảo vệ cơ thể.',
 'Trời có sấm chớp, em đang ở sân. Em nên làm gì?','Vào nơi trú an toàn cùng người lớn',['Núp dưới cây cao đơn độc','Chơi tiếp giữa sân','Đứng cạnh cột điện'],'Cần tìm nơi trú an toàn, tránh cây cao và cột điện.'],
 ['Vận động','Bộ phận nào giúp nâng đỡ cơ thể?','Bộ xương',['Tóc','Móng tay','Lông mi'],'Bộ xương nâng đỡ cơ thể.',
 'Ngồi học thế nào phù hợp hơn?','Ngồi ngay ngắn, bàn ghế phù hợp',['Cúi sát mặt bàn','Vặn lưng lâu','Nằm gập trên bàn'],'Tư thế ngay ngắn giúp học thoải mái hơn.',
 'Em đã ngồi đọc khá lâu và thấy mỏi. Cách nào hợp lí?','Nghỉ ngắn, vận động nhẹ rồi học tiếp',['Cố ngồi bất động mãi','Chạy va vào bàn','Bỏ học cả tuần'],'Nghỉ và vận động nhẹ giúp cơ thể thư giãn.'],
 ['Nghề nghiệp','Ai thường làm bánh và nấu món ăn?','Đầu bếp',['Thợ xây','Giáo viên','Thợ điện'],'Đầu bếp chế biến món ăn.',
 'Thấy cô lao công quét sân, em có thể giúp bằng cách nào?','Bỏ rác đúng chỗ',['Vứt thêm giấy','Giẫm lên rác','Giấu chổi'],'Giữ vệ sinh là cách tôn trọng công việc của cô.',
 'Sân sạch nhờ nhiều người cùng giữ gìn. Nhận xét nào đúng?','Mỗi người đều cần có trách nhiệm',['Chỉ cô lao công phải giữ sạch','Học sinh được xả rác','Sân tự sạch mãi'],'Giữ môi trường là trách nhiệm chung.'],
 ['Mua bán','Nơi nào thường bán rau và thực phẩm?','Chợ',['Sân bóng','Phòng ngủ','Bể bơi'],'Chợ là nơi mua bán nhiều hàng hóa.',
 'Đi chợ cùng mẹ, em nên đi thế nào?','Đi gần mẹ',['Tự chạy đi xa','Theo người lạ','Ra đường một mình'],'Đi gần người thân giúp tránh bị lạc.',
 'Nếu bị lạc ở siêu thị, em nên làm gì?','Nhờ nhân viên tại quầy hỗ trợ liên hệ người thân',['Theo người lạ ra xe','Đi tới chỗ vắng','Tự ra đường tìm'],'Ở nơi an toàn và nhờ nhân viên hỗ trợ.'],
 ['Môi trường','Đồ nào nên bỏ vào nơi thu gom pin đã dùng?','Pin cũ',['Vỏ chuối','Lá cây','Cơm thừa'],'Pin cũ cần thu gom phù hợp, không vứt bừa bãi.',
 'Em thấy bạn định ném túi nhựa xuống sông. Em nên làm gì?','Nhắc bạn bỏ đúng nơi',['Ném cùng bạn','Đổ thêm rác','Cổ vũ bạn'],'Không xả túi nhựa xuống nguồn nước.',
 'Dùng bình nước cá nhân nhiều lần giúp điều gì?','Giảm số chai nhựa dùng một lần',['Tăng rác chắc chắn','Làm nước tự sạch','Không cần rửa bình'],'Tái sử dụng bình phù hợp giúp giảm đồ nhựa dùng một lần.'],
 ['Chăm sóc vật nuôi','Con nào thường được nuôi để lấy trứng?','Gà mái',['Mèo','Chó','Trâu'],'Gà mái đẻ trứng.',
 'Em muốn vuốt ve một con chó lạ. Em nên làm gì?','Không tự đến gần, hỏi người lớn',['Kéo đuôi chó','Giật thức ăn','Ôm ngay'],'Không trêu chọc hay tự tiếp cận chó lạ.',
 'Vật nuôi bỏ ăn và mệt. Gia đình nên làm gì?','Nhờ người lớn đưa đến người có chuyên môn chăm sóc',['Ép uống thuốc tùy ý','Bỏ mặc lâu ngày','Trêu cho chạy'],'Người lớn và người có chuyên môn cần kiểm tra vật nuôi.'],
 ['Cây xanh','Cây nào thường cho quả cam?','Cây cam',['Cây lúa','Cây ngô','Cây rau muống'],'Cây cam cho quả cam.',
 'Em muốn ngắm hoa ở công viên. Em nên làm gì?','Quan sát, không ngắt hoa',['Bẻ cành mang về','Nhổ cả cây','Giẫm bồn hoa'],'Không ngắt hoa giúp giữ cảnh đẹp chung.',
 'Bồn hoa có biển không giẫm lên nhưng lối đó gần hơn. Em nên chọn gì?','Đi theo lối dành cho người đi bộ',['Giẫm hoa để đi nhanh','Rủ bạn đi tắt','Dỡ biển xuống'],'Đi đúng lối bảo vệ hoa dù đường dài hơn.'],
 ['Trường học an toàn','Nơi nào phù hợp để chơi bóng?','Sân chơi được cho phép',['Cầu thang','Hành lang chật','Lòng đường'],'Sân chơi phù hợp giúp giảm nguy cơ va chạm.',
 'Đi xuống cầu thang, em nên làm gì?','Đi chậm, không đùa nghịch',['Xô bạn','Trượt tay vịn','Nhảy nhiều bậc'],'Cần đi cẩn thận ở cầu thang.',
 'Bạn bị ngã khi chơi và kêu đau. Em nên làm gì?','Báo thầy cô, không tự kéo bạn dậy mạnh',['Cười trêu','Kéo mạnh tay bạn','Bỏ đi hết'],'Báo người lớn giúp bạn được hỗ trợ đúng cách.'],
 ['Ngày và đêm','Ban ngày thường có nguồn sáng tự nhiên nào?','Mặt Trời',['Đèn bàn','Đèn pin','Nến'],'Mặt Trời cung cấp ánh sáng tự nhiên ban ngày.',
 'Khi quan sát bầu trời, em cần tránh việc gì?','Nhìn thẳng vào Mặt Trời',['Nhìn mây từ chỗ an toàn','Quan sát bóng cây','Ngắm trời râm'],'Không nhìn thẳng vào Mặt Trời để bảo vệ mắt.',
 'Bóng cây trên sân thay đổi trong ngày. Em nên ghi nhận bằng cách nào?','Quan sát ở các giờ và ghi lại',['Chỉ đoán mà không nhìn','Nhìn thẳng Mặt Trời','Tự lên mái nhà'],'Quan sát nhiều thời điểm giúp nhận ra sự thay đổi an toàn.'],
 ['Ăn uống','Đồ ăn nào là rau?','Rau cải',['Bánh quy','Kẹo','Kem'],'Rau cải là một loại rau.',
 'Thức ăn đã có mùi lạ. Em nên làm gì?','Không ăn và báo người lớn',['Ăn thử nhiều','Mời bạn ăn','Giấu mùi bằng kẹo'],'Không dùng thức ăn có dấu hiệu hỏng.',
 'Bạn chỉ muốn ăn kẹo thay bữa chính. Em khuyên gì?','Ăn đa dạng, không thay bữa chính bằng kẹo',['Chỉ ăn kẹo mãi','Bỏ mọi loại rau','Không cần uống nước'],'Bữa ăn cần đa dạng để cung cấp chất dinh dưỡng.'],
 ['Giúp đỡ gia đình','Việc nào trẻ có thể làm phù hợp?','Xếp sách của mình',['Sửa ổ điện','Bê nồi nước sôi','Trèo mái nhà'],'Xếp sách là việc vừa sức và an toàn.',
 'Em muốn giúp quét nhà. Em nên chọn dụng cụ nào?','Chổi phù hợp và hót rác',['Dao sắc','Dây điện','Nồi nóng'],'Chổi và hót rác là dụng cụ phù hợp.',
 'Mẹ đang bê đồ nóng, em muốn giúp. Em nên làm gì?','Tránh lối đi và hỏi việc khác vừa sức',['Chạy cắt ngang','Giật đồ nóng','Ôm chân mẹ'],'Giữ lối đi an toàn và chọn việc vừa sức.']
];
for(const row of nature){const [topic,...items]=row;for(let i=0;i<3;i++){const [p,a,d,e]=items.slice(i*4,i*4+4);add('science',['easy','normal','hard'][i],topic,p,a,d,e);}}
const vocabulary=[['popcorn','bỏng ngô'],['pizza','bánh pi-da'],['pasta','mì Ý'],['kite','cái diều'],['bike','xe đạp'],['kitten','mèo con'],['sail','cánh buồm'],['sand','cát'],['sea','biển'],['rainbow','cầu vồng'],['river','sông'],['road','con đường'],['box','cái hộp'],['fox','con cáo'],['ox','con bò đực'],['juice','nước ép'],['jelly','thạch'],['jam','mứt'],['van','xe tải nhỏ'],['village','ngôi làng']];
vocabulary.forEach(([word,meaning],i)=>{
 const wrong=[1,5,9].map(d=>vocabulary[(i+d)%20]);
 add('english','easy','Từ vựng quen thuộc',`“${word}” có nghĩa là gì?`,meaning,wrong.map(x=>x[1]),`“${word}” nghĩa là ${meaning}.`);
 add('english','normal','Chọn từ theo nghĩa',`Chọn từ tiếng Anh chỉ “${meaning}”.`,word,wrong.map(x=>x[0]),`Từ cần chọn là “${word}”.`);
 const sentence=['sea','sand','popcorn','pasta','juice','jelly','jam'].includes(word)?`I can see ${word}.`:`I can see a ${word}.`;
 add('english','hard','Hiểu câu ngắn',`Bạn nói: “${sentence}” Bạn nhìn thấy gì?`,meaning,wrong.map(x=>x[1]),`“I can see…” là “Tôi có thể nhìn thấy…”. Trong câu, “${word}” là ${meaning}.`);
});
if(bank.length!==300)throw Error('Expected 300, got '+bank.length);
for(const d of ['easy','normal','hard'])if(bank.filter(q=>q.difficulty===d).length!==100)throw Error(d);
const meta={version:2,grade:2,status:'original-self-reviewed-not-teacher-certified',questionCount:300,difficultyLabels:{easy:'Dễ',normal:'Bình thường',hard:'Khó'},questions:bank};
writeFileSync(new URL('../dist/question-bank.json',import.meta.url),JSON.stringify(meta,null,2));
writeFileSync(new URL('../dist/questions.js',import.meta.url),`export const subjects=${JSON.stringify({math:'Toán',vietnamese:'Tiếng Việt',science:'Tự nhiên và Xã hội',english:'Tiếng Anh'})};\nexport const questions=${JSON.stringify(bank)};\nexport function shuffledOptions(q,rng=Math.random){const a=q.options.map((text,index)=>({text,correct:index===q.answer}));for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}\n`);
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
writeFileSync(new URL('../dist/question-bank.csv',import.meta.url),'\ufeff'+[['id','subject','difficulty','topic','prompt','A','B','C','D','answer','explanation'],...bank.map(q=>[q.id,q.subject,q.difficulty,q.topic,q.prompt,...q.options,'A',q.explanation])].map(r=>r.map(csv).join(',')).join('\r\n'));
console.log('Built 300 questions: 120 math, 60 Vietnamese, 60 science, 60 English; 100 per difficulty.');
