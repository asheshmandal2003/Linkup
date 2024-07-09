import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../utils/error";
import { errorHandler } from "../utils/responseHandler";

export const validateEditUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const editUserSchema = Joi.object({
      first_name: Joi.string().min(3).max(50).optional().messages({
        "string.base": "First name must be a string!",
        "string.empty": "First name is required!",
        "string.min": "First name must have atleast {#limit} characters!",
        "string.max": "First name cannot have more than {#limit} characters!",
      }),
      last_name: Joi.string().min(3).max(50).optional().messages({
        "string.base": "Last name must be a string!",
        "string.empty": "Last name is required!",
        "string.min": "Last name must have atleast {#limit} characters!",
        "string.max": "Last name cannot have more than {#limit} characters!",
      }),
      username: Joi.string().optional().min(3).max(50).optional().messages({
        "string.base": "Username must be a string!",
        "string.empty": "Username is required!",
        "string.alphanum":
          "Username must only contain alphanumeric characters!",
        "string.min": "Username must have atleast {#limit} characters!",
        "string.max": "Username cannot have more than {#limit} characters!",
      }),
      bio: Joi.string().max(250).optional().messages({
        "string.base": "Bio must be a string!",
        "string.empty": "Bio is required!",
        "string.max": "Bio cannot have more than {#limit} characters!",
      }),
      location: Joi.string().max(100).optional().messages({
        "string.base": "Location must be a string!",
        "string.empty": "Location is required!",
        "string.max": "Location cannot have more than {#limit} characters!",
      }),
      dob: Joi.string()
        .custom((value, helpers) => {
          const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
          if (!iso8601Regex.test(value)) {
            return helpers.error("date.iso");
          }
          const date = new Date(value);
          if (date > new Date()) {
            return helpers.error("date.max");
          }
          return value;
        })
        .optional()
        .messages({
          "date.base": "Birthday must be a date!",
          "date.empty": "Birthday is required!",
          "date.iso": "Date should be in full ISO format!",
          "date.max": "Invalid date! Date must not be in the future.",
        }),
    });

    const { error } = editUserSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }
    next();
  } catch (error: any) {
    return errorHandler(error, res);
  }
};
