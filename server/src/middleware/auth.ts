import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Access denied!" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1].trim();
    }
    token &&
      jwt.verify(token, process.env.JWT_SECRET as string, (error, _user) => {
        if (error) {
          return res.status(403).json({ error: "Invalid token!" });
        }
      });
    next();
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
