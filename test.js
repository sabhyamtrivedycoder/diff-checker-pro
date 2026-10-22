const assert = require('assert');
const { computeDiff } = require('./app.js');
console.log('🧪 Testing Diff Checker Pro...');
const diff = computeDiff('hello\nworld', 'hello\nfriend');
assert(diff.length >= 2, 'Diff generates results');
assert(diff.some(d => d.type === 'same' && d.text === 'hello'), 'Identical lines identified');
console.log('✅ Diff Checker Pro test passed!');
