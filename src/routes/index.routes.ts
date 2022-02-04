import { Router } from 'express'
import { index, test } from '../controllers/index.controller';

const router = Router();

router.route('/')
    .get(index);

router.route('/test')
    .get(test);


export default router;
