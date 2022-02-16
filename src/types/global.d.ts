import { Request, Express } from 'express';
import { Socket, Event } from 'socket.io';

export type Req = Request & {
    //@ts-ignore
    session: Express.Session
    sessionID: string;
}

export type SocketEvent = Socket & {
    handshake?: any;
    conn?: any;
}
