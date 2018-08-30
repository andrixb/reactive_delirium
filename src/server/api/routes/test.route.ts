import * as express from 'express';
import { IRoutes } from '../models';
import { GetData } from '../actions';
import { GetResponse } from '../models';

export class TestRoute implements IRoutes {
    private getDataAction: GetData;
    private URL_TEST = 'https://content.guardianapis.com/search?api-key=97a71bdd-03e4-4d00-a314-b86c2d123de2';

    constructor(public type: string, public url: string, public app: express.Application) {
        this.getDataAction = new GetData();
        this.createGet();
    }

    private createGet() {
        this.app.get(this.url, (request: express.Request, response: express.Response) => { 
            this.getDataAction.get(this.URL_TEST);
            this.getDataAction.fetchSubscription.subscribe((value) => {
                const res = new GetResponse(value.response);
                response.send(res.getData());
            });
        });
    }
}
