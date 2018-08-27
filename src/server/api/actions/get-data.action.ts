import { Observable } from 'rxjs';
import axios from 'axios';

import { IActions } from '../models';

export class GetData implements IActions {
    private _fetchSubscription: Observable<any>;

    constructor(public url: string) {
        this._fetchSubscription = new Observable<any>();
    }

    async get(url: string) {
        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    get fetchSubscription() {
        return this._fetchSubscription;
    }
}
