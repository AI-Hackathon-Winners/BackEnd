import Joi from "joi";

export const registerUserValidator = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("adminstrator", "user"),
  // confirmPassword: Joi.ref("password"),
});

export const loginUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileValidator = Joi.object({
    fullName: Joi.string(),    
    email: Joi.string().email(), 
    password: Joi.string().min(6),
})
