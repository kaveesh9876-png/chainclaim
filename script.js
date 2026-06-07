// ── GLOBALS ──
let blockNum = 7429841;
let claimCounter = 100;
let sparkData = {1:[],2:[],3:[],4:[]};
let chartMode = '7d';
let animFrame;

// ── INITIAL CLAIMS ──
const CLAIM_TYPES = ['Vehicle Accident','Property Damage','Medical Emergency','Theft/Burglary','Natural Disaster','Equipment Failure'];
const STATUSES = ['approved','pending','review','rejected'];
const STATUS_LABELS = {approved:'Approved',pending:'Pending',review:'In Review',rejected:'Rejected'};
let claims = [];

function randInt(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function randItem(arr){return arr[Math.floor(Math.random()*arr.length)];}
function fmtAmt(n){return '$'+(n).toLocaleString();}

function genClaim(){
  return {
    id: 'CLM-'+String(claimCounter++).padStart(5,'0'),
    type: randItem(CLAIM_TYPES),
    status: randItem(STATUSES),
    amount: randInt(1200,85000),
    policy: 'POL-'+randInt(1000,9999),
    time: 'Just now',
    device: 'DEV-'+randInt(1000,9999)
  };
}

function renderClaims(){
  const list = document.getElementById('claims-list');
  if (!list) return;
  list.innerHTML = claims.slice(-12).reverse().map(c => `
    <div class="claim-item">
      <div class="claim-top">
        <span class="claim-id">${c.id}</span>
        <span class="status-pill ${c.status}">${STATUS_LABELS[c.status]}</span>
      </div>
      <div class="claim-desc">${c.type} · ${c.policy}</div>
      <div class="claim-meta">
        <span>📡 ${c.device}</span>
        <span class="claim-amount">${fmtAmt(c.amount)}</span>
        <span>${c.time}</span>
      </div>
    </div>
  `).join('');
  const count = document.getElementById('claim-count');
  if (count) count.textContent = claims.length + ' active';
}

// Init claims
for(let i=0;i<10;i++) claims.push({...genClaim(), time: randInt(1,60)+'m ago'});
renderClaims();

// ── BLOCKCHAIN BLOCKS ──
const blocksFeed = document.getElementById('blocks-feed');
let blockRows = [];

function addBlock(){
  blockNum++;
  const block = {
    num: blockNum,
    hash: '0x'+Math.random().toString(16).substr(2,12)+'...'+Math.random().toString(16).substr(2,4),
    txn: randInt(12,180),
    gas: randInt(18,45)+' Gwei',
    time: 'now'
  };
  blockRows.unshift(block);
  if(blockRows.length > 8) blockRows.pop();
  if (blocksFeed) {
    blocksFeed.innerHTML = blockRows.map((b,i) => `
      <div class="block-row" style="opacity:${1-i*0.1}">
        <span class="block-num">#${b.num.toLocaleString()}</span>
        <span class="block-hash">${b.hash}</span>
        <span class="block-txn">${b.txn} txns</span>
        <span class="block-gas">${b.gas}</span>
        <span class="block-time">${i===0?'now':i+'s ago'}</span>
      </div>
    `).join('');
  }
  const netBlock = document.getElementById('net-block');
  if (netBlock) netBlock.textContent = 'Block #'+blockNum.toLocaleString();
}
addBlock();

// ── IOT SENSORS ──
const SENSORS = [
  {name:'Impact Force', unit:'kN', min:0, max:100, color:'var(--accent-red)', val:45},
  {name:'Temperature', unit:'°C', min:-10, max:80, color:'var(--accent-amber)', val:28},
  {name:'GPS Velocity', unit:'km/h', min:0, max:200, color:'var(--accent-cyan)', val:67},
  {name:'Air Pressure', unit:'hPa', min:900, max:1100, color:'var(--accent-green)', val:960},
];
let sensorVals = SENSORS.map(s=>s.val);

function renderSensors(){
  const sensorsList = document.getElementById('sensors-list');
  if (!sensorsList) return;
  sensorsList.innerHTML = SENSORS.map((s,i) => {
    const v = sensorVals[i];
    const pct = Math.round((v-s.min)/(s.max-s.min)*100);
    return `
      <div class="sensor-item">
        <div class="sensor-top">
          <span class="sensor-name">${s.name}</span>
          <span class="sensor-val" style="color:${s.color}">${v.toFixed(1)} ${s.unit}</span>
        </div>
        <div class="sensor-bar">
          <div class="sensor-fill" style="width:${pct}%;background:${s.color}"></div>
        </div>
      </div>
    `;
  }).join('');
}
renderSensors();

// IoT Map dots
const map = document.getElementById('iot-map');
if (map) {
  for(let i=0;i<12;i++){
    const d = document.createElement('div');
    d.className = 'map-dot';
    const colors = ['var(--accent-cyan)','var(--accent-green)','var(--accent-amber)'];
    const c = randItem(colors);
    d.style.cssText = `left:${randInt(8,92)}%;top:${randInt(10,85)}%;background:${c};color:${c}`;
    d.style.animationDelay = randInt(0,2000)+'ms';
    map.appendChild(d);
  }
}

// ── SPARKLINES ──
function genSparkData(n){let d=[];let v=50;for(let i=0;i<n;i++){v+=randInt(-8,8);v=Math.max(10,Math.min(90,v));d.push(v);}return d;}
for(let k=1;k<=4;k++) sparkData[k]=genSparkData(20);

function renderSparks(){
  for(let k=1;k<=4;k++){
    const el = document.getElementById('spark-'+k);
    if (!el) continue;
    const d = sparkData[k];
    const pts = d.map((v,i)=>`${(i/(d.length-1))*120},${36-v*0.34}`).join(' ');
    el.setAttribute('points',pts);
  }
}
renderSparks();

// ── ANALYTICS CHART ──
const CHART_DATA = {
  '7d': [42,67,31,88,55,73,91],
  '30d': [55,48,72,39,85,61,78,44,91,57,63,80,35,92,68,74,50,87,42,76,58,83,47,71,89,53,66,79,43,95],
  '1y': [320,380,290,440,510,395,480,550,430,490,560,610]
};

function renderChart(){
  const svg = document.getElementById('analytics-chart');
  if (!svg) return;
  const data = CHART_DATA[chartMode];
  const w=320,h=120;
  const maxV = Math.max(...data)*1.1;
  const pts = data.map((v,i)=>{
    const x = (i/(data.length-1))*(w-20)+10;
    const y = h - (v/maxV)*(h-20) - 10;
    return `${x},${y}`;
  });
  const ptsStr = pts.join(' ');
  const first = pts[0].split(',');
  const last = pts[pts.length-1].split(',');
  const fillPath = `M${first[0]},${h-10} L${ptsStr.replace(/(\d+\.?\d*),(\d+\.?\d*)/g,'$1,$2')} L${last[0]},${h-10}Z`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="var(--accent-cyan)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${[0.25,0.5,0.75,1].map(t=>`<line x1="10" y1="${h-(t*(h-20))-10}" x2="${w-10}" y2="${h-(t*(h-20))-10}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`).join('')}
    <path d="${fillPath}" fill="url(#cg)"/>
    <polyline points="${ptsStr}" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${pts.map(p=>`<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="3" fill="var(--accent-cyan)" opacity="0.7"/>`).join('')}
  `;
}
renderChart();

function switchChart(btn, mode){
  chartMode = mode;
  document.querySelectorAll('.analytics-panel .panel-ctrl').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderChart();
}

// ── ACTIVITY FEED ──
const ACTIVITIES = [
  {text:'Smart contract <strong>ClaimProcessor</strong> executed claim CLM-00098', color:'var(--accent-cyan)'},
  {text:'Fraud alert on policy <strong>POL-7731</strong> — flagged by ML model', color:'var(--accent-red)'},
  {text:'IoT device <strong>DEV-4421</strong> registered on Polygon', color:'var(--accent-green)'},
  {text:'Payout of <strong>$24,500</strong> approved and transferred', color:'var(--accent-green)'},
  {text:'New node joined the network — <strong>0x9f4a...b3c1</strong>', color:'var(--accent-cyan)'},
  {text:'Oracle price feed updated — ETH/USD <strong>$3,241</strong>', color:'var(--accent-amber)'},
  {text:'Policy <strong>POL-9812</strong> renewed via smart contract', color:'var(--accent-blue)'},
  {text:'3D impact sensor <strong>DEV-0012</strong> triggered alert', color:'var(--accent-red)'},
];
let activityLog = [];
for(let i=0;i<6;i++) activityLog.push({...ACTIVITIES[i%ACTIVITIES.length], time: (i+1)+'m ago'});

function renderActivity(){
  const feed = document.getElementById('activity-feed');
  if (!feed) return;
  feed.innerHTML = activityLog.slice(-10).reverse().map(a=>`
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color};box-shadow:0 0 6px ${a.color}"></div>
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${a.time}</div>
    </div>
  `).join('');
}
renderActivity();

// ── 3D BLOCKCHAIN CANVAS ──
(function(){
  const canvas = document.getElementById('three-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  let blocks3d = [];
  let t = 0;

  function resize(){
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
  }
  resize();
  window.addEventListener('resize', resize);

  for(let i=0;i<7;i++){
    blocks3d.push({
      x: 80 + i * 155,
      y: H/2,
      w: 120, h: 70, d: 24,
      label: '#'+(blockNum-6+i),
      txns: randInt(20,150),
      color: i===6?'#00d4ff':'#0f4080',
      glow: i===6
    });
  }

  function drawBlock3D(b, offset){
    const x=b.x+Math.sin(t*0.5+offset)*3;
    const y=b.y+Math.cos(t*0.7+offset)*2;
    const w=b.w, h=b.h, d=b.d;

    ctx.beginPath();
    ctx.moveTo(x+w/2,y-h/2);
    ctx.lineTo(x+w/2+d*0.6,y-h/2-d*0.4);
    ctx.lineTo(x+w/2+d*0.6,y+h/2-d*0.4);
    ctx.lineTo(x+w/2,y+h/2);
    ctx.closePath();
    ctx.fillStyle = b.glow?'rgba(0,100,200,0.6)':'rgba(5,20,60,0.8)';
    ctx.fill();
    ctx.strokeStyle = b.color; ctx.lineWidth=1; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x-w/2,y-h/2);
    ctx.lineTo(x+w/2,y-h/2);
    ctx.lineTo(x+w/2+d*0.6,y-h/2-d*0.4);
    ctx.lineTo(x-w/2+d*0.6,y-h/2-d*0.4);
    ctx.closePath();
    ctx.fillStyle = b.glow?'rgba(0,150,255,0.4)':'rgba(8,30,80,0.8)';
    ctx.fill();
    ctx.strokeStyle = b.color; ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x-w/2,y-h/2);
    ctx.lineTo(x+w/2,y-h/2);
    ctx.lineTo(x+w/2,y+h/2);
    ctx.lineTo(x-w/2,y+h/2);
    ctx.closePath();
    const grad = ctx.createLinearGradient(x-w/2,y-h/2,x+w/2,y+h/2);
    if(b.glow){
      grad.addColorStop(0,'rgba(0,100,255,0.9)');
      grad.addColorStop(1,'rgba(0,200,255,0.7)');
    } else {
      grad.addColorStop(0,'rgba(10,22,60,0.95)');
      grad.addColorStop(1,'rgba(6,14,40,0.95)');
    }
    ctx.fillStyle=grad; ctx.fill();
    ctx.strokeStyle=b.color; ctx.lineWidth=1.5; ctx.stroke();

    if(b.glow){
      ctx.shadowColor='#00d4ff'; ctx.shadowBlur=20;
      ctx.strokeStyle='rgba(0,212,255,0.6)'; ctx.lineWidth=2;
      ctx.strokeRect(x-w/2,y-h/2,w,h);
      ctx.shadowBlur=0;
    }

    ctx.fillStyle = b.glow?'#00d4ff':'rgba(100,160,220,0.8)';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(b.label, x, y-10);

    ctx.fillStyle='rgba(100,160,200,0.6)';
    ctx.font='10px JetBrains Mono, monospace';
    ctx.fillText(b.txns+' txns', x, y+8);
  }

  function drawConnector(b1, b2, offset){
    const x1=b1.x+b1.w/2+Math.sin(t*0.5)*3;
    const x2=b2.x-b2.w/2+Math.sin(t*0.5+0.5)*3;
    const y=b1.y+Math.cos(t*0.7)*2;
    const grad = ctx.createLinearGradient(x1,y,x2,y);
    grad.addColorStop(0,'rgba(0,102,255,0.8)');
    grad.addColorStop(1,'rgba(0,212,255,0.8)');
    ctx.strokeStyle=grad; ctx.lineWidth=1.5;
    ctx.setLineDash([4,4]);
    ctx.lineDashOffset = -t*2;
    ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y); ctx.stroke();
    ctx.setLineDash([]);
  }

  function animate(){
    ctx.clearRect(0,0,W,H);

    for(let y=0;y<H;y+=3){
      ctx.fillStyle='rgba(0,0,0,0.08)';
      ctx.fillRect(0,y,W,1);
    }

    for(let i=0;i<blocks3d.length-1;i++){
      drawConnector(blocks3d[i], blocks3d[i+1], i*0.3);
    }

    blocks3d.forEach((b,i) => drawBlock3D(b, i*0.4));

    t += 0.02;
    animFrame = requestAnimationFrame(animate);
  }
  animate();

  setInterval(()=>{
    blocks3d.forEach(b=>b.glow=false);
    blocks3d.push({
      x: blocks3d[blocks3d.length-1].x + 155,
      y: H/2, w:120,h:70,d:24,
      label:'#'+blockNum,
      txns:randInt(20,150),
      color:'#00d4ff', glow:true
    });
    blocks3d.shift();
    blocks3d.forEach((b,i)=>{ b.x = 80+i*155; });
  }, 4000);
})();

