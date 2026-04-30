import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json' with { type: 'json' }; // ← Quan trọng: Vite 5.2+ cần import assertion

export default defineConfig({
    plugins: [crx({ manifest })],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        target: 'esnext', // ← Quan trọng: Đảm bảo output tương thích MV3 service worker
        rollupOptions: {
            input: {
                background: 'src/background/sw.js',
                newtab: 'src/newtab/index.html',
                popup: 'src/popup/index.html'
            }
        }
    },
    server: {
        port: 5173,
        strictPort: true, // ← Giúp Chrome extension reload ổn định khi dev
        hmr: { port: 5173 }
    }
});