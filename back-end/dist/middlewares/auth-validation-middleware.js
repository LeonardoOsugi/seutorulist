import { sessionsCollections, usersCollections } from "../database/db.js";
import { userSchemas } from "../models/users-models.js";
import bcrypt from 'bcrypt';
export function userSchemaValidation(req, res, next) {
    const user = req.body;
    const { error } = userSchemas.validate(user, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    res.locals.user = user;
    next();
}
export async function signInBodyValidation(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await usersCollections.findOne({ email });
        if (!user)
            return res.sendStatus(401);
        const passwordCertin = bcrypt.compareSync(password, user.password);
        if (!passwordCertin)
            return res.sendStatus(401);
        res.locals.user = user;
    }
    catch (e) {
        res.status(500).send(e);
    }
    next();
}
export async function authRoutesValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
    if (!token)
        return res.sendStatus(401);
    try {
        const session = await sessionsCollections.findOne({ token });
        if (!session)
            return res.sendStatus(401);
        const user = await usersCollections.findOne({ _id: session === null || session === void 0 ? void 0 : session.user_id });
        if (!user)
            return res.sendStatus(401);
        res.locals.user = user;
    }
    catch (e) {
        res.status(500).send(e);
    }
    next();
}
