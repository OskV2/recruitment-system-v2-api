import prisma from '../../db';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

//  Overloading Signarute
export function getUser(id: number): Promise<User | null>
export function getUser(email: string): Promise<User | null>

//  Overloading implementation
export async function getUser(param: any) {
  if (typeof param === 'number' ) return await prisma.user.findUnique({ where: { id: param } });
  if (typeof param === 'string') return await prisma.user.findUnique({ where: { email: param } });
};

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany({ where: { deleted: false } });
};

export const createUser = async (
  email: string,
  name: string,
  // roleId: number
): Promise<User> => {
  return await prisma.user.create({
    data: {
      name,
      email,
      // roleId,
    },
  });
};

export const editUser = async (id: number) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {},
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {},
  });
};

