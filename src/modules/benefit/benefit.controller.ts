import { Request, Response, NextFunction } from "express";
import * as benefitService from "./benefit.service";

export const fn = async (req: Request, res: Response) => {
  // const id = req.params.benefitId

  try {
    //  do something
    res.status(200)
  } catch (err:any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' })
  }

}