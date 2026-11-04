import {writeFileSync} from 'node:fs';
import {questions} from '../dist/questions.js';
writeFileSync(new URL('../dist/question-bank.json',import.meta.url),JSON.stringify({version:1,grade:2,status:'demo-self-reviewed-not-textbook-2026-certified',questions},null,2));
