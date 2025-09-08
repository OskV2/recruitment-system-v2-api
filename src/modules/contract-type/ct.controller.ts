import { Request, Response, NextFunction } from "express";
import * as contractTypeService from "./ct.service";

export const getContractType = async (req: Request, res: Response) => {
  const id = req.params.ctId
  try {
    const ct = await contractTypeService.getContractType(+id)
    res.status(200).json(ct)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const getAllContractTypes = async (req: Request, res: Response) => {
  try {
    const cts = await contractTypeService.getAllContractTypes()
    res.status(200).json(cts)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }

}

export const createContractType = async (req: Request, res: Response) => {
  const { name, description } = req.body
  try {
    const ct = await contractTypeService.createContractType(name, description)
    res.status(200).json(ct)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }

}

export const editContractType = async (req: Request, res: Response) => {
  const id = req.params.ctId
  const { name, description } = req.body
  try {
    const ct = await contractTypeService.editContractType(+id, name, description)
    res.status(200).json(ct)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }

}

export const deleteContractType = async (req: Request, res: Response) => {
  const id = req.params.ctId
  try {
    const ct = await contractTypeService.deleteContractType(+id)
    res.status(200).json(ct)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}