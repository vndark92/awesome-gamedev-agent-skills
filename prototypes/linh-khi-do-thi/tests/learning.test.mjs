import test from 'node:test';import assert from 'node:assert/strict';
import {readLearning,recordLearning,medals} from '../dist/academy-learning.js';
import {freshProgress} from '../dist/academy-core.js';
test('old saves gain an empty journal; invalid learning data is sanitized',()=>{assert.deepEqual(readLearning(),{missed:[],best:0});assert.deepEqual(readLearning({missed:['a','a',null,3],best:-1}),{missed:['a'],best:0});assert.deepEqual(readLearning(null),{missed:[],best:0});});
test('wrong questions deduplicate and are removed after successful review',()=>{let l=recordLearning({},'q1',false,0);l=recordLearning(l,'q1',false,0);assert.deepEqual(l.missed,['q1']);l=recordLearning(l,'q2',false,0);l=recordLearning(l,'q1',true,0);assert.deepEqual(l.missed,['q2']);});
test('journal storage is bounded; best streak never decreases',()=>{let l={};for(let i=0;i<120;i++)l=recordLearning(l,'q'+i,false,0);assert.equal(l.missed.length,100);l=recordLearning(l,'x',true,4);l=recordLearning(l,'x',false,0);assert.equal(l.best,4);});
test('medals derive only from earned progress',()=>{const p=freshProgress();assert.ok(medals(p,readLearning()).every(x=>!x.earned));p.correct=20;p.stars=[1,1,1,1,1];assert.ok(medals(p,{best:3}).every(x=>x.earned));});
