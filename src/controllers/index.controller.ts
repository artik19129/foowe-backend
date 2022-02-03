import { Request, Response } from 'express'

export function index(req: Request, res: Response): Response {
   return res.json('Test Task MajesticGTA5 API');
}
