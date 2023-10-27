import { NextFunction, Request, Response } from "express";
import { sessionsCollections, usersCollections } from "../database/db";
import { userSchemas } from "../models/users-models";
import bcrypt from 'bcrypt';

export function userSchemaValidation(req: Request, res: Response, next: NextFunction){
    const user = req.body;

    const {error} = userSchemas.validate(user, {abortEarly: false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    res.locals.user = user;

    next();
}

export async function signInBodyValidation(req: Request, res: Response, next: NextFunction){
    const {email, password} = req.body;

    try{
        const user = await usersCollections.findOne({email});

        if(!user) return res.sendStatus(401);

        const passwordCertin = bcrypt.compareSync(password, user.password);

        if(!passwordCertin) return res.sendStatus(401);
        
        res.locals.user = user;
    }catch(e){
        res.status(500).send(e);
    }

    next();
}

export async function authRoutesValidation(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ","");

    if(!token) return res.sendStatus(401);

    try{
        const session = await sessionsCollections.findOne({token});

        if(!session) return res.sendStatus(401);

        const user = await usersCollections.findOne({_id: session?.user_id});

        if(!user) return res.sendStatus(401);

        res.locals.user = user;
    }catch(e){
        res.status(500).send(e);
    }

    next();
}