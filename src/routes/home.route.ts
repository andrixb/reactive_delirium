import * as express from 'express';
import { Routes } from '../models';

export class HomeRoute extends Routes {
    private _app: express.Application;
    private _url: string;

    constructor(url: string, appInstance: express.Application) {
        super(url, appInstance);

        this._app = appInstance;
        this._url = url;

        this.init();
    }

    private init() {
        this._app.get(this._url, (request: express.Request, response: express.Response) => { 
            response.send('HOME ROUTE');
        });
    }
}
