# setup test

Vitest で本環境のテスト環境を整える

## テスト構成

ディレクトリ構成：

```bash
C:.
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.json
|   vitest.config.ts
|   vitest.setup.ts
|   webpack.config.js
|
+---dist
|
+---docs
|       chrome-extension-basics.md
|       nodejs-esm.md
|       setup-test.md
|
+---node_modules
|
+---src
|   |   background.ts
|   |   contentScript.ts
|   |   Observable.ts
|   |   popup.tsx
|   |   Storage_.ts
|   |
|   \---static
|           hello_extensions.png
|           manifest.json
|
\---__tests__
        dummy.test.ts
        dummy.test.tsx
```

`package.json`:

```JSON
{
    //...
    "scripts": {
        "test": "vitest run -c ./vitest.config.ts"
    },
    "devDependencies": {
        // ...
        "@testing-library/jest-dom": "^6.6.3",
        "@testing-library/react": "^16.0.1",
        "@testing-library/user-event": "^14.5.2",
        "@vitejs/plugin-react": "^4.3.3",
        "@vitest/coverage-v8": "^2.1.4",
        "@vitest/ui": "^2.1.4",
        "vitest": "^2.1.4",
    },
    "type": "module"
}
```

`vitest.config.ts`:

```TypeScript
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
```

`vitest.setup.ts`:

```TypeScript
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
    cleanup();
});
```
