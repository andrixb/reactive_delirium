import { BehaviorSubject } from 'rxjs';

import { Dispatcher } from './models';

export class ListenerService {
    private static instance: ListenerService;

    private _dispatcher: BehaviorSubject<Dispatcher>;
    private _notify: BehaviorSubject<any>;

    constructor() {
        this._dispatcher = new BehaviorSubject<Dispatcher>(null);
        this._notify = new BehaviorSubject<any>(null);

        this.subscribeTo();
    }

    get dispatcher() {
        return this._dispatcher;
    }

    get notify() {
        return this._notify;
    }

    private subscribeTo(): void {
        this._notify.subscribe((value: any) => {
            if (value !== null) {
                this._dispatcher.next(value);
            }
        });
    }

    public static getInstance(): ListenerService {
        if (!ListenerService.instance) {
            ListenerService.instance = new ListenerService();
        }
        return ListenerService.instance;
    }
}
