import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {artwork} from '../dist/art.js';
import {anchors} from '../dist/art-anchors.js';
import {drawEffect} from '../dist/effects.js';
const root=path.resolve(import.meta.dirname,'..'),report=JSON.parse(await readFile(path.join(root,'art/qa-report.json'),'utf8'));
assert.equal(artwork.length,23);assert.equal(report.length,23);let total=0,textureBytes=0;
for(const a of artwork){const r=report.find(x=>x.id===a.id);assert.ok(r&&!r.error,a.id);const b=await readFile(path.join(root,'dist/assets',a.id+'.webp'));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');assert.equal(b.length,r.bytes);total+=b.length;textureBytes+=r.width*r.height*4;if(!a.id.startsWith('bg-')){assert.ok(r.hasAlpha&&r.alphaFraction>.08,a.id+' alpha');assert.ok(anchors[a.id].y>0&&anchors[a.id].y<=1);assert.ok(anchors[a.id].visibleHeight>=.2&&anchors[a.id].visibleHeight<=1);}else assert.deepEqual([r.width,r.height],[1600,900]);}
for(let cls=0;cls<3;cls++)for(let i=0;i<6;i++){const svg=await readFile(path.join(root,`dist/assets/skill-${cls}-${i}.svg`),'utf8');assert.ok(svg.includes('<svg')&&!svg.includes('<script'));}
for(const name of ['panel','portrait','skill'])assert.ok((await stat(path.join(root,`dist/assets/frame-${name}.svg`))).size>100);
const c=new Proxy({},{get:()=> (...args)=>{for(const a of args)if(typeof a==='number')assert.ok(Number.isFinite(a));},set:(_t,_k,v)=>{if(typeof v==='number')assert.ok(Number.isFinite(v));return true;}});
for(let element=0;element<5;element++)for(let cls=0;cls<3;cls++)for(const phase of [0,.2,.5,.8,1])drawEffect(c,element,cls,phase,[300,300],[700,300],true);
assert.ok(total<5*1024*1024,'download budget');assert.ok(textureBytes<64*1024*1024,'decoded texture budget');
console.log(`PASS: 23 raster assets, 18 icons, 3 frames, 15 class/element VFX combinations. ${(total/1048576).toFixed(2)} MiB download; ${(textureBytes/1048576).toFixed(1)} MiB decoded textures.`);
