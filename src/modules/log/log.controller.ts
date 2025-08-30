import { Request, Response } from "express";
import * as logService from './log.service'

export const getLog = async (req: Request, res: Response) => {
  const id = req.params.logId

  try {
    const log = logService.getLog(+id)
    res.status(200).json(log)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const log = logService.getAllLogs()
    res.status(200).json(log)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }
}