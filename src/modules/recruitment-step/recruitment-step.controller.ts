import { Request, Response, NextFunction } from "express";
import * as rsService from './recruitment-step.service'

export const getRecruitmentStep = async (req: Request, res: Response) => {
  const id = req.params.rsId

  try {
    const rs = rsService.getRecruitmentStep(+id)
    res.status(200).json(rs)
  } catch (err: any) {
    console.error(err)
    res.status(400).json('Something went wrong')
  }
}

export const getAllRecruitmentSteps = async (req: Request, res: Response) => {
  try {
    const rs = rsService.getAllRecruitmentSteps()
    res.status(200).json(rs)
  } catch (err: any) {
    console.error(err)
    res.status(400).json('Something went wrong')
  }
}

export const createRecruitmentStep = async (req: Request, res: Response) => {
  const { name, description, status } = req.body
  
  try {
    const rs = rsService.createRecruitmentStep(name, description, status)
    res.status(200).json(rs)
  } catch (err: any) {
    console.error(err)
    res.status(400).json('Something went wrong')
  }
}

export const editRecruitmentStep = async (req: Request, res: Response) => {
  const id = req.params.rsId
  const { name, description, status } = req.body
  
  try {
    const rs = rsService.editRecruitmentStep(+id, name, description, status)
    res.status(200).json(rs)
  } catch (err: any) {
    console.error(err)
    res.status(400).json('Something went wrong')
  }
}

export const deleteRecruitmentStep = async (req: Request, res: Response) => {
  const id = req.params.rsId

  try {
    const rs = rsService.deleteRecruitmentStep(+id)
    res.status(200).json(rs)
  } catch (err: any) {
    console.error(err)
    res.status(400).json('Something went wrong')
  }
}