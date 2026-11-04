import {artwork,assetUrl,iconUrl,loadAllArt,enemies} from './art.js';
import {fresh,classes,elements,pets,zones,skills} from './engine.js';
import {drawWorld} from './world.js';
const state=fresh(),$=s=>document.querySelector(s);let effect=null;
for(const [id,values,key] of [['class',classes,'cls'],['zone',zones.map(z=>z.name),'zone'],['element',elements,'element'],['pet',pets,'pet']]){const select=$('#preview-'+id);select.innerHTML=values.map((v,i)=>`<option value="${i}">${v}</option>`).join('');select.value=state[key];select.onchange=()=>{state[key]=Number(select.value);effect=null;};}
$('#cast').onclick=()=>{effect={time:performance.now(),damage:128,skill:true};};
for(const group of [...new Set(artwork.map(a=>a.group))]){const title=document.createElement('h2');title.className='group-title';title.textContent=group;$('#collection').append(title);const grid=document.createElement('div');grid.className='gallery-grid';grid.innerHTML=artwork.filter(a=>a.group===group).map(a=>`<figure class="art-tile ${a.id.startsWith('bg-')?'background':''}"><a href="${assetUrl(a.id)}" target="_blank" rel="noopener"><img src="${assetUrl(a.id)}" alt="${a.name}" loading="lazy"></a><figcaption>${a.name}<small>${a.id} · WebP</small></figcaption></figure>`).join('');$('#collection').append(grid);}
$('#icons').innerHTML=skills.flatMap((list,cls)=>list.map((name,i)=>`<figure><img src="${iconUrl(cls,i)}" alt="${name}"><figcaption>${name}</figcaption></figure>`)).join('');
loadAllArt().then(result=>{$('#preview-status').textContent=result.every(r=>r.ok)?' 23 hình ảnh đã tải · Có thể đổi mọi tổ hợp.':' Có ảnh chưa tải được. Hãy tải lại trang.';});
function frame(t){const val=$('#preview-enemy').value;drawWorld($('#preview'),state,{boss:val==='boss',artId:val==='boss'?null:enemies[state.zone][Number(val)]},effect,t);requestAnimationFrame(frame);}requestAnimationFrame(frame);
