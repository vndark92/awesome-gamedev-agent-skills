import {colors} from './engine.js';
import {heroes,companions,backgrounds,bosses,enemies,getArt,loadArt} from './art.js';
import {drawEffect,effectNames} from './effects.js';
import {anchors} from './art-anchors.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function oval(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function sprite(c,id,x,ground,h,opts={}){const image=getArt(id);if(!image){loadArt(id);return;}const anchor=anchors[id]||{x:.5,y:1,visibleHeight:1};h/=anchor.visibleHeight;const width=h*image.width/image.height;c.save();c.translate(x,ground);c.rotate(opts.angle||0);c.scale(1,opts.breathe||1);c.globalAlpha=opts.alpha??1;if(opts.hit)c.filter='brightness(1.7)';c.drawImage(image,-width*anchor.x,-h*anchor.y,width,h);c.restore();}
export function drawWorld(canvas,s,f,e,time){
 const c=canvas.getContext('2d'),w=1000,h=560,motion=!reduced.matches,t=motion?time:0,age=e?(time-e.time):10000,active=age>=0&&age<750,phase=age/750;
 c.clearRect(0,0,w,h);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
 const bg=getArt(s.background||backgrounds[s.zone]);if(bg)c.drawImage(bg,0,0,w,h);else{loadArt(s.background||backgrounds[s.zone]);c.fillStyle='#233c49';c.fillRect(0,0,w,h);c.fillStyle='#c8ddd5';c.font='16px sans-serif';c.fillText('Đang mở cảnh An Hòa…',395,210);}
 const veil=c.createLinearGradient(0,0,0,h);veil.addColorStop(0,'#07182770');veil.addColorStop(.35,'#07182700');veil.addColorStop(.75,'#07182708');veil.addColorStop(1,'#071827cc');c.fillStyle=veil;c.fillRect(0,0,w,h);
 const ground=455,heroX=f?340:465,enemyX=720,petX=heroX-110,heroH=250;
 const lunge=active&&motion?Math.sin(Math.min(1,phase*2)*Math.PI)*(s.cls===1?65:18):0;
 oval(c,heroX,ground,48,11,'#07182260');oval(c,petX,ground+12,29,8,'#07182250');
 c.save();c.strokeStyle=colors[s.element];c.globalAlpha=.22;c.lineWidth=1.5;for(let i=0;i<2;i++){c.beginPath();c.ellipse(heroX,ground,57+i*10,15+i*4,0,0,Math.PI*2);c.stroke();}c.restore();
 sprite(c,heroes[s.cls],heroX+lunge,ground,heroH,{breathe:1+Math.sin(t/650)*.006,angle:active&&motion?Math.sin(phase*Math.PI)*.025:0});
 sprite(c,companions[s.pet],petX+(active&&s.cls===2&&motion?Math.sin(phase*Math.PI)*55:0),ground+7+Math.sin(t/550)*3,104,{breathe:1+Math.sin(t/500)*.012});
 if(f){const mob=f.artId||enemies[s.zone][s.wins[s.zone]%3],id=f.boss?bosses[s.zone]:mob,enemyH=(f.boss||f.large)?(s.zone===2?242:290):170;oval(c,enemyX,ground,enemyH*.22,14,'#09162666');const knock=active&&phase>.45&&motion?Math.sin((phase-.45)*Math.PI/.55)*14:0;sprite(c,id,enemyX+knock,ground,enemyH,{breathe:1+Math.sin(t/700)*.007,hit:active&&phase>.45&&phase<.58});}
 if(active){drawEffect(c,s.element,s.cls,phase,[heroX+45,ground-135],[enemyX,ground-115],e.skill);c.save();c.globalAlpha=1-phase;c.font=`bold ${e.skill?32:25}px 'Be Vietnam Pro',sans-serif`;c.textAlign='center';c.strokeStyle='#172330';c.lineWidth=4;c.fillStyle=e.skill?'#fff0bc':'#eef8ee';c.strokeText('-'+e.damage,enemyX,ground-205-phase*50);c.fillText('-'+e.damage,enemyX,ground-205-phase*50);if(e.skill){c.font='12px sans-serif';c.fillStyle=colors[s.element];c.fillText(effectNames[s.element],heroX,ground-heroH-18);}c.restore();}
 for(let i=0;i<24;i++){const x=(i*97+t*.01)%1000,y=180+((i*47-t*.014)%340+340)%340;c.globalAlpha=.12+.45*Math.sin(t/900+i)**2;oval(c,x,y,1.2+i%2*.6,1.2+i%2*.6,'#beeddf');}c.globalAlpha=1;
}
