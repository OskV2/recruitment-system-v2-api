import prisma from '../../db'
import { FullTimeEquivalent } from '@prisma/client'

export const getFte = async (id: number) => {
  return await prisma.fullTimeEquivalent.findUnique({ where: { id: id, deleted: false } })
}

export const getAllFte = async () => {
  return await prisma.fullTimeEquivalent.findMany({ where: { deleted: false } })
}

export const createFte = async (
  name: string,
  description?: string,
) => {
  return await prisma.fullTimeEquivalent.create({
    data: {
      name,
      description
    }
  })
}

export const editFte = async (id: number, name: string, description?: string) => {
  return await prisma.fullTimeEquivalent.update({
    where: {
      id: id
    },
    data: {
      name,
      description
    }
  })
}

export const deleteFte = async (id: number) => {
  return await prisma.fullTimeEquivalent.update({
    where: {
      id: id
    },
    data: {
      deleted: true
    }
  })
}