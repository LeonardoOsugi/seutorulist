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

        res.send({tasks, user})
    }catch(e){
        res.status(500).send(e);
    }
}