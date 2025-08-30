import prisma from '../../db'
import { Prisma, JobOffer } from '@prisma/client'

export const getJobOffer = async (id: number) => {
  return await prisma.jobOffer.findUnique({ where: { id } })
}

export const getAllJobOffers = async () => {
  return await prisma.jobOffer.findMany()
}

export const createJobOffer = async (data: Prisma.JobOfferCreateInput) => {
  return await prisma.jobOffer.create({ data })
}

export const editJobOffer = async (id: number, data: Prisma.JobOfferUpdateInput) => {
  return await prisma.jobOffer.update({
    where: { id },
    data
  })
}