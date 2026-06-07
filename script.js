const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const state = {
    blocks: [],
    claims: [],
    sensors: [],
    activity: [],
    chartRange: '7d'
};

const chartOptions = {
    '7d': [42, 55, 48, 68, 73, 61, 82],
    '30d': [34, 41, 50, 59, 72, 68, 80, 85, 78, 88, 95, 90],
    '1y': [20, 34, 38, 56, 72, 83, 91, 80, 86, 92, 101, 108]
};

const statuses = ['approved', 'pending', 'review', 'rejected'];

const statusLabels = {
    approved: 'Approved',
    pending: 'Pending',
    review: 'Review',
    rejected: 'Rejected'
};

const statusColors = {
    approved: 'approved',
    pending: 'pending',
    review: 'review',
    rejected: 'rejected'
};

const chartLabels = {
    '7d': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    '30d': ['01', '05', '09', '13', '17', '21', '25', '29', '33', '37', '41', '45'],
    '1y': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

const colors = {
    cyan: 'rgba(0,212,255,0.95)',
    green: 'rgba(0,255,136,0.95)',
    amber: 'rgba(255,170,0,0.95)',
    red: 'rgba(255,51,85,0.95)'
};

function makeBlocks() {
    const now = Date.now();
    for (let i = 1; i <= 8; i += 1) {
        state.blocks.push({
            id: `B-${3200 + i}`,
            hash: `0x${Array.from({ length: 8 }).map(() => random(0, 15).toString(16).toUpperCase()).join('')}`,
            tx: random(4, 18),
            gas: `${random(15, 32)} Gwei`,
            age: `${random(1, 11)}s`
        });
    }
}

function makeClaims() {
    const names = ['Aanya Patel', 'Rohit Singh', 'Samara Lee', 'Daniel Kim', 'Priya Shah', 'Marco Rossi'];
    const reasons = ['Vehicle collision', 'Fire damage', 'Water leak', 'Theft claim', 'Medical emergency', 'Natural disaster'];
    const amountChoices = [5200, 9200, 3175, 14400, 8200, 10500];

    for (let i = 0; i < names.length; i += 1) {
        const status = statuses[random(0, statuses.length - 1)];
        state.claims.push({
            id: `CC-0${13 + i}`,
            name: names[i],
            status,
            amount: `$${amountChoices[i].toLocaleString()}`,
            detail: reasons[i],
            hash: `0x${Array.from({ length: 8 }).map(() => random(0, 15).toString(16).toUpperCase()).join('')}`
        });
    }
}

function makeSensors() {
    const devices = ['Impact Sensor', 'Speed Sensor', 'GPS Tracker', 'Health Module', 'Camera Node'];
    devices.forEach((label) => {
        state.sensors.push({
            label,
            value: `${random(45, 98)}%`,
            progress: random(46, 98)
        });
    });
}

function makeActivity() {
    const events = [
        'Smart contract verified claim payout',
        'IoT gateway received anomaly alert',
        'Policy data synced to IPFS',
        'Fraud system flagged suspicious claim',
        'Oracle update completed',
        'Blockchain node consensus reached'
    ];

    events.forEach((text, index) => {
        state.activity.push({
            color: ['#00d4ff', '#00ff88', '#ffaa00', '#ff3355'][index % 4],
            text,
            time: `${random(1, 58)}m ago`
        });
    });
}

function populateBlocks() {
    const container = document.getElementById('blocks-feed');
    if (!container) return;
    container.innerHTML = '';
    state.blocks.forEach((block) => {
        const row = document.createElement('div');
        row.className = 'block-row';
        row.innerHTML = `
      <span class="block-num">${block.id}</span>
      <span class="block-hash">${block.hash}</span>
      <span class="block-txn">${block.tx} tx</span>
      <span class="block-gas">${block.gas}</span>
      <span class="block-time">${block.age}</span>
    `;
        container.appendChild(row);
    });
}

async function loadClaimsFromApi() {
    try {
        const response = await fetch('/api/claims');
        if (!response.ok) throw new Error('API error');
        const claims = await response.json();
        if (Array.isArray(claims) && claims.length > 0) {
            state.claims = claims.map((claim) => ({
                id: claim._id || claim.id || `CC-${random(300, 999)}`,
                name: claim.claimant || 'Unknown',
                status: (claim.status || 'pending').toString().toLowerCase(),
                amount: claim.amount ? `$${Number(claim.amount).toLocaleString()}` : '$0',
                detail: claim.description || claim.claimType || 'Claim submitted',
                hash: claim.blockchainHash || `0x${Array.from({ length: 8 }).map(() => random(0, 15).toString(16).toUpperCase()).join('')}`
            }));
            populateClaims();
        }
    } catch (error) {
        console.warn('Could not load claims from API:', error.message);
        showToast('Backend claims unavailable, using local demo data.', 'info');
    }
}

function populateClaims() {
    const container = document.getElementById('claims-list');
    const counter = document.getElementById('claim-count');
    if (!container) return;
    container.innerHTML = '';
    state.claims.forEach((claim) => {
        const statusKey = (claim.status || 'pending').toString().toLowerCase();
        const item = document.createElement('div');
        item.className = 'claim-item';
        item.innerHTML = `
      <div class="claim-top">
        <span class="claim-id">${claim.id}</span>
        <span class="status-pill ${statusColors[statusKey] || 'pending'}">${statusLabels[statusKey] || 'Pending'}</span>
      </div>
      <div class="claim-desc">${claim.detail || 'Claim details unavailable'}</div>
      <div class="claim-meta">
        <span>${claim.amount || '$0'}</span>
        <span>${claim.hash || '0x00000000'}</span>
      </div>
    `;
        container.appendChild(item);
    });
    if (counter) counter.textContent = `${state.claims.length} active`;
}

function populateSensors() {
    const container = document.getElementById('sensors-list');
    if (!container) return;
    container.innerHTML = '';
    state.sensors.forEach((sensor) => {
        const item = document.createElement('div');
        item.className = 'sensor-item';
        item.innerHTML = `
      <div class="sensor-top">
        <span class="sensor-name">${sensor.label}</span>
        <span class="sensor-val">${sensor.value}</span>
      </div>
      <div class="sensor-bar"><div class="sensor-fill" style="width:${sensor.progress}%"></div></div>
    `;
        container.appendChild(item);
    });
}

function populateActivity() {
    const container = document.getElementById('activity-feed');
    if (!container) return;
    container.innerHTML = '';
    state.activity.forEach((event) => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
      <span class="activity-dot" style="background:${event.color}"></span>
      <div class="activity-text"><strong>${event.text}</strong></div>
      <span class="activity-time">${event.time}</span>
    `;
        container.appendChild(item);
    });
}

function drawChart(range) {
    const svg = document.getElementById('analytics-chart');
    if (!svg) return;
    const values = chartOptions[range] || chartOptions['7d'];
    const labels = chartLabels[range] || chartLabels['7d'];
    const width = 320;
    const height = 140;
    const padding = 20;
    const maxValue = Math.max(...values) + 10;
    const step = (width - padding * 2) / (values.length - 1);

    const points = values.map((value, index) => {
        const x = padding + step * index;
        const y = height - padding - ((value / maxValue) * (height - padding * 2));
        return `${x},${y}`;
    }).join(' ');

    const line = `
    <polyline points="${points}" fill="none" stroke="${colors.cyan}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"></polyline>
    <path d="M${padding},${height - padding} ${points.split(' ')[0]} L${points.split(' ').slice(-1)[0]} ${height - padding} Z" fill="rgba(0,212,255,0.12)"></path>
  `;

    const circles = values.map((value, index) => {
        const x = padding + step * index;
        const y = height - padding - ((value / maxValue) * (height - padding * 2));
        return `<circle cx="${x}" cy="${y}" r="4" fill="${colors.green}" />`;
    }).join('');

    svg.innerHTML = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="transparent" />
    ${line}
    ${circles}
    ${labels.map((label, index) => `
      <text x="${padding + step * index}" y="${height - 4}" fill="${index === labels.length - 1 ? '#fff' : '#7a9cc4'}" font-size="10" text-anchor="middle">${label}</text>
    `).join('')}
  `;
}

function updateNetworkStatus() {
    const block = document.getElementById('net-block');
    const iot = document.getElementById('net-iot');
    const gas = document.getElementById('net-gas');
    const tps = document.getElementById('net-tps');
    if (block) block.textContent = `Block #${random(7_400_000, 7_450_000).toLocaleString()}`;
    if (iot) iot.textContent = `${random(230, 255)} Devices`;
    if (gas) gas.textContent = `${random(18, 42)} Gwei`;
    if (tps) tps.textContent = `${random(720, 980)}`;
}

function openModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.add('open');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('open');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toasts');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span><button class="toast-close">✕</button>`;
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => toast.remove());
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3800);
}

