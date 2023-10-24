import { sessionsCollections, usersCollections } from "../database/db.js";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export async function signUp(req, res){
    const {name, email, password} = res.locals.user;
    const passwordHash = bcrypt.hashSync(password, 12);
    const created_at = new Date();
    try{
        const emailExist = await usersCollections.findOne({email});

        if(emailExist) return res.sendStatus(401);

        await usersCollections.insertOne({name, email, password: passwordHash, created_at});

        res.sendStatus(201);
    }catch(e){
        res.status(500).send(e);
    }
}

export async function signIn(req, res){
    const {_id, email, password} = res.locals.user;

    const token = uuidv4();

    try{
        await sessionsCollections.insertOne({token, user_id: _id});
        
        res.send({token})
    }catch(e){
        res.status(500).send(e);
    }
}