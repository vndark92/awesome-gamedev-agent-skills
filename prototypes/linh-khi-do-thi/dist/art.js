export const heroes=['hero-mage','hero-body','hero-beast'];
export const companions=['pet-metal','pet-wood','pet-water','pet-fire','pet-earth'];
export const backgrounds=['bg-alley','bg-park','bg-metro'];
export const bosses=['boss-stone','boss-tree','boss-water'];
export const enemies=[['mob-dust','mob-rat','mob-scrap'],['mob-vine','mob-moth','mob-root'],['mob-mist','mob-armor','mob-shadow']];
export const artwork=[
 ...heroes.map((id,i)=>({id,group:'Nhân vật',name:['Pháp tu','Thể tu','Luyện thú sư'][i]})),
 ...backgrounds.map((id,i)=>({id,group:'Bối cảnh',name:['Hẻm An Hòa','Công viên Vọng Nguyệt','Ga metro số 09'][i]})),
 ...bosses.map((id,i)=>({id,group:'Thủ lĩnh',name:['Thạch Vệ','Cổ Thụ Lạc Tâm','Thủy Linh Vỡ Mộng'][i]})),
 ...companions.map((id,i)=>({id,group:'Linh thú',name:['Thiết Vũ · Kim','Mộc Miên · Mộc','Giọt Mưa · Thủy','Đốm Lửa · Hỏa','Đá Nhỏ · Thổ'][i]})),
 ...enemies.flat().map((id,i)=>({id,group:'Quái vật',name:['Bụi linh','Chuột cuồng hóa','Mảnh sắt sống','Dây leo cuồng','Bướm phấn độc','Rễ cây thức tỉnh','Sương linh','Giáp vệ bỏ hoang','Thủy ảnh'][i]}))
];
export const assetUrl=id=>new URL(`./assets/${id}.webp`,import.meta.url).href;
export const iconUrl=(cls,index)=>new URL(`./assets/skill-${cls}-${index}.svg`,import.meta.url).href;
const bank=new Map();
export function getArt(id){return bank.get(id)?.image||null;}
export function loadArt(id){if(bank.has(id))return bank.get(id).promise;const entry={image:null,promise:null};entry.promise=new Promise(resolve=>{const image=new Image();image.onload=()=>{entry.image=image;resolve(true);};image.onerror=()=>resolve(false);image.src=assetUrl(id);});bank.set(id,entry);return entry.promise;}
export function loadAllArt(){return Promise.all(artwork.map(async a=>({id:a.id,ok:await loadArt(a.id)})));}
export function installArtUI(state){const portrait=document.querySelector('#hero-portrait');if(portrait&&portrait.dataset.hero!==heroes[state.cls]){portrait.src=assetUrl(heroes[state.cls]);portrait.dataset.hero=heroes[state.cls];portrait.alt=['Pháp tu với pháp ấn ngọc','Thể tu với hộ thủ đồng','Luyện thú sư với khế ước linh thú'][state.cls];}document.documentElement.style.setProperty('--spirit-color',['#e7d9a5','#83e0ac','#7bc9ff','#ff8c7c','#dcb683'][state.element]);}
