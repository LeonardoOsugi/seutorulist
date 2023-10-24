import { usersCollections } from "../database/db.js";
import bcrypt from 'bcrypt';

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

}