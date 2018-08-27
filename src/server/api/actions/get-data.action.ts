import { Subject } from 'rxjs';

import { IActions } from '../models';

export class GetData implements IActions {
    private _reactor: Subject<any>;

    private URL = 'pvwatts/v5.';

    constructor(public label: string, public url: string) {
        this._reactor = new Subject<any>();
        this.init();
    }

    private init() {
        console.log();
    }

    get reactor() {
        return this._reactor;
    }
}
