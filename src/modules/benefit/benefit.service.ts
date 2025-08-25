import prisma from '../../db'
import { Benefit } from '@prisma/client'

export const getBenefit = async (id: number) => {
  // return await prisma.benefit.findUnique()
}

export const getAllBenefits = async () => {
  return await prisma.benefit.findMany()
}