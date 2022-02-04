import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import session from 'express-session';

import IndexRoutes from './routes/index.routes';
import AuthRoutes from './routes/auth.routes';

import { NextFunction } from 'express/ts4.0';
import * as fs from 'fs';
import * as path from 'path';

export class App {
    app: Application;


    constructor(
        private port?: number | string,
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private static authMiddleware(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        if (!req.session.userId) {
            res.json({
                message: 'unauthorized',
            }).status(401);
        }
        next();
    }

    private settings() {
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
        console.log('Server on port', this.app.get('port'));
    }

}
