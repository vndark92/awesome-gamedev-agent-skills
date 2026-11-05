export const paths=['Pháp tu','Thể tu','Luyện thú sư'];
export const tiers=['Khám phá','Tinh anh','Hộ pháp'];
export const slots={weapon:'Vũ khí',armor:'Áo giáp',charm:'Phù hộ'};
export const items=[
 ['rod','Bút trúc','weapon',1,5,0],['coat','Áo học viện','armor',1,0,2],
 ['stone','Ấn Thạch Vệ','charm',2,4,1],['blade','Kiếm giấy','weapon',3,12,0],
 ['leaf','Áo lá xanh','armor',3,0,5],['dew','Phù giọt sương','charm',4,6,3],
 ['sun','Trượng bình minh','weapon',5,20,0],['shell','Giáp hộ pháp','armor',5,2,7],
 ['seal','Ngọc ngũ hành','charm',6,12,3]
].map(([id,name,slot,level,atk,hp])=>({id,name,slot,level,atk,hp}));
const names=[['Dẫn khí','Tụ tinh','Linh thuẫn'],['Khai mạch','Phá thạch','Thiết cốt'],['Khế ước','Song kích','Hộ chủ']];
export const nodes=names.flatMap((branch,h)=>branch.map((name,i)=>({id:h+'-'+i,name,h,i,parent:i?h+'-0':null,min:[1,2,3][i],atk:[6,12,0][i],hp:[1,0,3][i]})));
const dropIds=['stone','blade','leaf','dew','sun'];
export function level(x){return Math.min(20,1+Math.floor(x.xp/50));}
export function skillRank(x){return Math.min(5,1+Math.floor((level(x)-1)/3));}
export function points(x){return level(x)-Object.values(x.ranks).reduce((a,b)=>a+b,0);}
export function whyLearn(x,n){
 const rank=x.ranks[n.id]||0;
 if(rank>=3)return 'Đã tối đa';if(n.parent&&!x.ranks[n.parent])return 'Cần mở '+nodes.find(y=>y.id===n.parent).name;
 if(level(x)<n.min+rank)return 'Cần cấp '+(n.min+rank);if(points(x)<1)return 'Cần 1 điểm rễ';return '';
}
export function learn(x,id){const n=nodes.find(y=>y.id===id);if(!n||whyLearn(x,n))return x;return {...x,ranks:{...x.ranks,[id]:(x.ranks[id]||0)+1}};}
export function equip(x,id){const item=items.find(i=>i.id===id);if(!item||!x.bag.includes(id)||level(x)<item.level)return x;return {...x,worn:{...x.worn,[item.slot]:x.worn[item.slot]===id?null:id}};}
export function stats(x,hero){let atk=100+(skillRank(x)-1)*12,hp=12;for(const n of nodes.filter(y=>y.h===hero)){atk+=n.atk*(x.ranks[n.id]||0);hp+=n.hp*(x.ranks[n.id]||0);}for(const item of items)if(x.worn[item.slot]===item.id){atk+=item.atk;hp+=item.hp;}return {atk,hp};}
export function loadBuild(raw,stars){
 const oldClears=stars.flatMap((n,m)=>n?[m+'-0']:[]);
 const x={xp:oldClears.length*50,clears:oldClears,bag:['rod','coat',...oldClears.map(k=>dropIds[Number(k[0])])],worn:{},ranks:{}};
 if(!raw||typeof raw!=='object')return x;
 if(Number.isSafeInteger(raw.xp)&&raw.xp>=0)x.xp=Math.max(x.xp,Math.min(raw.xp,1000000));
 if(Array.isArray(raw.clears))x.clears=[...new Set([...oldClears,...raw.clears.filter(k=>typeof k==='string'&&/^[0-4]-[0-2]$/.test(k))])];
 if(Array.isArray(raw.bag))x.bag=[...new Set([...x.bag,...raw.bag.filter(id=>items.some(i=>i.id===id))])];
 for(const n of nodes){const rank=raw.ranks?.[n.id];if(Number.isInteger(rank))for(let r=0;r<Math.min(3,rank);r++){if(whyLearn(x,n))break;x.ranks[n.id]=(x.ranks[n.id]||0)+1;}}
 for(const i of items)if(raw.worn?.[i.slot]===i.id&&x.bag.includes(i.id)&&level(x)>=i.level)x.worn[i.slot]=i.id;
 return x;
}
export function available(x,unlocked,map,tier){return Number.isInteger(map)&&map>=0&&map<=unlocked&&map<5&&Number.isInteger(tier)&&tier>=0&&tier<=2&&(tier===0||x.clears.includes(map+'-'+(tier-1)));}
export function reward(x,map,tier){const key=map+'-'+tier,first=!x.clears.includes(key),xp=first?50+tier*15:20+tier*5,id=tier===2?'seal':tier===1?'shell':dropIds[map];const drop=first&&!x.bag.includes(id)?id:null;
 return {xp,drop,first,next:{...x,xp:x.xp+xp,clears:first?[...x.clears,key]:x.clears,bag:drop?[...x.bag,drop]:x.bag}};}
