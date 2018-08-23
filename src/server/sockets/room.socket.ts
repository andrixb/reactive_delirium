import { Server } from 'http';
import * as socketIo from 'socket.io';

import { Message } from './models';
import { Topic } from './topic.enum';

export class RoomSocket {
    private io: SocketIO.Server;
    private server: Server;
    private port: string | number;
    private room: string;

    constructor(server: Server, port: string | number) {
        this.server = server;
        this.port = port;
        
        this.init();
    }

    private init() {
        this.sockets();
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    public socketListener(): void {
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
