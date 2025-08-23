import prisma from '../../db';
import { User } from '@prisma/client';
import { hashPassword } from '@/utils/hash-password'

//  Overloading Signarute
export function getUser(id: number): Promise<User | null>
export function getUser(email: string): Promise<User | null>

//  Overloading implementation
export async function getUser(param: any) {
  if (typeof param === 'number' ) return await prisma.user.findUnique({ where: { id: param, deleted: false } });
  if (typeof param === 'string') return await prisma.user.findUnique({ where: { email: param, deleted: false } });
};

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany({ where: { deleted: false } });
};

export const createUser = async (
  name: string,
  email: string
): Promise<User> => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword('root')
    },
  });
};

export const editUser = async (id: number, name?: string, email?: string, roleId?: number) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      roleId,
    },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      deleted: true
    },
  });
};

