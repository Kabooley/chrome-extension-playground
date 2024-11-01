import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

interface iMessage {
    from: 'popup' | 'background' | 'contentScript';
    to: 'popup' | 'background' | 'contentScript';
    data: Record<string, string>;
}

/***
 * TODO: onMessage.addListenerの、Reactの再レンダリングにまたがる維持
 *  popup表示 -> poup再レンダリング -> stateの更新とその通知 -> popupのtitleは正しく更新されるのか確認
 *
 *
 * */
const Popup = () => {
    const [title, setTitle] = useState<string>('POPUP');
    const [rand, setRand] = useState<number>(0);

    useEffect(() => {
        chrome.runtime.onMessage.addListener(handleMessage);

        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
        };
    }, []);

    const handleMessage = (message: iMessage, sender, sendResponse) => {
        if (message.to !== 'popup') return;

        console.log('[popup] got message ' + message.data);
        console.dir(message.data);
        const { popup } = message.data;
        if (popup !== undefined) {
            setTitle(message.data.popup);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        chrome.runtime.sendMessage<iMessage>({
            from: 'popup',
            to: 'background',
            data: { popup: 'message from popup' },
        });
    };

    const tempHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        setRand(Math.random() * 100);
    };

    return (
        <div className="popup">
            <h4>{title}</h4>
            <button onClick={handleClick}>send message</button>
            <button onClick={tempHandleClick}>rerender</button>
        </div>
    );
};

const root = document.createElement('div');
document.body.appendChild(root);
createRoot(root).render(<Popup />);
