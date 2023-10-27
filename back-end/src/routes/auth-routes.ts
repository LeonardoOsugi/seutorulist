import {Router} from 'express';
import { signIn, signUp } from '../controllers/auth-controllers';
import { signInBodyValidation, userSchemaValidation } from '../middlewares/auth-validation-middleware';

const authRouter = Router();

authRouter
.post('/sign-up', userSchemaValidation, signUp)
.post('/sign-in', signInBodyValidation, signIn)

export {authRouter};