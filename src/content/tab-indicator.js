const POLL_INTERVAL_MS = 5000;
let indicator;
let pollTimer;

function ensureIndicator() {
    if (indicator) return indicator;
    indicator = document.createElement('div');
    indicator.className = 'tk-tab-indicator';
    document.documentElement.appendChild(indicator);
    return indicator;
}

function updateIndicator(elapsedMs) {
    const bar = ensureIndicator();
    if (!elapsedMs) {
        bar.classList.remove('tk-active', 'tk-warn', 'tk-danger', 'tk-marathon');
        bar.style.width = '0%';
        return;
    }

    const minutes = elapsedMs / 60000;
    let width = '30%';
    bar.classList.remove('tk-active', 'tk-warn', 'tk-danger', 'tk-marathon');

    if (minutes < 2) {
        bar.classList.add('tk-active');
        width = '30%';
    } else if (minutes < 15) {
        bar.classList.add('tk-warn');
        width = '60%';
    } else if (minutes < 45) {
        bar.classList.add('tk-danger');
        width = '85%';
    } else {
        bar.classList.add('tk-marathon');
        width = '100%';
    }

    bar.style.width = width;
}

async function pollElapsed() {
    try {
        const { elapsed } = await chrome.runtime.sendMessage({ type: 'GET_ELAPSED' }) || {};
        updateIndicator(elapsed);
    } catch {
        updateIndicator(null);
    }
}

function startPolling() {
    pollElapsed();
    pollTimer = setInterval(pollElapsed, POLL_INTERVAL_MS);
}

startPolling();

