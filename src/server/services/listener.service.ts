import { Subject } from 'rxjs';

import { IDispatcher } from './models';

export class ListenerService {
    private static instance: ListenerService;

    private _dispatcher: Subject<IDispatcher>;
    private _notify: Subject<any>;

    constructor() {
        this._dispatcher = new Subject<IDispatcher>();
        this._notify = new Subject<any>();

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
