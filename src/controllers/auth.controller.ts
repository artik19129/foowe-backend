import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { User } from '../interface/user.interface';
import Account from '../models/Account';
import { errors, names } from '../helpers/errors';
import { Req } from '../types/global';
import logger from '../logger';

export async function login(req: Req, res: Response): Promise<Response | void> {
    const candidate: User = req.body;

    // console.log(candidate);

    if (!candidate.login || !candidate.password) {
        const errorData = errors[names.INVALID_CREDENTIALS];
        return res.json({...errorData}).status(errorData.code);
    }

    let account;

    try {
        account = await Account.getAccountsByLogin(candidate.login);
    } catch (e) {
        console.log(e);
        logger.error(candidate.login, e)
    }

    // console.log(account);

    if (!account) {
        const errorData = errors[names.ACCOUNT_NOT_FOUNT];
        logger.error(errorData.code, errorData.message);
        return res.json({...errorData}).status(errorData.code);
    }

    if (await bcrypt.compare(candidate.password, account.password)) {
        req.session.user = account;
        req.session.userId = account.id;
        console.log('session.userId = ' + req.session.userId);

        return res.json(account).status(200);
    } else {
        const errorData = errors[names.INVALID_CREDENTIALS];
        return res.json({...errorData}).status(errorData.code);
    }
}

export async function register(req: Request, res: Response): Promise<Response | void> {
    const candidate: User = req.body;

    if (!candidate.login || !candidate.password || !candidate.email) {
        const errorData = errors[names.INVALID_CREDENTIALS];
        return res.json({...errorData}).status(errorData.code);
    }

    candidate.password = await bcrypt.hash(candidate.password, 10);

    try {
        await Account.createAccount(candidate);
    } catch (e: any) {
        return res.json({
            code: 500,
            error: e.sqlMessage,
        }).status(500);
    }

    return res.json({
        status: 'success',
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
        status: 'success',
    }).status(200);
}
