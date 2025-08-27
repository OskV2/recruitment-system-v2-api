import prisma from '../../db'
import { RecruitmentStep } from '@prisma/client'

export const getRecruitmentStep = async (id: number) => {
  return await prisma.recruitmentStep.findUnique({ where: { id: id, deleted: false } })
}

export const getAllRecruitmentSteps = async () => {
  return await prisma.recruitmentStep.findMany({ where: { deleted: false } })
}

export const createRecruitmentStep = async (
  name: string,
  description: string,
  status: string,
  requiresInterview: boolean,
  interviewDate?: Date,
) => {
  return await prisma.recruitmentStep.create({
    data: {
      name,
      description,
      status,
      requiresInterview,
      interviewDate
    }
  })
}

export const editRecruitmentStep = async (
  id: number,
  name: string,
  description: string,
  status: string,
  requiresInterview: boolean,
  interviewDate?: Date,
) => {
  return await prisma.recruitmentStep.update({
    where: {
      id: id
    },
    data: {
      name,
      description,
      status,
      requiresInterview,
      interviewDate
    }
  })
}

export const deleteRecruitmentStep = async (id: number) => {
  return await prisma.recruitmentStep.update({
    where: {
      id: id
    },
    data: {
      deleted: true
    }
  })
}