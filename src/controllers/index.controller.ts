import { Request, Response } from 'express';
import { App } from '../app';
import Account from '../models/Account';

export function index(req: Request, res: Response): Response {
   return res.json('Foowe API');
}

export async function test(req: Request, res: Response) {
   console.log('test func');
   // @ts-ignore
   App.io.emit('test', {test: 'TEST'});
   return res.json('ok');
}

export async function information(req: Request, res: Response) {
   let account;
   console.log(req.body.hwid);

   try {
      account = await Account.getAccountsByHwid(req.body.hwid);
      console.log(account);
   } catch (e) {
      console.log(e);
   }

   if (!account) {
      return res.json({
         user: {
            is_blocked: true
         }
      }).status(200);
   }

   return res.json({...account}).status(200);
}
