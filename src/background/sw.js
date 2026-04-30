import { startTimer, updateTimer, stopTimer, getAllActive } from '../core/timer.js';
import { db } from '../core/storage.js';

let activeTasks = [];

// Sync active tasks to storage every 10s
setInterval(() => {
    if (activeTasks.length > 0) {
        chrome.storage.local.set({ activeTasks });
    }
}, 10000);

// Restore on worker wake
chrome.storage.local.get('activeTasks', ({ activeTasks: stored }) => {
    if (stored) {
        activeTasks = stored;
        activeTasks.forEach(t => updateTimer(t.tabId));
    }
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
    const task = stopTimer(tabId);
    if (task?.intent) {
        await db.saveTask({ ...task, status: 'auto-killed' });
        const stats = await db.incrementStats(task.activeTime);
        chrome.runtime.sendMessage({ type: 'STATS_UPDATE', stats }).catch(() => {});
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'CAPTURE_INTENT') {
        const task = startTimer(msg.tabId, msg.intent);
        activeTasks.push(task);
        sendResponse({ id: task.id });
    }
    else if (msg.type === 'GET_ACTIVE') {
        sendResponse(getAllActive());
    }
    else if (msg.type === 'KILL_TASK') {
        const task = stopTimer(msg.tabId);
        if (task) {
            db.saveTask({ ...task, status: 'manual-killed' });
            db.incrementStats(task.activeTime).then(stats => {
                chrome.runtime.sendMessage({ type: 'KILL_COMPLETE', stats }).catch(() => {});
            });
        }
        sendResponse({ success: true });
    }
    return true; // Keep port open for async
});