import { Request, Response } from 'express'

import Account from '../models/Account';


export function index(req: Request, res: Response): Response {
   return res.json('Test Task MajesticGTA5 API');
}


export async function test(req: Request, res: Response): Promise<Response | void> {

   const accounts = await Account.getUsers();
   console.log(accounts);

   return res.json({accounts}).status(201);
}
