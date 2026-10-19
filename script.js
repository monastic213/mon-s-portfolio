const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const EMAIL = 'Rbanaags1@gmail.com';

// Theme toggle
function setTheme(t){
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
  try { localStorage.setItem('theme', t); } catch(e){}
}
let saved = 'light';
try { saved = localStorage.getItem('theme') || 'light'; } catch(e){}
setTheme(saved);
themeBtn.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });

// Active link on scroll
const links = document.querySelectorAll('nav a');
const sections = [...links].map(a => document.getElementById(a.dataset.link));
function onScroll(){
  const y = window.scrollY + 140;
  let current = sections[0].id;
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) current = sections[sections.length-1].id;
  links.forEach(a => a.classList.toggle('active', a.dataset.link === current));
}
window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

// Typing effect
const phrases = ['learning web development', 'working toward full stack', 'building TechPath with my team'];
const typed = document.getElementById('typed');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typed.textContent = phrases[0];
} else {
  let p = 0, c = 0, del = false;
  (function tick(){
    const word = phrases[p];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; p = (p + 1) % phrases.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 75);
  })();
}

// Copy email
const copyMsg = document.getElementById('copyMsg');
document.getElementById('copyBtn').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyMsg.textContent = 'Email address copied.';
  } catch(e) {
    copyMsg.textContent = 'Copy failed. My email is ' + EMAIL + '.';
  }
});
