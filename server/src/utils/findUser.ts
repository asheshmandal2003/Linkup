import { prisma } from "../utils/prismaClient";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const findUser = async (identity: string) => {
  if (EMAIL_REGEX.test(identity)) {
    return await prisma.user.findUnique({
      where: {
        email: identity,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
    });
  } else {
    return await prisma.user.findUnique({
      where: {
        username: identity,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        password: true,
        role: true,
      },
    });
  }
};
