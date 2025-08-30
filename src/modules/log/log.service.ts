import prisma from '../../db'
import { Prisma, Log } from '@prisma/client'

export const getLog = async (id: number) => {
  return await prisma.log.findUnique({ where: { id } })
}

export const getAllLogs = async () => {
  return await prisma.log.findMany({ orderBy: { createdAt: 'desc' }})
}

export const createLog = async (data: Prisma.LogCreateInput) => {
  return await prisma.log.create({ data })
}