import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
    console.log('mongoDB connected');
}catch(e){
    console.log(e);
}

const db = mongoClient.db("seutorulist");
export const usersCollections = db.collection("users");
export const sessionsCollections = db.collection("sessions");
export const listsCollections = db.collection("lists");
export const usersListsCollections = db.collection("users_lists");