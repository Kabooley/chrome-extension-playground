/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./src/contentScript.ts ***!
  \******************************/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[contentScript][onMessage]' + message);
});
const heading = document.querySelector('h1');
console.log('[contentScript] get heading dom: ' + heading.textContent);

/******/ })()
;
//# sourceMappingURL=contentScript.js.map