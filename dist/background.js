/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
chrome.runtime.onInstalled.addListener(() => {
    console.log('[chrome.runtime.onInstalled]');
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[chrome.runtime.onMessage]' + message);
});

/******/ })()
;
//# sourceMappingURL=background.js.map