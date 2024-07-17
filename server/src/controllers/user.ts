import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { CustomError } from "../utils/error";
import { errorHandler, successHandler } from "../utils/responseHandler";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user =
      (await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
        },
      })) !== null;

    if (!user) {
      throw new CustomError(404, "User doesn't exists!");
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return successHandler(
      200,
      { message: "Account deleted successfully!" },
      res
    );
  } catch (error: any) {
    return errorHandler(error, res);
  } finally {
    await prisma.$disconnect();
  }
};
