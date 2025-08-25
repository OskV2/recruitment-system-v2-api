import prisma from '../../db';
import { Location } from '@prisma/client';

export const getLocation = async (id: number) => {
  return await prisma.location.findUnique({ where: { id: id, deleted: false } });
}

export const getAllLocations = async () => {
  return await prisma.location.findMany({ where: { deleted: false } });
}

export const createLocation = async (
  name: string,
  description?: string
) => {
  return await prisma.location.create({
    data: {
      name,
      description
    }
  })
}

export const editLocation = async (
  id: number,
  name: string,
  description?: string
) => {
  return await prisma.location.update({
    where: {
      id: id
    },
    data: {
      name,
      description
    }
  })
}

export const deleteLocation = async (id: number) => {
  return await prisma.location.update({
    where: {
      id: id
    },
    data: {
      deleted: true
    }
  })
}
