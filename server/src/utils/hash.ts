import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const hashCompare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
