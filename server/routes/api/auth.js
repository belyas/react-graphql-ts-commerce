import express from 'express';

import { authController } from '../../controllers/api';
import { isAuthenticatedApi } from '../../middlewares';

const router = express.Router();

router.post('/checkstatus', isAuthenticatedApi, authController.checkUserStatus);
// router.post('/signup', authController.signup);

export default router;
