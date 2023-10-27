import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth-controllers.js';
import { signInBodyValidation, userSchemaValidation } from '../middlewares/auth-validation-middleware.js';
const authRouter = Router();
authRouter
    .post('/sign-up', userSchemaValidation, signUp)
    .post('/sign-in', signInBodyValidation, signIn);
export { authRouter };
