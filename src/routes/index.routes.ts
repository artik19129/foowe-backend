import { Request, Response, Router } from 'express';
import { index, information, test } from '../controllers/index.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// router.get('/', authMiddleware, index);

router.route('/')
    .get(index);

router.get('/launcher/information', information)

router.get('/test', test);

export default router;
