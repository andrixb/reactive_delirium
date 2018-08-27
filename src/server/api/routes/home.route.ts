import * as express from 'express';
import { IRoutes } from '../models';
import * as path from 'path'; 

export class HomeRoute implements IRoutes {
    constructor(
        public type: string, 
        public url: string, 
        public app: express.Application
    ) {
        this.init();
    }

    private init() {
        switch(this.type) {
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
        this.app.get(this.url, (request: express.Request, response: express.Response) => { 
            response.sendFile(path.resolve(process.env.INDEX_FILE));
        });
    }

    private createPost() {
        this.app.post(this.url, (request: express.Request, response: express.Response) => { 
            console.log('RECEIVED', request.body);
            response.sendStatus(200);
        });
    }
}
