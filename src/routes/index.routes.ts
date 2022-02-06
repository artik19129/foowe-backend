import { Router } from 'express'
import { index } from '../controllers/index.controller';

const router = Router();

router.route('/')
    .get(index);

export default router;
