
import express from 'express';
import { VerifyHeaderToken } from '../../../../shared/infra/middlewares/verifyBearerToken';
import {
    createUserController, deleteUserController,
    getUserInfoController,
    getUsersProfileController,
    loginController, updatePictureController
} from '../controllers';

import multer from 'multer';

const UserRouter = express.Router();

UserRouter.post(
    '/',
    (req, res) => createUserController.execute(req, res)
);

UserRouter.delete(
    '/',
    VerifyHeaderToken,
    (req, res) => deleteUserController.execute(req, res)
);

UserRouter.post(
    '/login',
    (req, res) => loginController.execute(req, res)
);

UserRouter.put('/picture',
    VerifyHeaderToken,
    multer().single('picture'),
    (req, res) => updatePictureController.execute(req, res)
)

UserRouter.get('/:id',
    VerifyHeaderToken,
    (req, res) => getUserInfoController.execute(req, res)
)

UserRouter.get('/',
    VerifyHeaderToken,
    (req, res) => getUsersProfileController.execute(req, res)
)

export {
    UserRouter
};