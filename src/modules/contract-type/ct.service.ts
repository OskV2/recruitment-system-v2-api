import prisma from '../../db'
import { ContractType } from '@prisma/client'

export const getContractType = async (id: number) => {
  return await prisma.contractType.findUnique({ 
    where: {
      id: id
    } 
  })
}

export const getAllContractTypes = async () => {
  return await prisma.contractType.findMany()
}

export const createContractType = async (
  name: string,
  description?: string
) => {
  return await prisma.contractType.create({
    data: {
      name,
      description
    }
  })
}

export const editContractType = async (
  id: number,
  name: string,
  description?: string
) => {
  return await prisma.contractType.update({
    where: {
      id: id
    },
    data: {
      name,
      description
    }
  })
}

export const deleteContractType = async (id: number) => {
  return await prisma.contractType.update({
    where: {
      id: id
    },
    data: {
      deleted: true
    }
  })
}