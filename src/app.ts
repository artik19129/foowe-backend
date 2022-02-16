import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import session from 'express-session';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import socketManager from './socket/socketManager';

import IndexRoutes from './routes/index.routes';
import AuthRoutes from './routes/auth.routes';

export class App {
    app: Application;
    httpServer: http.Server = createServer();
    public static io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined;


    constructor(
        private port?: number | string,
    ) {
        this.app = express();
        this.socket();
        this.middlewares();
        this.routes();
        this.settings();
    }

    private async settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    // private isDev() {
    //     fs.readdir(path.join(__dirname, 'models'), (err, files) => {
    //         if (err)
    //             console.log(err);
    //         else {
    //             files.forEach((file) => {
    //                 const model1 = sequelize['import'](path.join(__dirname, file));
    //                 const model = fs.readFileSync(path.join(__dirname, 'models', file), {encoding:'utf8', flag:'r'});
    //                 //@ts-ignore
    //                 model.sync();
    //             })
    //         }
    //     })
    // }

    private socket() {
        App.io = new Server(this.httpServer, {
            path: '/websockets',
            serveClient: false,
            cors: {
                origin: '*',
                credentials: false,
            },
        });

        App.io.on('connection', (socket: Socket) => {
            console.log('a user connected');
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        socketManager.init(App.io);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(session({
            name: 'foowe_session',
            secret: '!session!/secret!!Foowe',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60,
                secure: false,
                sameSite: true,
            },
        }));
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/auth', AuthRoutes);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        this.httpServer.listen(1337, () => {
            console.log('Socket started at port: ', 1337)
        });
        console.log('Server on port', this.app.get('port'));
    }
}
