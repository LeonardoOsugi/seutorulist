import { sessionsCollections, usersCollections } from "../database/db";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';
import { Request, Response } from "express";


export async function signUp(req: Request, res: Response){
    const {name, email, password} = res.locals.user;
    const passwordHash = bcrypt.hashSync(password, 12);
    const created_at = dayjs().format("DD/MM/YYYY");
    try{
        const emailExist = await usersCollections.findOne({email});

        if(emailExist) return res.sendStatus(401);

        await usersCollections.insertOne({name, email, password: passwordHash, created_at});

        res.sendStatus(201);
    }catch(e){
        res.status(500).send(e);
    }
}

export async function signIn(req: Request, res:Response){
    const {_id} = res.locals.user;

    const token = uuidv4();

    const created_at = dayjs().format("DD/MM/YYYY");

    try{
        await sessionsCollections.insertOne({token, user_id: _id, created_at});
        
        res.send({token})
    }catch(e){
        res.status(500).send(e);
    }
}