// Order form: live word count and price at $0.10 per word.
const RATE_CENTS = 10;
const $ = (selector) => document.querySelector(selector);

const text = $('#text');
const words = $('#words');
const total = $('#total');
const pay = $('#pay');
const payNote = $('#pay-note');
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function countWords(value) {
  const matches = value.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

function updateSummary() {
  const n = countWords(text.value);
  words.textContent = n.toLocaleString('en-US');
  total.textContent = money.format((n * RATE_CENTS) / 100);
  pay.disabled = n === 0;
}

text.addEventListener('input', updateSummary);

// Paste text / Upload Word file tabs
document.querySelectorAll('[data-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-tab]').forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
  });
});

// Word upload: shows the file name only. Counting words inside a .docx needs the real back end.
$('#file').addEventListener('change', (event) => {
  const file = event.target.files[0];
  $('#file-name').textContent = file ? `Selected: ${file.name}` : '';
});

// Mockup only: no payment provider is connected yet.
pay.addEventListener('click', () => {
  payNote.textContent = 'Payment is not connected yet. This is a design mockup.';
});
