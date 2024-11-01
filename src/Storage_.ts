import type { iMessage } from './background';
import Observable from './Observable';

/***
 * TODO: MV3ではアンロードされる可能性があるため、classインスタンスも保持されないので、リロードのたびにobserverを再登録できるように
 *
 * NOTE: 指定のkeyvaluepairが必要な場合、必要な情報はkeyであるのでkeyさえわかれば欲しいデータにアクセスできる
 *
 * */
class Storage_<T extends Record<string, string>> {
    observer: Observable<T>;
    constructor() {
        this.set = this.set.bind(this);
        this.get = this.get.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.notifyToPopup = this.notifyToPopup.bind(this);
        this.notifyToContentScript = this.notifyToContentScript.bind(this);
        this.observer = new Observable<T>();
        this.observer.subscribe(this.notifyToPopup);
        this.observer.subscribe(this.notifyToContentScript);

        console.log('[Storage_] generated');
    }

    notifyToPopup(data: T) {
        chrome.runtime.sendMessage<iMessage>({
            from: 'background',
            to: 'popup',
            data: data,
        });
    }

    notifyToContentScript(data: T) {
        chrome.runtime.sendMessage<iMessage>({
            from: 'background',
            to: 'contentScript',
            data: data,
        });
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
        }

        this.get(null).then((d) => this.observer.notify(d));
    }

    set(keyValuePair: Record<string, string>) {
        return chrome.storage.local.set(keyValuePair);
    }

    /**
     * データ例
     * {
     *  background: "timer timed out",
     *  popup: "message from popup"
     * }
     * */
    get(key: string) {
        return chrome.storage.local.get(key);
    }
}

export default Storage_;
