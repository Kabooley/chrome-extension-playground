// https://www.patterns.dev/vanilla/observer-pattern
class Observable<T> {
    observers: ((data: T) => void)[];
    constructor() {
        this.observers = [];
    }

    subscribe(func) {
        this.observers.push(func);
    }

    unsubscribe(func) {
        this.observers = this.observers.filter((observer) => observer !== func);
    }

    notify(data) {
        this.observers.forEach((observer) => observer(data));
    }
}

export default Observable;
