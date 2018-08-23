import * as express from 'express';
import { Routes } from '../models';
import * as path from 'path'; 

export class NotFoundRoute extends Routes {
    private _app: express.Application;
    private _url: string;
    private _type: string;

    constructor(type: string, url: string, appInstance: express.Application) {
        super(type, url, appInstance);

        this._app = appInstance;
        this._url = url;
        this._type = type;

        this.createGet();
    }

    private createGet() {
        this._app.get(this._url, (request: express.Request, response: express.Response) => { 
            response.sendFile(path.resolve('src/public/pages/404.html'));
        });
    }
}
