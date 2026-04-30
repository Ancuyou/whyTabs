export const db = {
    async getTasks(){
        const { tasks = [] } = await chrome.storage.local.get('tasks');
        return tasks;
    },
    async saveTask(task){
        const tasks = await this.getTasks();
        tasks.push(task);
        await chrome.storage.local.set({ tasks });
        return tasks;
    },
    async removeTask(task){
        let tasks = await this.getTasks();
        tasks = tasks.filter(t => t.id !== task.id);
        await chrome.storage.local.set({tasks});
        return tasks;
    },
    async getStats(){
        return (await chrome.storage.local.get('stats')).stats || { killed: 0, minutes: 0};
    },
    async incrementStats(minutes) {
        const stats = await this.getStats();
        stats.killed++;
        stats.minutes += Math.round(minutes/60000);
        await chrome.storage.local.set({stats});
        return stats;
    }
};