import prisma from '../../db'
import { Benefit } from '@prisma/client'

export const getBenefit = async (id: number) => {
  return await prisma.benefit.findUnique({ where: { id: id, deleted: false } })
}

export const getAllBenefits = async () => {
  return await prisma.benefit.findMany({ where: { deleted: false } })
}

export const createBenefit = async (
  name: string,
  description?: string
) => {
  return await prisma.benefit.create({ 
    data: { 
      name, 
      description 
    } 
  })
}

export const editBenefit = async (
  id: number,
  name: string,
  description?: string
) => {
  return await prisma.benefit.update({
    where: {
      id: id
    },
    data: {
      name,
      description
    }
  })
}

export const deleteBenefit = async (id: number) => {
  return await prisma.benefit.update({
    where: {
      id: id
    },
    data: {
      deleted: true
    }
  })
}