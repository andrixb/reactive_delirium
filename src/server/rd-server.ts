import { createServer, Server } from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { APIRouter } from './api';
import { RoomSocket } from './sockets';

import { ListenerService } from './services';

export class RDServer {
    public static readonly PORT:number = 1212;
    private app: express.Application;
    private server: Server;
    private port: string | number;
    private apiRouter: APIRouter;
    private roomSocket: RoomSocket;
    private listenerService: ListenerService;

    constructor() {
        this.config();
        this.createApp();
        this.createServer();
        this.createRouter();
        this.createSockets();
        this.listen();
    }
    
    private config(): void {
        this.port = process.env.PORT || RDServer.PORT;
        this.listenerService = ListenerService.getInstance();
        this.listenerService.dispatcher.subscribe((value: any) => {
            if (value === 'activate-listeners') {
                this.serverListener();
            } 
        });
    }

    private createApp(): void {
        this.app = express();
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private createRouter(): void {
        this.apiRouter = new APIRouter(this.app);
    }

    private createSockets(): void {
        this.roomSocket = new RoomSocket(this.server, this.port);
    }

    private serverListener(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }
    
    private listen(): void { 
        this.listenerService.notify.next('activate-listeners');
    }

    public getApp(): express.Application {
        return this.app;
    }
}