function navClick(element) {
    document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
    element.classList.add('active');
    showToast(`Switched to ${element.textContent.trim()}`, 'success');
}

function switchChart(button, range) {
    document.querySelectorAll('.panel-ctrl').forEach((ctrl) => ctrl.classList.remove('active'));
    button.classList.add('active');
    state.chartRange = range;
    drawChart(range);
}

async function submitClaim() {
    const policy = document.getElementById('f-policy').value.trim();
    const type = document.getElementById('f-type').value;
    const desc = document.getElementById('f-desc').value.trim();
    const amount = document.getElementById('f-amount').value.trim();
    const iot = document.getElementById('f-iot').value.trim();
    const priority = document.getElementById('f-priority').value;

    if (!policy || !desc || !amount || !iot) {
        showToast('Please fill in all required claim fields.', 'error');
        return;
    }

    const newClaim = {
        claimant: 'ChainClaim User',
        amount: Number(amount),
        status: 'pending',
        blockchainHash: `0x${Array.from({ length: 8 }).map(() => random(0, 15).toString(16).toUpperCase()).join('')}`,
        policyId: policy,
        claimType: type,
        description: desc,
        iotDevice: iot,
        priority
    };

    try {
        const response = await fetch('/api/claims', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClaim)
        });

        if (!response.ok) throw new Error('Submit failed');
        const saved = await response.json();

        state.claims.unshift({
            id: saved._id || `CC-${random(400, 999)}`,
            name: saved.claimant || 'New Claim',
            status: (saved.status || 'pending').toString().toLowerCase(),
            // FIXED: proper money format
            amount: `$${Number(saved.amount).toLocaleString()}`,
            detail: saved.description || saved.claimType || `${type} - ${desc}`,
            hash: saved.blockchainHash || newClaim.blockchainHash
        });

        populateClaims();
        closeModal();
        showToast('Claim submitted to blockchain!', 'success');
    } catch (error) {
        console.warn('Claim API post failed:', error.message);
        state.claims.unshift({
            id: `CC-${random(301, 399)}`,
            name: 'New Claim',
            status: 'pending',
            amount: `$${Number(amount).toLocaleString()}`,
            detail: `${type} - ${desc}`,
            hash: newClaim.blockchainHash
        });
        populateClaims();
        closeModal();
        showToast('Claim saved locally; backend unavailable.', 'error');
    }
}

