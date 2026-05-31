import { getTierConfig } from '../animation/config.js';
import { initWebGL } from '../animation/engine.js';

let tasks = [];
const listEl = document.getElementById('task-list');
const canvas = document.getElementById('kill-canvas');

async function loadStats() {
    const stats = await chrome.runtime.sendMessage({ type: 'GET_STATS' }) || { killed: 0, minutes: 0 };
    document.getElementById('killed-count').textContent = stats.killed ?? 0;
    document.getElementById('focus-minutes').textContent = stats.minutes ?? 0;
}

function renderTasks() {
    listEl.innerHTML = '';
    if (tasks.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'tips-card';
        empty.textContent = 'No active tasks yet. Open a new tab and set your intent.';
        listEl.appendChild(empty);
        return;
    }

    tasks.forEach(t => {
        const el = document.createElement('div');
        el.className = 'task-item';

        const intent = document.createElement('span');
        intent.className = 'intent';
        intent.textContent = t.intent || 'untitled';

        const time = document.createElement('span');
        time.className = 'time';
        time.textContent = formatDuration(t.elapsed || 0);

        const btn = document.createElement('button');
        btn.className = 'kill-btn';
        btn.dataset.id = t.id;
        btn.textContent = 'KILL';

        el.append(intent, time, btn);
        listEl.appendChild(el);
    });
}

async function refresh() {
    tasks = await chrome.runtime.sendMessage({ type: 'GET_ACTIVE' }) || [];
    renderTasks();
}

function startTicker() {
    setInterval(async () => {
        tasks = await chrome.runtime.sendMessage({ type: 'GET_ACTIVE' }) || [];
        tasks.forEach(t => {
            const row = listEl.querySelector(`[data-id="${t.id}"]`)?.closest('.task-item');
            if (!row) return;
            const timeEl = row.querySelector('.time');
            if (timeEl) timeEl.textContent = formatDuration(t.elapsed || 0);
        });
    }, 1000);
}

function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0) return `${seconds}s`;
    return `${minutes}m ${seconds}s`;
}

listEl.addEventListener('click', async (e) => {
    const btn = e.target.closest('.kill-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    btn.style.pointerEvents = 'none';
    btn.textContent = '...';

    const tier = getTierConfig(task.elapsed || 0);
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
startTicker();

