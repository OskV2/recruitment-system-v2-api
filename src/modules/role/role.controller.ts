import { Request, Response, NextFunction } from "express";
import * as roleService from './role.service'
import * as userService from '../user/user.service'
import { Role } from "@prisma/client";

export const getRole = async (req: Request, res: Response) => {
  const id = req.params.roleId
  if (!id) return res.status(400).json({ message: `No ID was provided in request` });
    
  try {
    const role = await roleService.getRole(+id)
    res.status(200).json(role)
  } catch (err: any) {
    res.status(400).json({ message: `Something went wrong. Could not get role with id ${id}` })
  }
}

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles()
    res.status(200).json(roles)
  } catch (err: any) {
    res.status(400).json({ message: `Something went wrong. Could not get all roles` })
  }
}

export const createRole = async (req: Request, res: Response) => {
  const {
    name,
    canManageUsers,
    canManageRoles,
    canAddNewOffer,
    canEditExistingOffer,
    canViewAllOffers,
    canManageJobApplications,
    canViewLogs,
    description
  } = req.body
  
  try {
    const role = await roleService.createRole(
      name,
      canManageUsers,
      canManageRoles,
      canAddNewOffer,
      canEditExistingOffer,
      canViewAllOffers,
      canManageJobApplications,
      canViewLogs,
      description
    ) 
    res.status(200).json(role)
  } catch (err: any) {
    res.status(400).json({ message: `Something went wrong. Could not create new role` })
  }
}

export const editRole = async (req: Request, res: Response) => {
  const id = req.params.roleId
  const {
    name,
    canManageUsers,
    canManageRoles,
    canAddNewOffer,
    canEditExistingOffer,
    canViewAllOffers,
    canManageJobApplications,
    canViewLogs,
    description
  } = req.body
  
  try {
    const role = await roleService.editRole(
      +id,
      name,
      canManageUsers,
      canManageRoles,
      canAddNewOffer,
      canEditExistingOffer,
      canViewAllOffers,
      canManageJobApplications,
      canViewLogs,
      description
    )
    res.status(200).json(role)
  } catch (err: any) {
    res.status(400).json({ message: `Something went wrong. Could not edit role` })
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  const id = req.params.roleId

  try {
    const role = await roleService.deleteRole(+id)
    res.status(200).json(role)
  } catch (err: any) {
    res.status(400).json({ message: `Something went wrong. Could not edit role` })
  }
}

//  This function checks if user has necessary permissions for operation
//  Used as middleare
export const checkIfAuthorized = (requiredPermission: string) => {  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = (req as any).user  //  ID of logged user

      const user = await userService.getUser(id)
      const role = await roleService.getRole(user!.roleId)  //  I know that user is not null
      const isAllowed = role![requiredPermission as keyof Role]  //  And I know that role is also not null

      if (!isAllowed) return res.status(403).json({ message: 'You are not authorized to perform this operation' })    
      next()
    } catch (err: any) {
      res.status(400).json({ message: 'Something went wrong' })
    }
  }
}