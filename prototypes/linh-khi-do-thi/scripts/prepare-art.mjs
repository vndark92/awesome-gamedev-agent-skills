// Deterministic import only: alpha bounds, resizing, format conversion and QA.
import {createRequire} from 'node:module';
import {readFile,mkdir,copyFile,writeFile,stat} from 'node:fs/promises';
import path from 'node:path';
const require=createRequire(import.meta.url);
let sharp;try{sharp=require('sharp');}catch{sharp=require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');}
const root=path.resolve(import.meta.dirname,'..');
const entries=JSON.parse(await readFile(path.join(root,'art/imports.json'),'utf8'));
await mkdir(path.join(root,'dist/assets'),{recursive:true});await mkdir(path.join(root,'art/source'),{recursive:true});
const report=[],anchors={};
for(const item of entries){
 const original=path.join(root,'art/source',item.id+'.png'),source=path.resolve(root,item.source);if(source!==original)await copyFile(source,original);
 const src=sharp(original),meta=await src.metadata(),background=item.id.startsWith('bg-');
 let bounds={left:0,top:0,width:meta.width,height:meta.height},transparent=0;
 if(!background){
  const {data,info}=await src.clone().ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let left=info.width,top=info.height,right=0,bottom=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){const a=data[(y*info.width+x)*4+3];if(a<8)transparent++;if(a>16){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}}
  if(transparent/(info.width*info.height)<.08){report.push({id:item.id,error:'Missing usable transparent background',alphaFraction:transparent/(info.width*info.height)});continue;}
  bounds={left:Math.max(0,left-4),top:Math.max(0,top-4),width:Math.min(info.width,right+5)-Math.max(0,left-4),height:Math.min(info.height,bottom+5)-Math.max(0,top-4)};
 }
 const size=background?[1600,900]:item.id.startsWith('hero-')?[512,640]:[640,640];
 const out=path.join(root,'dist/assets',item.id+'.webp');
 await src.extract(bounds).resize(size[0],size[1],{fit:background?'cover':'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:background?88:92,alphaQuality:100,effort:6}).toFile(out);
 const outmeta=await sharp(out).metadata();
 if(!background){const {data,info}=await sharp(out).ensureAlpha().raw().toBuffer({resolveWithObject:true});let top=info.height,bottom=0;for(let y=0;y<info.height;y++){let solid=0;for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>192)solid++;if(solid>3){top=Math.min(top,y);bottom=y;}}anchors[item.id]={x:.5,y:(bottom+1)/info.height,visibleHeight:Math.max(.2,(bottom-top+1)/info.height)};}
 report.push({id:item.id,width:outmeta.width,height:outmeta.height,hasAlpha:outmeta.hasAlpha,alphaFraction:transparent/(meta.width*meta.height),sourceSize:[meta.width,meta.height],bounds,bytes:(await stat(out)).size,path:'assets/'+item.id+'.webp',anchor:anchors[item.id]||null});
}
await writeFile(path.join(root,'art/qa-report.json'),JSON.stringify(report,null,2));
await writeFile(path.join(root,'dist/art-anchors.js'),'// Generated from opaque pixel bounds. Feet grounded independently of texture padding.\nexport const anchors='+JSON.stringify(anchors,null,2)+';\n');
console.log(JSON.stringify(report.map(x=>({id:x.id,size:[x.width,x.height],bytes:x.bytes,error:x.error}))));
if(report.some(x=>x.error))process.exitCode=1;
