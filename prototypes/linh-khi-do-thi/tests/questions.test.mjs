import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,subjects,shuffledOptions} from '../dist/questions.js';
test('48 original questions: unique IDs, four distinct choices, one answer and explanation',()=>{
assert.equal(questions.length,48);assert.equal(new Set(questions.map(q=>q.id)).size,48);
for(const subject of Object.keys(subjects))assert.equal(questions.filter(q=>q.subject===subject).length,12);
for(const q of questions){assert.equal(q.grade,2);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.answer]);assert.ok(q.explanation.length>10);assert.equal(q.alignment,'2026-edition-pending');}
});
test('shuffle preserves exactly one correct option and its text across every target index',()=>{
for(const q of questions)for(const rng of [()=>0,()=>.3,()=>.6,()=>.99]){const choices=shuffledOptions(q,rng);assert.equal(choices.filter(x=>x.correct).length,1);assert.equal(choices.find(x=>x.correct).text,q.options[q.answer]);assert.deepEqual(choices.map(x=>x.text).sort(),[...q.options].sort());}
});
test('arithmetic items independently evaluated',()=>{for(const q of questions.filter(q=>q.subject==='math')){const match=q.prompt.match(/^(\d+) ([+−×:]) (\d+) bằng/);if(match){const [,a,op,b]=match;const result=op==='+'?+a + +b:op==='−'?a-b:op==='×'?a*b:a/b;assert.equal(Number(q.options[q.answer]),result);}}});
