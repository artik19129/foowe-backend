import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const httpServer: http.Server = createServer();
export const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = new Server(httpServer, {
    path: '/websockets',
    serveClient: false,
    cors: {
        origin: '*',
        credentials: false,
    },
});

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
