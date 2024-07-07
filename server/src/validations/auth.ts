import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../utils/error";
import { errorHandler } from "../utils/responseHandler";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;

export const validateRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerSchema = Joi.object({
      first_name: Joi.string().min(3).max(50).required().messages({
        "string.base": "First name must be a string!",
        "string.empty": "First name is required!",
        "string.min": "First name must have atleast {#limit} characters!",
        "string.max": "First name cannot have more than {#limit} characters!",
        "any.required": "First name is required!",
      }),
      last_name: Joi.string().min(3).max(50).required().messages({
        "string.base": "Last name must be a string!",
        "string.empty": "Last name is required!",
        "string.min": "Last name must have atleast {#limit} characters!",
        "string.max": "Last name cannot have more than {#limit} characters!",
        "any.required": "Last name is required!",
      }),
      username: Joi.string().alphanum().min(3).max(50).required().messages({
        "string.base": "Username must be a string!",
        "string.empty": "Username is required!",
        "string.alphanum":
          "Username must only contain alphanumeric characters!",
        "string.min": "Username must have atleast {#limit} characters!",
        "string.max": "Username cannot have more than {#limit} characters!",
        "any.required": "Username is required!",
      }),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "string.base": "Email must be a string!",
          "string.empty": "Email is required!",
          "string.email": "Invalid email address!",
          "any.required": "Email is required!",
        }),
      password: Joi.string()
        .min(8)
        .max(32)
        .pattern(new RegExp(PASSWORD_REGEX))
        .required()
        .messages({
          "string.base": "Password must be a string!",
          "string.empty": "Password is required!",
          "string.min": "Password must have atleast {#limit} characters!",
          "string.max": "Password cannot have more than {#limit} characters!",
          "string.pattern.base":
            "Password must have atleast 1 digit, 1 special character, and 1 uppercase letter!",
          "any.required": "Password is required!",
        }),
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }
    next();
  } catch (err: any) {
    return errorHandler(err, res);
  }
};

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginSchema = Joi.object({
      identity: Joi.alternatives()
        .try(
          Joi.string().alphanum().min(3).max(50).messages({
            "string.base": "Username must be a string!",
            "string.empty": "Username is required!",
            "string.alphanum":
              "Username must only contain alphanumeric characters!",
            "string.min": "Username must have atleast {#limit} characters!",
            "string.max": "Username cannot have more than {#limit} characters!",
          }),
          Joi.string()
            .email({
              minDomainSegments: 2,
              tlds: { allow: ["com", "net"] },
            })
            .messages({
              "string.base": "Email must be a string!",
              "string.empty": "Email is required!",
              "string.email": "Invalid email address!",
            })
        )
        .required(),
      password: Joi.string()
        .min(8)
        .max(32)
        .pattern(new RegExp(PASSWORD_REGEX))
        .required()
        .messages({
          "string.base": "Password must be a string!",
          "string.empty": "Password is required!",
          "string.min": "Password must have atleast {#limit} characters!",
          "string.max": "Password cannot have more than {#limit} characters!",
          "string.pattern.base":
            "Password must have atleast 1 digit, 1 special character, and 1 uppercase letter!",
          "any.required": "Password is required!",
        }),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }
    next();
  } catch (error: any) {
    return errorHandler(error, res);
  }
};
