import {createRequire} from 'node:module';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
const require=createRequire(import.meta.url);
let sharp;try{sharp=require('sharp');}catch{sharp=require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');}
const root=path.resolve(import.meta.dirname,'..'),frames=path.join(root,'../../tmp/academy-film');await mkdir(frames,{recursive:true});
for(const id of ['bg-library','bg-rooftop'])await sharp(path.join(root,'art/source',id+'.png')).resize(1600,900,{fit:'cover'}).webp({quality:84}).toFile(path.join(root,'dist/assets',id+'.webp'));
const backgrounds=await Promise.all(['bg-alley','bg-park','bg-rooftop'].map(id=>readFile(path.join(root,'dist/assets',id+'.webp'))));
const hero=await sharp(path.join(root,'dist/assets/hero-mage.webp')).resize({height:400}).png().toBuffer(),pet=await sharp(path.join(root,'dist/assets/pet-wood.webp')).resize({height:190}).png().toBuffer();
const W=960,H=540,FPS=24,N=240;
for(let f=0;f<N;f++){
 const t=f/FPS,scene=Math.min(2,Math.floor(t/(10/3))),u=(t-scene*10/3)/(10/3),z=1.04+u*.06;
 const bg=await sharp(backgrounds[scene]).resize(Math.ceil(W*z),Math.ceil(H*z)).extract({left:Math.floor((Math.ceil(W*z)-W)*(.3+.3*u)),top:Math.floor((Math.ceil(H*z)-H)*.3),width:W,height:H}).png().toBuffer();
 const particles=Array.from({length:22},(_,i)=>{const x=(i*83+t*17)%W,y=100+((i*41-t*11)%350+350)%350;return `<circle cx="${x}" cy="${y}" r="${1+i%3}" fill="#d7f1b3" opacity="${.15+.25*Math.sin(i+t)**2}"/>`;}).join('');
 const shade=scene===0?.32:.1,fade=Math.max(0,1-u*8,(u-.91)/.09)*.7;
 const overlay=Buffer.from(`<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="#0a2330" opacity="${shade}"/>${particles}${scene===2?Array.from({length:5},(_,i)=>`<circle cx="${345+i*68}" cy="${170+Math.sin(t*2+i)*8}" r="16" fill="${['#e7d9a5','#83e0ac','#7bc9ff','#ff8c7c','#dcb683'][i]}" opacity=".85"/><circle cx="${345+i*68}" cy="${170+Math.sin(t*2+i)*8}" r="23" fill="none" stroke="#fff1b6" stroke-width="1"/>`).join(''):''}<rect width="100%" height="100%" fill="#0a1c28" opacity="${fade}"/></svg>`);
 const layers=[];if(scene===1){layers.push({input:hero,left:570+Math.round(u*12),top:110},{input:pet,left:475,top:315-Math.round(Math.sin(u*6)*5)});}layers.push({input:overlay});
 await sharp(bg).composite(layers).png().toFile(path.join(frames,String(f).padStart(4,'0')+'.png'));
 if(f%80===0)console.log(`Film frame ${f}/${N}`);
}
const sr=44100,samples=sr*10,data=Buffer.alloc(samples*2),notes=[261.63,329.63,392,523.25,392,329.63,293.66,392,440,523.25,659.25,523.25,392,329.63,392,523.25,659.25,783.99,659.25,523.25];
for(let i=0;i<samples;i++){const t=i/sr,beat=Math.floor(t*2),local=t-beat/2,envelope=Math.sin(Math.PI*Math.min(1,local/.5))**2,fade=Math.min(1,t/1,(10-t)/1);const a=Math.sin(2*Math.PI*notes[beat]*t)*.055*envelope+Math.sin(2*Math.PI*130.815*t)*.012;data.writeInt16LE(Math.round(a*fade*32767),i*2);}
const wav=Buffer.alloc(44);wav.write('RIFF',0);wav.writeUInt32LE(36+data.length,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(sr,24);wav.writeUInt32LE(sr*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(data.length,40);await writeFile(path.join(frames,'music.wav'),Buffer.concat([wav,data]));
const ff=process.env.ACADEMY_FFMPEG||path.resolve(root,'../../.tmp-video-libs/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v9.0.2.exe');
const result=spawnSync(ff,['-y','-framerate','24','-i',path.join(frames,'%04d.png'),'-i',path.join(frames,'music.wav'),'-c:v','libx264','-preset','fast','-crf','23','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-t','10','-movflags','+faststart',path.join(root,'dist/assets/academy-intro.mp4')],{encoding:'utf8'});
if(result.status!==0)throw Error(result.stderr);console.log('Created 10-second MP4, 960x540, 24fps, original synthesized soundtrack.');
