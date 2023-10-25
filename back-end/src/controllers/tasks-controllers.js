import { ObjectId } from "mongodb";
import { tasksCollections } from "../database/db.js";
import dayjs from 'dayjs';

export async function createTask(req, res){
    const {user_id, title_task, description, status} = res.locals.task;

    const created_at = dayjs().format("DD/MM/YYYY");

    try{
        await tasksCollections.insertOne({user_id, title_task, description, status, created_at})

        res.sendStatus(201);
    }catch(e){
        res.status(500).send(e);
    }
}

export async function findTasks(req, res){
    const user = res.locals.user;

    try{
        const tasks = await tasksCollections.find({user_id: user._id}).toArray();

        delete user.password;
        res.send({tasks, user})
    }catch(e){
        res.status(500).send(e);
    }
}

export async function findTasksForTitle(req, res){
    const user = res.locals.user;
    const {title_task} = req.body;

    try{
        const tasks = await tasksCollections.find({user_id: user._id, title_task}).toArray();

        if(!tasks) return res.sendStatus(401);

        delete user.password;
        res.send({tasks, user})
    }catch(e){
        res.status(500).send(e);
    }
}

export async function updatedTask(req, res){
    const user = res.locals.user;
    const { id } = req.params;
    const {status} = req.body;
    try{;
        const tasks = await tasksCollections.find({_id: new ObjectId(id), user_id: user._id}).toArray();

        if(!tasks) return res.sendStatus(404);

        await tasksCollections.updateOne({_id: new ObjectId(id)}, {$set:{ status: status }})

        res.sendStatus(200);
    }catch(e){
        res.status(500).send(e);
    }
}

export async function deletedTask(req, res){
    const user = res.locals.user;
    const { id } = req.params;

    try{;
        const tasks = await tasksCollections.find({_id: new ObjectId(id), user_id: user._id}).toArray();

        if(!tasks) return res.sendStatus(404);

        await tasksCollections.deleteOne({_id: new ObjectId(id)})
        res.sendStatus(200);
    }catch(e){
        res.status(500).send(e);
    }
}