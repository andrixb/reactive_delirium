import { Subject } from 'rxjs';
import axios from 'axios';

import { IActions } from '../models';

export class GetData implements IActions {
    private _fetchSubscription: Subject<any>;

    constructor(public url?: string) {
        this._fetchSubscription = new Subject<any>();
    }

    public async get(url: string): Promise<any> {
        try {
            const response = await axios.get(url);
            this._fetchSubscription.next(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            this._fetchSubscription.next(error);
        }
    }

    get fetchSubscription(): Subject<any> {
        return this._fetchSubscription;
    }
}
