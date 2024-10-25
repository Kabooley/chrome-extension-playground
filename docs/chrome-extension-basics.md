# Chrome Extesnsion

## TypeScript + ESM + React + Webpack で開発するときの最小構成

最終的にバンドル後の生成物がそのまま拡張機能のパッケージとなるようにする

`/dist/`:

```bash
    background.js
    background.js.map
    contentScript.js
    contentScript.js.map
    hello_extensions.png
    manifest.json
    options.html
    popup.html
    popup.js
    popup.js.map
```

ディレクトリ構成:

```bash
C:.
+---dist
+---node_modules
+---src
|   +---background.ts
|   +---contentScriipt.ts
|   +---popup.tsx
|   \---static
|       +---manifest.json
|       \---hello_extensions.png
|
+---tsconfig.json
+---webpack.config.js
+---package-lock.json
\---package.json
```

`package.json`:

```JSON
{
    "name": "chrome-extension-playground",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "webpack --watch --progress --config webpack.config.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "@types/chrome": "^0.0.279",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "typescript": "^5.6.3"
    },
    "devDependencies": {
        "clean-webpack-plugin": "^4.0.0",
        "copy-webpack-plugin": "^12.0.2",
        "css-loader": "^7.1.2",
        "html-webpack-plugin": "^5.6.3",
        "style-loader": "^4.0.0",
        "ts-loader": "^9.5.1",
        "webpack": "^5.95.0",
        "webpack-cli": "^5.1.4"
    },
    "type": "module"
}
```

`tsconfig.json`:

```JSON
{
    "compilerOptions": {
        "jsx": "react-jsx",
        "module": "es6",
        "target": "es6",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "experimentalDecorators": true,
        "esModuleInterop": true,
        "lib": ["dom", "es6"]
    },
    "include": ["./src/**/*.ts", "./src/**/*.tsx"],
    "exclude": ["node_modules"],
    "compileOnSave": false
}
```

`webpack.config.js`:

```JavaScript
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HtmlPlugin({
                title: 'React Extension',
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}

export default {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        background: path.resolve('src/background.ts'),
        contentScript: path.resolve('src/contentScript.ts'),
        popup: path.resolve('src/popup.tsx'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                type: 'asset/resource',
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist'),
                },
            ],
        }),
        ...getHtmlPlugins(['popup', 'options']),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(import.meta.dirname, 'dist'),
    },
};
```

`src/static/manifest.json`:

```JSON
{
    "manifest_version": 3,
    "name": "chrome-extension-playground",
    "version": "0.0.0.1",
    "action": {
        "default_title": "chrome-extension-playground",
        "default_popup": "popup.html",
        "default_icon": "hello_extensions.png"
    },
    "description": "chrome-extension playground",
    "background": {
        "service_worker": "background.js",
        "type": "module"
    },
    "permissions": ["search", "tabs", "storage", "activeTab", "scripting"],
    "content_security_policy": {},
    "content_scripts": []
}

```

`popup.tsx`:

```TypeScript
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return <div className="popup">popup</div>;
};

const root = document.createElement('div');
document.body.appendChild(root);
createRoot(root).render(<App />);

```

`background.ts`:

```TypeScript
chrome.runtime.onInstalled.addListener(() => {
    console.log('[chrome.runtime.onInstalled]');
});

chrome.runtime.onMessage.addListener((
    message, sender, sendResponse
) => {
    console.log('[chrome.runtime.onMessage]' + message);
});
```
