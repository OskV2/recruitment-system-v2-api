import { Request, Response, NextFunction } from "express";
import * as benefitService from "./benefit.service";

export const getBenefit = async (req: Request, res: Response) => {
  const id = req.params.benefitId

  try {
    const benefit = await benefitService.getBenefit(+id)
    res.status(200).json(benefit)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }

}

export const getAllBenefits = async (req: Request, res: Response) => {
  try {
    const benefit = await benefitService.getAllBenefits()
    res.status(200).json(benefit)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const createBenefit = async (req: Request, res: Response) => {
  const { name, description } = req.body
  try {
    const benefit = await benefitService.createBenefit(name, description)
    res.status(200).json(benefit)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const editBenefit = async (req: Request, res: Response) => {
  const id = req.params.benefitId
  const { name, description } = req.body

  try {
    const benefit = await benefitService.editBenefit(+id, name, description)
    res.status(200).json(benefit)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const deleteBenefit = async (req: Request, res: Response) => {
  const id = req.params.benefitId

  try {
    const benefit = await benefitService.deleteBenefit(+id)
    res.status(200).json(benefit)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}