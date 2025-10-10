import { Request, Response } from "express";
import * as rpService from "./recruitment-process.service";

export const getRecruitmentProcess = async (req: Request, res: Response) => {
  const id = req.params.rpId

  try {
    const recruitmentProcess = await rpService.getRecruitmentProcess(+id)
    res.status(200).json(recruitmentProcess)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const getAllRecruitmentProcesses = async (req: Request, res: Response) => {
  try {
    const recruitmentProcess = await rpService.getAllRecruitmentProcesses()
    res.status(200).json(recruitmentProcess)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const createRecruitmentProcess = async (req: Request, res: Response) => {
  const { name, description, steps } = req.body

  try {
    const recruitmentProcess = await rpService.createRecruitmentProcess({
      name,
      description,
      steps: {
        create: steps.map((step: any, index: number) => ({
          step: { connect: { id: step.id } },
          order: index
        }))
      }
    })
    res.status(200).json(recruitmentProcess)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const editRecruitmentProcess = async (req: Request, res: Response) => {
  const id = req.params.rpId
  const data = req.body

  try {
    const recruitmentProcess = await rpService.editRecruitmentProcess(+id, data)
    res.status(200).json(recruitmentProcess)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const deleteRecruitmentProcess = async (req: Request, res: Response) => {
  const id = req.params.rpId

  try {
    const recruitmentProcess = await rpService.deleteRecruitmentProcess(+id)
    res.status(200).json(recruitmentProcess)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}