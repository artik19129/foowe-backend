import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { connect } from '../database';
import { User } from '../interface/user.interface';

export async function login(req: Request, res: Response): Promise<Response | void> {
    const user: User = req.body;

    if (!user.login || !user.password) {
        return res.json({
            message: 'invalid_credentials',
        }).status(401);
    }

    const conn = await connect();
    const query = await conn.query('SELECT * FROM accounts WHERE login = ?', [user.login]);

    //@ts-ignore
    const account: User = query[0][0];

    if (!Object.keys(account).length) {
        return res.json({
            message: 'not_found',
        }).status(404);
    }

    if (await bcrypt.compare(user.password, account.password)) {
        //@ts-ignore
        req.session.userId = account.id;
        //@ts-ignore
        console.log('session.userId = ' + req.session.userId);

        return res.json(account).status(200);
    } else {
        return res.json({
            message: 'invalid_credentials',
        }).status(401);
    }
}

export async function register(req: Request, res: Response): Promise<Response | void> {
    const user: User = req.body;

    if (!user.login || !user.password || !user.email) {
        return res.json({
            message: 'invalid_credentials',
        }).status(401);
    }

    const conn = await connect();

    user.password = await bcrypt.hash(user.password, 10);

    try {
        await conn.query('INSERT INTO accounts SET ?', [user]);
    } catch (e: any) {
        return res.json({
            message: e.sqlMessage,
        }).status(400);
    }

    return res.json({
        message: 'success',
    }).status(201);
}

export async function logout(req: Request, res: Response): Promise<Response | void> {
    req.session.destroy(err => {
        if (err) {
            return res.json({
                message: 'error',
            }).status(400);
        }
    });
    res.clearCookie('majestic_session');

    return res.json({
        message: 'success',
    }).status(201);
}
