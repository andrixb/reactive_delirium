import { BehaviorSubject } from 'rxjs';

import { Actions } from '../models';

export class GetData extends Actions {
    private _reactor: BehaviorSubject<any>;

    private URL = 'pvwatts/v5.';

    constructor(label: string, url: string) {
        super(label, url);

        this._reactor = new BehaviorSubject<any>(null);
        this.init();
    }

    private init() {
        console.log();
    }

    get reactor() {
        return this._reactor;
    }
}
