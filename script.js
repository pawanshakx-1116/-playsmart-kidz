// Playsmart Kidz - script.js
// Data and small interactive features for sections 1,2,3,4,8,10

// --- Simple data (replace thumbnails & links with your real content) ---
const latestVideos = [
  {title:'Alphabet Learning A-Z',thumb:'https://i.ytimg.com/vi/2mp9zdokt14/hqdefault.jpg',url:'#'},
  {title:'Colors for Kids',thumb:'https://i.ytimg.com/vi/Yi2I1Kf1XjU/hqdefault.jpg',url:'#'},
  {title:'Counting Fun 1-10',thumb:'https://i.ytimg.com/vi/Sk5n4lGmAtk/hqdefault.jpg',url:'#'}
];
const popularShorts = [
  {title:'Fast Shapes',thumb:'https://i.ytimg.com/vi/2mp9zdokt14/hqdefault.jpg',url:'#'},
  {title:'Quick Rhymes',thumb:'https://i.ytimg.com/vi/Yi2I1Kf1XjU/hqdefault.jpg',url:'#'}
];
const characters = [
  {name:'Bubbles',desc:'Curious balloon buddy',img:'https://via.placeholder.com/300x200?text=Bubbles'},
  {name:'Piku',desc:'Playful puppy',img:'https://via.placeholder.com/300x200?text=Piku'},
  {name:'Luna',desc:'Smart little moon',img:'https://via.placeholder.com/300x200?text=Luna'}
];

// --- Fill Latest Videos ---
const videosGrid = document.getElementById('videos-grid');
latestVideos.forEach(v=>{
  const d = document.createElement('div'); d.className='card';
  d.innerHTML = `<div class="video-thumb"><img src="${v.thumb}" alt="${v.title}"></div><div style="padding:8px"><strong>${v.title}</strong><div class="muted">Short • 0:45</div></div>`;
  videosGrid.appendChild(d);
});

// --- Fill Popular Shorts ---
const shortsRow = document.getElementById('shorts-row');
popularShorts.forEach(s=>{
  const d = document.createElement('div'); d.className='card'; d.style.minWidth='260px';
  d.innerHTML = `<img src="${s.thumb}" alt="${s.title}" style="width:100%;border-radius:8px"><div style="padding:8px"><strong>${s.title}</strong></div>`;
  shortsRow.appendChild(d);
});

// --- Fill Characters ---
const charsGrid = document.getElementById('chars-grid');
characters.forEach(c=>{
  const el = document.createElement('div'); el.className='card';
  el.innerHTML = `<img src="${c.img}" alt="${c.name}" style="width:100%;border-radius:8px"><div style="padding:8px"><strong>${c.name}</strong><div class="muted">${c.desc}</div></div>`;
  charsGrid.appendChild(el);
});

// --- Points system ---
function getPoints(){return Number(localStorage.getItem('pk_points')||0)}
function addPoints(n){const p=getPoints()+n;localStorage.setItem('pk_points',p);alert('You earned '+n+' stars! Total: '+p)}

// --- Number Guess Game ---
function startNumberGame(){
  const container = document.getElementById('number-game');
  container.innerHTML = '';
  const target = Math.floor(Math.random()*10)+1;
  const input = document.createElement('input'); input.type='number'; input.min=1; input.max=10; input.placeholder='Enter 1-10';
  const btn = document.createElement('button'); btn.textContent='Guess'; btn.onclick = ()=>{
    const v = Number(input.value);
    if(!v) return alert('Enter a number');
    if(v===target){ addPoints(5); container.innerHTML = '<div>🎉 Correct! +5 stars</div>' }
    else { container.innerHTML = `<div>😅 Oops! The number was ${target}. Try again.</div>` }
  };
  container.appendChild(input); container.appendChild(btn);
}
// initialize number game
document.addEventListener('DOMContentLoaded',()=>{ startNumberGame(); initColorPalette(); })

// --- Color Clicker ---
const colors = [{name:'Red',hex:'#ef4444'},{name:'Blue',hex:'#3b82f6'},{name:'Green',hex:'#10b981'},{name:'Yellow',hex:'#f59e0b'},{name:'Pink',hex:'#ff6b9a'},{name:'Purple',hex:'#8b5cf6'}];
function initColorPalette(){
  const pal = document.getElementById('color-palette');
  colors.forEach(c=>{
    const s = document.createElement('div'); s.className='color-swatch'; s.style.background=c.hex; s.textContent=c.name;
    s.onclick = ()=>{ speak(c.name); addPoints(2); }
    pal.appendChild(s);
  });
}
function speak(text){ if(window.speechSynthesis){ const u = new SpeechSynthesisUtterance(text); u.lang='en-US'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u) }}

// --- Subscribe modal ---
function openSubscribe(){ document.getElementById('subscribeModal').classList.remove('hidden') }
function closeSubscribe(){ document.getElementById('subscribeModal').classList.add('hidden') }
function saveSubscribe(){ const e = document.getElementById('subEmail').value; if(!e) return alert('Enter email'); localStorage.setItem('pk_sub',e); alert('Subscribed!'); closeSubscribe() }