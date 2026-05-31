const STORAGE_KEY = 'tk_intent_shown';
const DEFAULT_INTENT = 'quick-browse';

function shouldShowBubble() {
    if (!document.body) return false;
    if (!location || !location.href) return false;
    if (!location.protocol.startsWith('http')) return false;
    return sessionStorage.getItem(STORAGE_KEY) !== '1';
}

function markShown() {
    sessionStorage.setItem(STORAGE_KEY, '1');
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'tk-intent-bubble';
    bubble.innerHTML = `
        <div class="tk-bubble-content">
            <div class="tk-bubble-icon">🎯</div>
            <div class="tk-bubble-body">
                <div class="tk-bubble-title">Why this tab?</div>
                <input class="tk-bubble-input" type="text" placeholder="research, break, buy, learn..." autofocus>
            </div>
            <div class="tk-bubble-actions">
                <button class="tk-btn tk-btn-primary">Start</button>
                <button class="tk-btn tk-btn-ghost">Skip</button>
            </div>
        </div>
    `;
    return bubble;
}

function attachEvents(bubble) {
    const input = bubble.querySelector('.tk-bubble-input');
    const startBtn = bubble.querySelector('.tk-btn-primary');
    const skipBtn = bubble.querySelector('.tk-btn-ghost');

    const closeBubble = () => {
        bubble.classList.add('tk-bubble-hide');
        setTimeout(() => bubble.remove(), 200);
    };

    const startTracking = async () => {
        const intent = input.value.trim() || DEFAULT_INTENT;
        await chrome.runtime.sendMessage({ type: 'CAPTURE_INTENT', intent });
        markShown();
        closeBubble();
    };

    startBtn.addEventListener('click', startTracking);
    skipBtn.addEventListener('click', () => {
        markShown();
        closeBubble();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startTracking();
        if (e.key === 'Escape') {
            markShown();
            closeBubble();
        }
    });
}

function initIntentBubble() {
    if (!shouldShowBubble()) return;
    const bubble = createBubble();
    document.body.appendChild(bubble);
    attachEvents(bubble);
    requestAnimationFrame(() => bubble.classList.add('tk-bubble-show'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntentBubble, { once: true });
} else {
    initIntentBubble();
}

