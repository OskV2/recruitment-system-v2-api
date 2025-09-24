import { Request, Response } from "express";
import * as locationService from "./location.service";

export const getLocation = async (req: Request, res: Response) => {
  const id = req.params.locationId
  try {
    const location = await locationService.getLocation(+id)    
    res.status(200).json(location)
  } catch (err: any) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationService.getAllLocations()
    res.status(200).json(locations)
  } catch (err: any) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const createLocation = async (req: Request, res: Response) => {
  const data = req.body
  try {
    const location = locationService.createLocation(data)
    res.status(200).json(location)
  } catch (err: any) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}


export const editLocation = async (req: Request, res: Response) => {
  const id = req.params.locationId
  const data = req.body

  console.log(req.body)
  console.log(data)

  try {
    const location = locationService.editLocation(+id, data)
    res.status(200).json(location)
  } catch (err: any) {
    res.status(400).json({ message: 'Something went wrong' })
  }
}

export const deleteLocation = async (req: Request, res: Response) => {
  const id = req.params.locationId
  try {
    locationService.deleteLocation(+id)
    res.status(200).json(id)
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: 'Something went wrong' })
  }
}