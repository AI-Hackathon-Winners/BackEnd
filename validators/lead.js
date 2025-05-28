import Joi from "joi";

export const leadValidator = Joi.object({
    leadName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    status: Joi.string().required(),
    notes: Joi.string().required(),
    // owner: Joi.string().required(),
});

export const updateLeadValidator = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    status: Joi.string().required(),
    notes: Joi.string().required(),
})