import { Request, Express } from 'express';

export type Req = Request & {
    //@ts-ignore
    session: Express.Session
    sessionID: string;
}
