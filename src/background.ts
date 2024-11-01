import Storage_ from './Storage_';

export interface iMessage {
    from: 'popup' | 'background' | 'contentScript';
    to: 'popup' | 'background' | 'contentScript';
    data: Record<string, string>;
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('[chrome.runtime.onInstalled]');
});

/***
 * service-workerがアンロードされる状況を再現することはできないし、
 * このイベントはアイドル状態にしても発火しなかった...
 * 
 * */ 
chrome.runtime.onSuspend.addListener(() => {
    console.log('[background] suspended');
});

chrome.runtime.onMessage.addListener(
    (message: iMessage, sender, sendResponse) => {
        console.log('[chrome.runtime.onMessage]' + message);

        if (message.to !== 'background') return;
        switch (message.from) {
            case 'popup': {
                state.set({ popup: message.data.popup + Math.random() * 100 });
                return;
            }
            case 'contentScript': {
                state.set({
                    contentScript:
                        message.data.contentScript + Math.random() * 100,
                });
                return;
            }
            default: {
                throw new Error('something went wrong. Unknown message');
            }
        }
    }
);

const state = new Storage_<Record<string, string>>();

chrome.storage.onChanged.addListener(state.handleChange);

setTimeout(() => {
    state.set({
        background: 'timer timed out',
    });
}, 5000);
