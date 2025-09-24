import prisma from '../../db'
import { Prisma, RecruitmentStep } from '@prisma/client'

export const getRecruitmentStep = async (id: number) => {
  return await prisma.recruitmentStep.findUnique({ where: { id: id, deleted: false } })
}

export const getAllRecruitmentSteps = async () => {
  return await prisma.recruitmentStep.findMany({ where: { deleted: false } })
}

export const createRecruitmentStep = async (data: Prisma.RecruitmentStepCreateInput) => {
  return await prisma.recruitmentStep.create({ data })
}

export const editRecruitmentStep = async (id: number, data: Prisma.RecruitmentStepUpdateInput) => {
  return await prisma.recruitmentStep.update({
    where: { id },
    data
  })
}

export const deleteRecruitmentStep = async (id: number) => {
  return await prisma.recruitmentStep.update({
    where: { id },
    data: {
      deleted: true
    }
  })
}