function animateCanvas() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const points = [];
    const count = 12;
    const range = rect.width - 40;
    for (let i = 0; i < count; i += 1) {
        points.push({ x: 20 + (range / (count - 1)) * i, y: 80 + Math.sin(i * 0.77) * 28 });
    }

    let tick = 0;
    function draw() {
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.03)';
        ctx.fillRect(0, 0, rect.width / dpr, rect.height / dpr);

        ctx.strokeStyle = 'rgba(0,212,255,0.85)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        points.forEach((point, index) => {
            point.y = 80 + Math.sin((index * 0.8) + tick * 0.018) * 30;
            if (index === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        points.forEach((point) => {
            ctx.fillStyle = 'rgba(0,255,136,0.8)';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
            ctx.fill();
        });

        tick += 1;
        requestAnimationFrame(draw);
    }

    draw();
}

function updateLiveValues() {
    const total = document.getElementById('kpi-total');
    const approved = document.getElementById('kpi-approved');
    const pending = document.getElementById('kpi-pending');
    const fraud = document.getElementById('kpi-fraud');

    if (total) total.textContent = random(4200, 5200).toLocaleString();
    // FIXED: proper $M format
    if (approved) approved.textContent = `$${(random(16_000_000, 20_000_000) / 1_000_000).toFixed(1)}M`;
    if (pending) pending.textContent = random(210, 280).toString();
    if (fraud) fraud.textContent = `$${(random(2_700_000, 3_500_000) / 1_000_000).toFixed(1)}M`;
}

function bindEvents() {
    const connectBtn = document.querySelector('.connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            connectBtn.textContent = 'Connecting...';
            setTimeout(() => {
                connectBtn.textContent = 'Wallet Connected';
                connectBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            }, 1200);
        });
    }
}

async function start() {
    makeBlocks();
    makeClaims();
    makeSensors();
    makeActivity();
    await loadClaimsFromApi();
    populateBlocks();
    populateClaims();
    populateSensors();
    populateActivity();
    drawChart(state.chartRange);
    updateNetworkStatus();
    animateCanvas();
    bindEvents();

    setInterval(() => {
        updateNetworkStatus();
        updateLiveValues();
    }, 4500);
}

document.addEventListener('DOMContentLoaded', start);

window.openModal = openModal;
window.closeModal = closeModal;
window.submitClaim = submitClaim;
window.navClick = navClick;
window.switchChart = switchChart;
window.showToast = showToast;