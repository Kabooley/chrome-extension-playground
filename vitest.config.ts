// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'v8',
        },
        dir: './__tests__',
        // alias: [
        //   {
        //     find: /^monaco-editor$/,
        //     replacement:
        //       __dirname + '/node_modules/monaco-editor/esm/vs/editor/editor.api',
        //   },
        // ],
    },
    plugins: [react()],
});
