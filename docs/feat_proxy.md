# Proxy

## 目標

目標： background.tsのstateが更新されたらサブスクライバへmessage-passing経由で更新を知らせるようにする。

理由： popup.tsxはudemyの講義ページの状態を表示するようになったため

## Proxy

## Popupでメッセージをリアルタイムに受け取るにはReactの機能では無理なのでは？

つまりaddEventListener()が常に必要で、それを常に更新のたびにアタッチしなおす処理が必要である

## 走り書き

#### `chrome.storage.onChange`でstorageに変更が加えられたら通知を出す仕組みを作る

目標：popupへ常に最新のstateをbackgroundから送信する

ひとまずコード：

```TypeScript
import type { iMessage } from './background';

class Storage_ {
    constructor() {
        this.set = this.set.bind(this);
        this.get = this.get.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // chrome.storage.onChange.addListener()へ渡すコールバック関数
    handleChange(
        changes: { [key: string]: chrome.storage.StorageChange },
        namespace: 'sync' | 'local' | 'managed' | 'session'
    ) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            console.log(
                `Storage key "${key}" in namespace "${namespace}" changed.`,
                `Old value was "${oldValue}", new value is "${newValue}".`
            );
            if (key === 'popup') {
                chrome.runtime.sendMessage<iMessage>({
                    from: 'background',
                    to: 'popup',
                    data: newValue,
                });
            }
            if (key === 'contentScripit') {
                chrome.runtime.sendMessage<iMessage>({
                    from: 'background',
                    to: 'contentScript',
                    data: newValue,
                });
            }
        }
    }

    async set(keyValuePair: Record<string, string>) {
        await chrome.storage.local.set(keyValuePair);
    }

    async get(key: string) {
        const data = await chrome.storage.local.get(key);
        return key;
    }
}

export default Storage_;

```

## re-transcriptのメッセージングとstateのおさらい

どうやってstateを更新しているのか、維持しているのか、メッセージは双方向か、stateの更新にobserverを追加できるか

#### message passing backgrouond & popup

popup: 

- Reactコンポーネントとして、初回レンダリング時
- popup上のボタンが押されたとき

いずれもsendMessagePromiseを呼び出しているのでpopupから一方的に取得している
