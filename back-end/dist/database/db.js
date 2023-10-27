import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("A variável de ambiente MONGO_URI não está definida.");
    process.exit(1); // Encerrar o programa ou lidar com o erro de acordo com sua lógica.
}
const mongoClient = new MongoClient(mongoUri);
try {
    await mongoClient.connect();
    console.log('mongoDB connected');
}
catch (e) {
    console.log(e);
}
const db = mongoClient.db("seutorulist");
export const usersCollections = db.collection("users");
export const sessionsCollections = db.collection("sessions");
export const tasksCollections = db.collection("tasks");
export const usersTasksCollections = db.collection("users_tasks");
