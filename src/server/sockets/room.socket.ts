import { Server } from 'http';
import * as socketIo from 'socket.io';

import { Message } from './models';
import { Topic } from './topic.enum';

import { ListenerService } from '../services';

export class RoomSocket {
    private io: SocketIO.Server;
    private server: Server;
    private port: string | number;
    private room: string;
    private listenerService: ListenerService;

    constructor(server: Server, port: string | number) {
        this.server = server;
        this.port = port;

        this.listenerService = ListenerService.getInstance();
        this.listenerService.dispatcher.subscribe((value: any) => {
            if (value === 'activate-listeners') {
                this.socketListener();
            }
        });
        this.init();
    }

    private init() {
        this.sockets();
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private socketListener(): void {
        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);

            socket.on(Topic.JOIN_ROOM, (room: any) => {
                socket.join(room);
                console.log('Joined room: %s', room);
            });

            socket.on(Topic.ACTION_COMPLETED, (room: any, message: Message) => {
                console.log('Room', room, '| Topic', Topic.ACTION_COMPLETED, '| Message', message)
                if (room) {
                    this.io.in(room).emit(Topic.ACTION_COMPLETED, message);
                    console.log('[SERVER](message): %s', JSON.stringify(message));
                }
            });

            socket.on(Topic.ACTION_CANCELED, (room: any, message: Message) => {
                console.log('Room', room, '| Topic', Topic.ACTION_CANCELED, '| Message', message)
                if (room) {
                    this.io.in(room).emit(Topic.ACTION_CANCELED, message);
                    console.log('[SERVER](message): %s', JSON.stringify(message));
                }
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}
