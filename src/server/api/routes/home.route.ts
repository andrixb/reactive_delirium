import * as express from 'express';
import { Routes } from '../models';
import * as path from 'path'; 

export class HomeRoute extends Routes {
    private _app: express.Application;
    private _url: string;
    private _type: string;

    constructor(type: string, url: string, appInstance: express.Application) {
        super(type, url, appInstance);

        this._app = appInstance;
        this._url = url;
        this._type = type;

        this.init();
    }

    private init() {
        switch(this._type) {
            case 'ALL': 
                this.createGet();
                this.createPost();
                break;

            case 'GET': 
                this.createGet();
                break;

            case 'POST': 
                this.createPost();
                break;
            
            default: 
                break;
        }
       
    }

    private createGet() {
        this._app.get(this._url, (request: express.Request, response: express.Response) => { 
            response.sendFile(path.resolve(process.env.INDEX_FILE));
        });
    }

    private createPost() {
        this._app.post(this._url, (request: express.Request, response: express.Response) => { 
            console.log('RECEIVED', request.body);
            response.sendStatus(200);
        });
    }
}
