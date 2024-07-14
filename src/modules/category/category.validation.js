import joi from 'joi'

export const categoryVal = joi.object({
    name: joi.string().required()
}).required()