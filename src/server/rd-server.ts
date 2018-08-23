import { createServer, Server } from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { Router } from './api';
import { RoomSocket } from './api';

export class RDServer {
    public static readonly PORT:number = 1212;
    private app: express.Application;
    private server: Server;
    private port: string | number;
    private router: Router;
    private roomSocket: RoomSocket;

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
        this.router = new Router(this.app);
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
        this.serverListener();
        this.roomSocket.socketListener();
    }

    public getApp(): express.Application {
        return this.app;
    }
}
