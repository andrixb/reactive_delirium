import * as express from 'express';
import { IRoutes } from '../models';
import * as path from 'path'; 

export class NotFoundRoute implements IRoutes {
    constructor(public type: string, public url: string, public app: express.Application) {
        this.createGet();
    }

    private createGet() {
        this.app.get(this.url, (request: express.Request, response: express.Response) => { 
            response.sendFile(path.resolve('src/public/pages/404.html'));
        });
    }
}
