import { Request, Response } from "express";
import * as joService from "./job-offer.service";

export const getJobOffer = async (req: Request, res: Response) => {
  const id = req.params.jobOfferId

  try {
    const jobOffer = await joService.getJobOffer(+id)
    res.status(200).json(jobOffer)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const getAllJobOffers = async (req: Request, res: Response) => {
  try {
    const jobOffer = await joService.getAllJobOffers()
    res.status(200).json(jobOffer)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const createJobOffer = async (req: Request, res: Response) => {
  const data = req.body
  
  try {
    const jobOffer = await joService.createJobOffer(data)
    res.status(200).json(jobOffer)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const editJobOffer = async (req: Request, res: Response) => {
  const id = req.params.jobOfferId
  const data = req.body
  
  try {
    const jobOffer = await joService.createJobOffer(data)
    res.status(200).json(jobOffer)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}