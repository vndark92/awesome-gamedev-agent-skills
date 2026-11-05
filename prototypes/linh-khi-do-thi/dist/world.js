import {colors} from './engine.js';
import {heroes,companions,backgrounds,bosses,enemies,getArt,loadArt} from './art.js';
import {drawEffect,effectNames} from './effects.js';
import {anchors} from './art-anchors.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function oval(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function sprite(c,id,x,ground,h,opts={}){const image=getArt(id);if(!image){loadArt(id);return;}const anchor=anchors[id]||{x:.5,y:1,visibleHeight:1};h/=anchor.visibleHeight;const width=h*image.width/image.height;c.save();c.translate(x,ground);c.rotate(opts.angle||0);c.scale(1,opts.breathe||1);c.globalAlpha=opts.alpha??1;if(opts.hit)c.filter='brightness(1.7)';c.drawImage(image,-width*anchor.x,-h*anchor.y,width,h);c.restore();}
export function drawWorld(canvas,s,f,e,time){
 const c=canvas.getContext('2d'),w=1000,h=560,motion=!reduced.matches,t=motion?time:0,age=e?(time-e.time):10000,active=age>=0&&age<(e?.duration||750),phase=age/(e?.duration||750),npc=e?.kind==='npc',victory=e?.kind==='victory';
 c.clearRect(0,0,w,h);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
 const bg=getArt(s.background||backgrounds[s.zone]);if(bg)c.drawImage(bg,0,0,w,h);else{loadArt(s.background||backgrounds[s.zone]);c.fillStyle='#233c49';c.fillRect(0,0,w,h);c.fillStyle='#c8ddd5';c.font='16px sans-serif';c.fillText('Đang mở cảnh An Hòa…',395,210);}
 const veil=c.createLinearGradient(0,0,0,h);veil.addColorStop(0,'#07182770');veil.addColorStop(.35,'#07182700');veil.addColorStop(.75,'#07182708');veil.addColorStop(1,'#071827cc');c.fillStyle=veil;c.fillRect(0,0,w,h);
 const ground=455,heroX=f?340:465,enemyX=720,petX=heroX-110,heroH=250;
 const lunge=active&&!npc&&!victory&&motion?Math.sin(Math.min(1,phase*2)*Math.PI)*(s.cls===1?65:18):0;
 oval(c,heroX,ground,48,11,'#07182260');oval(c,petX,ground+12,29,8,'#07182250');
 c.save();c.strokeStyle=colors[s.element];c.globalAlpha=.22;c.lineWidth=1.5;for(let i=0;i<2;i++){c.beginPath();c.ellipse(heroX,ground,57+i*10,15+i*4,0,0,Math.PI*2);c.stroke();}c.restore();
 sprite(c,heroes[s.cls],heroX+lunge-(npc&&active&&phase>.5&&motion?Math.sin((phase-.5)*Math.PI*2)*12:0),ground,heroH,{hit:npc&&active&&phase>.5&&phase<.65,breathe:1+Math.sin(t/650)*.006,angle:active&&!npc&&!victory&&motion?Math.sin(phase*Math.PI)*.025:0});
 sprite(c,companions[s.pet],petX+(active&&!npc&&!victory&&s.cls===2&&motion?Math.sin(phase*Math.PI)*55:0),ground+7+Math.sin(t/550)*3,104,{breathe:1+Math.sin(t/500)*.012});
 if(f){const mob=f.artId||enemies[s.zone][s.wins[s.zone]%3],id=f.boss?bosses[s.zone]:mob,enemyH=(f.boss||f.large)?(s.zone===2?242:290):170;oval(c,enemyX,ground,enemyH*.22,14,'#09162666');const knock=active&&!npc&&!victory&&phase>.45&&motion?Math.sin((phase-.45)*Math.PI/.55)*14:0;sprite(c,id,enemyX+knock-(npc&&active&&motion?Math.sin(Math.min(1,phase*2)*Math.PI)*36:0),ground,enemyH,{breathe:1+Math.sin(t/700)*.007,hit:active&&!npc&&!victory&&phase>.45&&phase<.58});}
 if(active){
  c.save();
  if(victory){c.globalAlpha=Math.sin(Math.PI*phase);c.fillStyle='#ffe6a5';for(let i=0;i<24;i++){const a=i*2.399,x=500+Math.cos(a)*(80+phase*250),y=270+Math.sin(a)*(40+phase*150);c.beginPath();c.arc(x,y,3+i%3,0,7);c.fill();}c.font='bold 25px sans-serif';c.textAlign='center';c.fillText('MẢNH TRI THỨC ĐÃ TRỞ VỀ',500,150);}
  else{
   const start=npc?[enemyX-20,ground-120]:[heroX+45,ground-135],end=npc?[heroX,ground-130]:[enemyX,ground-115];
   if(motion)drawEffect(c,s.element,npc?0:s.cls,phase,start,end,true);
   else{c.globalAlpha=.6;c.strokeStyle=colors[s.element];c.lineWidth=4;c.beginPath();c.arc(end[0],end[1],45,0,Math.PI*2);c.stroke();}
   if(phase>.5){c.globalAlpha=1-(phase-.5)*2;c.font='bold 30px sans-serif';c.textAlign='center';c.strokeStyle='#172330';c.lineWidth=5;c.fillStyle=npc?'#ffd4c5':'#fff0bc';const label='−'+e.damage+(npc?' ♥':'');c.strokeText(label,end[0],ground-215-(motion?phase*30:0));c.fillText(label,end[0],ground-215-(motion?phase*30:0));}
   if(npc&&e.guard){c.globalAlpha=.65;c.strokeStyle='#b9ffe3';c.lineWidth=5;c.beginPath();c.ellipse(heroX,ground-120,65,100,0,0,Math.PI*2);c.stroke();}
   c.globalAlpha=.95;c.textAlign='center';c.font='bold 16px sans-serif';c.fillStyle='#fff4d5';c.fillText(e.label||effectNames[s.element],npc?enemyX:heroX,ground-heroH-25);
   if(e.streak>=2&&!npc){c.fillStyle='#c3ffe1';c.font='13px sans-serif';c.fillText(e.streak+' câu đúng liên tiếp',heroX,ground-heroH-47);}
  }c.restore();
 }
 for(let i=0;i<24;i++){const x=(i*97+t*.01)%1000,y=180+((i*47-t*.014)%340+340)%340;c.globalAlpha=.12+.45*Math.sin(t/900+i)**2;oval(c,x,y,1.2+i%2*.6,1.2+i%2*.6,'#beeddf');}c.globalAlpha=1;
}
