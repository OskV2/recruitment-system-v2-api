import prisma from '../../db'
import { Prisma, RecruitmentProcess } from '@prisma/client'

export const getRecruitmentProcess = async (id: number) => {
  return await prisma.recruitmentProcess.findUnique({ where: { id } })
}

export const getAllRecruitmentProcesses = async () => {
  return await prisma.recruitmentProcess.findMany({ where: { deleted: false } })
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