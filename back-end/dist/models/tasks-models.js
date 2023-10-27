import joi from 'joi';
export const taskSchema = joi.object({
    user_id: joi.object().required(),
    title_task: joi.string().required().min(3),
    description: joi.string().required().min(3),
    status: joi.string().required().valid("CONCLUIDO", "EM ANDAMENTO")
});
