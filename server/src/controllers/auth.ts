import e, { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { hash, hashCompare } from "../utils/hash";
import { CustomError } from "../utils/error";
import { errorHandler, successHandler } from "../utils/responseHandler";
import jwt from "jsonwebtoken";
import { findUser } from "../utils/findUser";

export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const passwordHash = await hash(password);
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        password: passwordHash,
      },
    });

    const resData = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username,
      email,
      role: newUser.role,
    };

    return successHandler(201, resData, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identity, password } = req.body;
    const user = await findUser(identity);

    if (!user) {
      throw new CustomError(404, "User not found!");
    }

    const passwordMatch = await hashCompare(password, user.password);
    if (!passwordMatch) {
      throw new CustomError(400, "Invalid password!");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const resData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    };
    return successHandler(200, resData, res);
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};
