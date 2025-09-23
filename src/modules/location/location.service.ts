import prisma from '../../db';
import { Prisma, Location } from '@prisma/client';

//  Dayum what type should i run here
export const getLocation = async (id: number) => {
  return await prisma.location.findUnique({ 
    select: {
      id: true,
      country: true,
      city: true,
      description: true,
      createdAt: true
    },
    where: { id: id, deleted: false } 
  });
}

export const getAllLocations = async () => {
  return await prisma.location.findMany({ 
    select: {
      id: true,
      country: true,
      city: true,
      description: true,
      createdAt: true
    },
    where: { deleted: false } });
}

export const createLocation = async (data: Prisma.LocationCreateInput): Promise<Location> => {
  return await prisma.location.create({ data })
}

export const editLocation = async (id: number, data: Prisma.LocationUpdateInput) => {
  return await prisma.location.update({
    where: {
      id: id
    },
    data
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
