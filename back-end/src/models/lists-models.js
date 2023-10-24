import joi from 'joi';

export const listSchema = joi.object({
    user_id: joi.object().required(),
    title_list: joi.string().required().min(3),
    description: joi.string().required().min(3),
    status: joi.string().required().valid("CONCLUIDO", "EM ANDAMENTO")
})