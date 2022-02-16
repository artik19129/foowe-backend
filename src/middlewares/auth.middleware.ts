import { Request, Response } from 'express';
import { NextFunction } from 'express/ts4.0';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!req.session.userId) {
        res.json({
            message: 'unauthorized',
        }).status(401);
    }
    next();
}
