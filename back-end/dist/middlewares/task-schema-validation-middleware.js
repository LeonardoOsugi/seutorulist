import { taskSchema } from "../models/tasks-models.js";
export function taskSchemaValidation(req, res, next) {
    const { title_task, description, status } = req.body;
    const { _id } = res.locals.user;
    const task = {
        user_id: _id,
        title_task,
        description,
        status
    };
    const { error } = taskSchema.validate(task, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    res.locals.task = task;
    next();
}
