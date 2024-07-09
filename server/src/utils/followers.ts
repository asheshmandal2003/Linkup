import { CustomError } from "./error";
import { prisma } from "./prismaClient";

export async function checkUsers(id: string, userId: string) {
  if (id === userId) {
    throw new CustomError(400, "Invalid request! You cannot follow yourself!");
  }

  const validUsers = await prisma.user.findMany({
    where: {
      id: {
        in: [id, userId],
      },
    },
  });

  if (validUsers.length !== 2) {
    throw new CustomError(404, "Invalid request! User not found!");
  }
}

export async function checkFollow(id: string, userId: string) {
  const follow = await prisma.connection.findFirst({
    where: {
      userId,
      followerId: id,
    },
  });

  if (follow) {
    throw new CustomError(400, "You are already following this user!");
  }
}
