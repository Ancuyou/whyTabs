import { getTierConfig } from '../animation/config.js';
import { initWebGL } from '../animation/engine.js';

let tasks = [];
const listEl = document.getElementById('task-list');
const canvas = document.getElementById('kill-canvas');

async function loadStats() {
    const stats = await chrome.runtime.sendMessage({ type: 'GET_STATS' }) || { killed:0, minutes:0 };
    document.getElementById('killed-count').textContent = `${stats.killed} killed`;
    document.getElementById('focus-minutes').textContent = `${stats.minutes} min`;
}

async function refresh() {
    tasks = await chrome.runtime.sendMessage({ type: 'GET_ACTIVE' }) || [];
    listEl.innerHTML = '';
    tasks.forEach(t => {
        const el = document.createElement('div');
        el.className = 'task-item';
        el.innerHTML = `<span class="intent">${t.intent}</span><span class="time">${(t.elapsed/60000).toFixed(1)}m</span><button class="kill-btn" data-id="${t.id}">KILL</button>`;
        listEl.appendChild(el);
    });
}

listEl.addEventListener('click', async (e) => {
    const btn = e.target.closest('.kill-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    btn.style.pointerEvents = 'none';
    btn.textContent = '...';

    const tier = getTierConfig(task.elapsed);
    initWebGL(canvas, tier, () => {
        chrome.runtime.sendMessage({ type: 'KILL_TASK', tabId: task.tabId });
        setTimeout(refresh, 300);
    });
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'STATS_UPDATE' || msg.type === 'KILL_COMPLETE') loadStats();
});

refresh();
loadStats();