import joi from 'joi'
export const taskValidation = joi.object({
    type: joi.string().valid('Text', 'List').required(),
    body: joi.string().required(),
    items: joi.array().items(joi.string()),
    shared: joi.boolean(),
    categoryName: joi.string(),
}).required()