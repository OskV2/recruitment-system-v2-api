import prisma from '../../db'
import { Prisma, ContractType } from '@prisma/client'

export const getContractType = async (id: number) => {
  return await prisma.contractType.findUnique({ 
    where: {
      id: id,
      deleted: false
    } 
  })
}

export const getAllContractTypes = async () => {
  return await prisma.contractType.findMany({ where: { deleted: false } })
}

export const createContractType = async (data: Prisma.ContractTypeCreateInput) => {
  return await prisma.contractType.create({ data })
}

export const editContractType = async (id: number, data: Prisma.ContractTypeUpdateInput) => {
  return await prisma.contractType.update({
    where: { id },
    data
  })
}

export const deleteContractType = async (id: number) => {
  return await prisma.contractType.update({
    where: { id },
    data: {
      deleted: true
    }
  })
}