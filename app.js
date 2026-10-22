function computeDiff(orig, mod) {
  const a = orig.split('\n');
  const b = mod.split('\n');
  const diff = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      diff.push({ type: 'same', text: a[i], numA: i + 1, numB: j + 1 });
      i++; j++;
    } else if (j < b.length && (!a.includes(b[j]) || i >= a.length)) {
      diff.push({ type: 'add', text: b[j], numB: j + 1 });
      j++;
    } else if (i < a.length) {
      diff.push({ type: 'del', text: a[i], numA: i + 1 });
      i++;
    } else {
      j++;
    }
  }
  return diff;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const origInput = document.getElementById('origText');
    const modInput = document.getElementById('modText');
    const diffOut = document.getElementById('diffOutput');
    
    origInput.value = `function greet(name) {\n  console.log("Hello, " + name);\n  return true;\n}`;
    modInput.value = `function greet(name, title = "Dev") {\n  console.log("Hello, " + title + " " + name);\n  return 200;\n}`;

    function renderDiff() {
      const orig = origInput.value;
      const mod = modInput.value;
      const results = computeDiff(orig, mod);
      
      let html = '';
      let adds = 0, dels = 0;
      results.forEach(d => {
        if (d.type === 'add') adds++;
        if (d.type === 'del') dels++;
        const prefix = d.type === 'add' ? '+ ' : d.type === 'del' ? '- ' : '  ';
        const num = d.numB || d.numA || ' ';
        html += `<div class="diff-line ${d.type}"><span class="diff-num">${num}</span><span>${prefix}${d.text.replace(/</g,'&lt;')}</span></div>`;
      });
      diffOut.innerHTML = html || '<p class="placeholder">No content</p>';
      document.getElementById('origLines').textContent = orig.split('\n').length;
      document.getElementById('modLines').textContent = mod.split('\n').length;
      document.getElementById('adds').textContent = '+' + adds;
      document.getElementById('dels').textContent = '-' + dels;
    }

    document.getElementById('compareBtn').addEventListener('click', renderDiff);
    document.getElementById('swapBtn').addEventListener('click', () => {
      const temp = origInput.value; origInput.value = modInput.value; modInput.value = temp; renderDiff();
    });
    document.getElementById('clearBtn').addEventListener('click', () => {
      origInput.value = ''; modInput.value = ''; diffOut.innerHTML = '<p class="placeholder">Cleared</p>';
    });
    renderDiff();
  });
}
if (typeof module !== 'undefined') module.exports = { computeDiff };
