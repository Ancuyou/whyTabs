const form = document.getElementById('intent-form');
const input = document.getElementById('intent-input');
const skipBtn = document.getElementById('skip-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const intent = input.value.trim() || 'quick-browse';
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.runtime.sendMessage({ type: 'CAPTURE_INTENT', tabId: tab.id, intent });
    window.location.href = tab.pendingUrl || 'https://www.google.com/webhp?igu=1';
});

skipBtn.addEventListener('click', () => window.location.href = 'https://www.google.com/webhp?igu=1');
input.addEventListener('keydown', e => { if (e.key === 'Escape') window.location.href = 'https://www.google.com/webhp?igu=1'; });