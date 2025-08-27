import { Request, Response, NextFunction } from "express";
import * as fteService from './fte.service'

export const getFte = async (req: Request, res: Response) => {
  const id = req.params.fteId
  
  try {
    const fte = await fteService.getFte(+id)
    res.status(200).json(fte)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const getAllFte = async (req: Request, res: Response) => {
  try {
    const fte = await fteService.getAllFte()
    res.status(200).json(fte)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const createFte = async (req: Request, res: Response) => {
  const { name, description } = req.body

  try {
    const fte = await fteService.createFte(name, description)
    res.status(200).json(fte)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const editFte = async (req: Request, res: Response) => {
  const id = req.params.fteId
  const { name, description } = req.body

  try {
    const fte = await fteService.editFte(+id, name, description)
    res.status(200).json(fte)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const deleteFte = async (req: Request, res: Response) => {
  const id = req.params.fteId
  
  try {
    const fte = await fteService.deleteFte(+id)
    res.status(200).json(fte)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}