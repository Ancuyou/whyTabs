const activeTimers =  new Map();
export function startTimer(tabId, intent){
    const task = {
        id: crypto.randomUUID(),
        tabId,
        intent,
        createdAt: Date.now(),
        activeTime: 0,
        lastActive: Date.now()
    };
    activeTimers.set(tabId, task);
    return task;
}
export function updateTimer(tabId) {
    const task = activeTimers.get(tabId);
    if (!task) return;
    const now = Date.now();
    task.activeTime += now - task.lastActive;
    task.lastActive = now;
    if (Math.random() < 0.2) chrome.storage.local.set({activeTimers: Array.from(activeTimers.values())});
}
export function stopTimer(tabId) {
    updateTimer(tabId);
    const task = activeTimers.get(tabId);
    activeTimers.delete(tabId);
    return task || null;
}
export function getAllActive() {
    return Array.from(activeTimers.values()).map(t => ({
        ...t,
        elapsed: (Date.now() - t.lastActive) + t.activeTime
    }));
}