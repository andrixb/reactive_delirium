import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Router } from './routes';

import { Message } from './models';

export class RDServer {
    public static readonly PORT:number = 1212;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private room: string;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.createRouter();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || RDServer.PORT;
    }

    private createRouter(): void {
        new Router(this.app);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void { 
        this.serverListener();
        this.socketListener();
    }

    private serverListener(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }

    private socketListener(): void {
        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);

            socket.on('room', (room: any) => {
                this.room = room;
                socket.join(room);
                console.log('Joined room: %s', this.room);
            });
            
            socket.on('message', (id: string, m: Message) => {
                if (this.room) {
                    this.io.in(this.room).emit('message', m);
                    console.log('[SERVER](message): %s', JSON.stringify(m));
                }
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
