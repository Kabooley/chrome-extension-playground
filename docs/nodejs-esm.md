# Enabling ECMAScript with Node.js

ここでは結局webpackでバンドリングするだけなのでNode.jsのESMを有効化する必要はさっぱりないのだけど、本プロジェクトでこの変更が必要になりそうなので経験しておく

## 公式

https://nodejs.org/api/esm.html#enabling

## 遭遇したエラー

ESMを有効にしたことに依る遭遇したエラーと解決または回避策

#### [webpack-cli] ReferenceError: __dirname is not defined in ES module scope

`path`の`dirname`はECMAScriptに対応していないみたい

`__dirname`は代わりに`import.meta.dirname`を使えとのこと

https://nodejs.org/api/esm.html#no-__filename-or-__dirname

https://nodejs.org/api/esm.html#importmetadirname