// ── LIVE UPDATES ──
function liveUpdate(){
  for(let k=1;k<=4;k++){
    sparkData[k].push(randInt(20,85));
    if(sparkData[k].length>20) sparkData[k].shift();
  }
  renderSparks();

  sensorVals = sensorVals.map((v,i)=>{
    const s=SENSORS[i];
    v += (Math.random()-0.48)*((s.max-s.min)*0.04);
    return Math.max(s.min, Math.min(s.max, v));
  });
  renderSensors();

  const gasEl = document.getElementById('net-gas');
  const tpsEl = document.getElementById('net-tps');
  if (gasEl) gasEl.textContent = randInt(18,45)+' Gwei';
  if (tpsEl) tpsEl.textContent = randInt(700,1200);
}

setInterval(liveUpdate, 2000);
setInterval(addBlock, 4000);

setInterval(()=>{
  const c = genClaim();
  claims.push(c);
  if(claims.length > 50) claims.shift();
  renderClaims();
  const act = ACTIVITIES[Math.floor(Math.random()*ACTIVITIES.length)];
  activityLog.push({...act, time:'now'});
  if(activityLog.length>20) activityLog.shift();
  renderActivity();
}, 7000);

// ── MODAL ──
function openModal(){ document.getElementById('modal').classList.add('open'); }
function closeModal(){ document.getElementById('modal').classList.remove('open'); }

