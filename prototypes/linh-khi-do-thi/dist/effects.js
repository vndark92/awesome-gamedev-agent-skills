import {colors} from './engine.js';
export const effectNames=['Kim · Vạn Kiếm','Mộc · Linh Đằng','Thủy · Triều Sinh','Hỏa · Xích Diễm','Thổ · Địa Chấn'];
export function drawEffect(c,element,cls,progress,start,end,strong=true){
 if(progress<0||progress>1)return;
 const [sx,sy]=start,[ex,ey]=end,color=colors[element],travel=Math.min(1,progress/.5),x=sx+(ex-sx)*travel,y=sy+(ey-sy)*travel;
 c.save();c.globalAlpha=Math.sin(Math.PI*progress)**.45;c.strokeStyle=color;c.fillStyle=color;c.lineCap='round';c.lineJoin='round';c.shadowColor=color;c.shadowBlur=strong?16:7;
 const ellipse=(px,py,rx,ry)=>{c.beginPath();c.ellipse(px,py,rx,ry,0,0,Math.PI*2);c.stroke();};
 if(!strong){c.lineWidth=3;c.beginPath();c.moveTo(x-35,y+8);c.quadraticCurveTo(x-12,y-6,x,y);c.stroke();c.beginPath();c.arc(x,y,5,0,Math.PI*2);c.fill();c.restore();return;}
 if(cls===0){c.lineWidth=2;ellipse(sx,sy,28,42);ellipse(sx,sy,34,48);for(let i=0;i<6;i++){const a=i*Math.PI/3+progress*2;c.fillRect(sx+Math.cos(a)*30-2,sy+Math.sin(a)*44-2,4,4);}}
 if(cls===1){c.lineWidth=6;for(let i=0;i<3;i++){c.beginPath();c.moveTo(x-50,y-24+i*20);c.lineTo(x+12,y-16+i*16);c.stroke();}}
 if(cls===2){c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.moveTo(x-22+i*15,y-40);c.quadraticCurveTo(x-8+i*12,y,x-18+i*16,y+35);c.stroke();}}
 if(element===0){for(let i=-1;i<=1;i++){c.save();c.translate(x-i*12,y+i*28);c.beginPath();c.moveTo(-45,-5);c.lineTo(19,0);c.lineTo(-45,5);c.closePath();c.fill();c.fillRect(-48,-12,3,24);c.restore();}}
 if(element===1){c.lineWidth=4;c.beginPath();c.moveTo(sx,sy+55);c.bezierCurveTo(x-90,sy+80,x-45,y-70,x,y);c.stroke();for(let i=0;i<6;i++){const a=i*2.4+progress*4,px=x+Math.cos(a)*35,py=y+Math.sin(a)*45;c.save();c.translate(px,py);c.rotate(a);c.beginPath();c.moveTo(-12,0);c.quadraticCurveTo(0,-16,16,0);c.quadraticCurveTo(0,8,-12,0);c.fill();c.restore();}}
 if(element===2){c.lineWidth=5;for(let i=0;i<3;i++){c.beginPath();c.arc(x-i*15,y,25+i*9,-1.7,1.4);c.stroke();}for(let i=0;i<8;i++){const a=i*.8;c.beginPath();c.arc(x+Math.cos(a)*55,y+Math.sin(a)*50,2+i%3,0,7);c.fill();}}
 if(element===3){for(let i=0;i<7;i++){c.globalAlpha=(1-i/9)*Math.sin(Math.PI*progress);c.fillStyle=i===0?'#fff4c0':color;c.beginPath();c.arc(x-i*9,y+Math.sin(i+progress*14)*10,17-i*1.6,0,7);c.fill();}c.globalAlpha=Math.sin(Math.PI*progress);}
 if(element===4){for(let i=0;i<5;i++){const px=x-35+i*19,py=ey+65;c.beginPath();c.moveTo(px-12,py);c.lineTo(px-7,py-25-30*Math.sin(progress*Math.PI));c.lineTo(px+2,py-39-35*Math.sin(progress*Math.PI));c.lineTo(px+13,py);c.closePath();c.fill();}c.lineWidth=3;ellipse(ex,ey+64,30+progress*65,8+progress*12);}
 if(progress>.5){const impact=(progress-.5)*2;c.lineWidth=3*(1-impact)+1;ellipse(ex,ey,15+impact*75,15+impact*75);for(let i=0;i<9;i++){const a=i*7;c.beginPath();c.moveTo(ex+Math.cos(a)*impact*40,ey+Math.sin(a)*impact*40);c.lineTo(ex+Math.cos(a)*(25+impact*60),ey+Math.sin(a)*(25+impact*60));c.stroke();}}
 c.restore();
}
