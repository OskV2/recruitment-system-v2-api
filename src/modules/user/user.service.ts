import prisma from "../../db";
import { User } from "@prisma/client";

export const listUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({ include: { posts: true } });
};

export const registerUser = async (email: string, name?: string, age?: number): Promise<User> => {
  return prisma.user.create({ data: { email, name, age } });
};