function submitClaim(){
  const desc = document.getElementById('f-desc').value || document.getElementById('f-type').value;
  const amount = parseInt(document.getElementById('f-amount').value)||12500;
  const c = {
    id:'CLM-'+String(claimCounter++).padStart(5,'0'),
    type: desc,
    status:'pending',
    amount,
    policy: document.getElementById('f-policy').value||'POL-0000',
    time:'Just now',
    device: document.getElementById('f-iot').value||'DEV-0000'
  };
  claims.push(c);
  renderClaims();
  activityLog.push({text:`New claim <strong>${c.id}</strong> submitted — ${c.type}`, color:'var(--accent-amber)', time:'now'});
  renderActivity();
  closeModal();
  showToast('✅ Claim submitted to blockchain!', 'success');
  setTimeout(()=>showToast('⛓️ Smart contract executing...','info'),1200);
}

// ── TOAST ──
function showToast(msg, type='info'){
  const div = document.createElement('div');
  div.className = `toast ${type}`;
  div.innerHTML = msg;
  const toasts = document.getElementById('toasts');
  if (!toasts) return;
  toasts.appendChild(div);
  setTimeout(()=>div.remove(), 3500);
}

// ── NAV ──
function navClick(el){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  el.classList.add('active');
  showToast('Loading '+el.textContent.trim().replace(/\d+/g,'' )+'...','info');
}

const modalOverlay = document.getElementById('modal');
if (modalOverlay) {
  modalOverlay.addEventListener('click',function(e){if(e.target===this)closeModal();});
}
