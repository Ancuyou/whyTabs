const DEFAULT_SETTINGS = {
    bubbleEnabled: true,
    indicatorEnabled: true,
    allowlist: [],
    blocklist: []
};

const bubbleToggle = document.getElementById('setting-bubble');
const indicatorToggle = document.getElementById('setting-indicator');
const allowlistInput = document.getElementById('setting-allowlist');
const blocklistInput = document.getElementById('setting-blocklist');
const exportBtn = document.getElementById('export-btn');
const filterDate = document.getElementById('filter-date');
const filterSearch = document.getElementById('filter-search');
const filterRefresh = document.getElementById('filter-refresh');
const historyList = document.getElementById('history-list');

async function loadSettings() {
    const { settings } = await chrome.storage.local.get('settings');
    const merged = { ...DEFAULT_SETTINGS, ...(settings || {}) };
    bubbleToggle.checked = !!merged.bubbleEnabled;
    indicatorToggle.checked = !!merged.indicatorEnabled;
    allowlistInput.value = (merged.allowlist || []).join('\n');
    blocklistInput.value = (merged.blocklist || []).join('\n');
}

async function saveSettings() {
    const allowlist = allowlistInput.value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    const blocklist = blocklistInput.value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    const settings = {
        bubbleEnabled: bubbleToggle.checked,
        indicatorEnabled: indicatorToggle.checked,
        allowlist,
        blocklist
    };
    await chrome.storage.local.set({ settings });
}

[bubbleToggle, indicatorToggle, allowlistInput, blocklistInput].forEach(el => {
    el.addEventListener('change', saveSettings);
    el.addEventListener('input', () => {
        if (el.tagName === 'TEXTAREA') saveSettings();
    });
});

function renderHistory(tasks) {
    historyList.innerHTML = '';
    if (!tasks || tasks.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'history-meta';
        empty.textContent = 'No history yet.';
        historyList.appendChild(empty);
        return;
    }
    tasks.forEach(task => {
        const row = document.createElement('div');
        row.className = 'history-item';

        const intent = document.createElement('div');
        intent.className = 'history-intent';
        intent.textContent = task.intent || 'untitled';

        const meta = document.createElement('div');
        meta.className = 'history-meta';
        const date = new Date(task.endedAt || task.createdAt || Date.now());
        meta.textContent = `${date.toLocaleDateString()} • ${(task.duration || 0) / 60000}m • ${task.status || 'ended'}`;

        row.append(intent, meta);
        historyList.appendChild(row);
    });
}

async function refreshHistory() {
    const filters = {
        date: filterDate.value || null,
        search: filterSearch.value || '',
        limit: 300
    };
    const response = await chrome.runtime.sendMessage({ type: 'GET_HISTORY', filters });
    renderHistory(response?.tasks || []);
}

async function exportTasks() {
    const response = await chrome.runtime.sendMessage({ type: 'EXPORT_TASKS' });
    const blob = new Blob([JSON.stringify(response?.tasks || [], null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todo-kill-export-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

filterRefresh.addEventListener('click', refreshHistory);
filterSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') refreshHistory();
});
filterDate.addEventListener('change', refreshHistory);
exportBtn.addEventListener('click', exportTasks);

loadSettings();
refreshHistory();

