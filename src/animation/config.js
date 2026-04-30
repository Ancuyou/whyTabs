export function getTierConfig(ms) {
    const mins = ms / 60000;
    if (mins < 2) return { name: 'L1', duration: 600, particles: 50, speed: 1.2, color: [1.0, 0.9, 0.7] };
    if (mins < 15) return { name: 'L2', duration: 850, particles: 100, speed: 1.0, color: [1.0, 0.7, 0.3] };
    if (mins < 45) return { name: 'L3', duration: 1100, particles: 160, speed: 0.8, color: [0.8, 0.5, 0.2] };
    return { name: 'L4', duration: 1300, particles: 250, speed: 0.6, color: [0.9, 0.8, 0.1] };
}