import joi from 'joi';
export const userSchemas = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required().min(3),
    password: joi.string().required().min(3),
});
