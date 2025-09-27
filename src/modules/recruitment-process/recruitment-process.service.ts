import prisma from '../../db'
import { Prisma, RecruitmentProcess } from '@prisma/client'

export const getRecruitmentProcess = async (id: number) => {
  return await prisma.recruitmentProcess.findUnique({ 
    where: { id },
    include: { steps: true }
  })
}

export const getAllRecruitmentProcesses = async () => {
  return await prisma.recruitmentProcess.findMany({ 
    where: { deleted: false },
    include: {
      steps: {
        orderBy: { order: 'asc' },
        include: { step: true }
      }
    } //  Many-to-many relation. steps is third table that holds relation between processes and steps
  })
}

export const createRecruitmentProcess = async (data: Prisma.RecruitmentProcessCreateInput) => {
  return await prisma.recruitmentProcess.create({ data })
}

export const editRecruitmentProcess = async (id: number, data: Prisma.RecruitmentProcessUpdateInput) => {
  return await prisma.recruitmentProcess.update({ 
    where: { id },
    data 
  })
}

export const deleteRecruitmentProcess = async (id: number) => {
  return await prisma.recruitmentProcess.update({
    where: { id },
    data: { deleted: true }
  })
}