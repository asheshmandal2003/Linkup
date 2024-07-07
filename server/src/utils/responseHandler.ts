import { Response } from "express";
import { CustomError } from "./error";

export const successHandler = (status: number, data: any, res: Response) => {
  return res.status(status || 200).json(data);
};

export const errorHandler = (error: CustomError, res: Response) => {
  return res
    .status(error.status || 500)
    .json({ error: error.message || "Something went wrong!" });
};
