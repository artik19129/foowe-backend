import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { SocketEvent } from '../types/global';
import { Server, Socket } from 'socket.io';
import Account from '../models/Account';

class SocketManager {
    private socketIo: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null;

    constructor() {
        this.socketIo = null;
    }

    init(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.socketIo = io;

        io.use(async (socket: SocketEvent, next) => {
            const token = socket.handshake.query.token;

            if (token) {
                let account;

                try {
                    account = await Account.getAccountsByHwid(token);
                    console.log(account);
                } catch (e) {
                    console.log(e);
                }

                if (!account) {
                    return next(new Error('Authentication error'));
                }

                console.log('ALL OK');
                return next();
            }

            return next(new Error('Authentication error'));
        });
    }
}


export default new SocketManager();
