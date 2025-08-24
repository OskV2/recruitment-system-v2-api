import prisma from '../../db';
import { Role } from '@prisma/client';

export const getRole = async (id: number): Promise<Role | null>=> {
  return await prisma.role.findUnique({ where: { id: id, deleted: false } })
}

export const getAllRoles = async (): Promise<Role[]> => {
  return await prisma.role.findMany({ where: { deleted: false } })
}

export const createRole = async (
  name: string,
  canManageUsers: boolean,
  canManageRoles: boolean,
  canAddNewOffer: boolean,
  canEditExistingOffer: boolean,
  canViewAllOffers: boolean,
  canManageJobApplications: boolean,
  canViewLogs: boolean,
  description?: string,
): Promise<Role> => {
  return await prisma.role.create({ 
    data: {
      name,
      canManageUsers,
      canManageRoles,
      canAddNewOffer,
      canEditExistingOffer,
      canViewAllOffers,
      canManageJobApplications,
      canViewLogs,
      description 
    } 
  })
}

export const editRole = async (
  id: number,
  name: string,
  canManageUsers: boolean,
  canManageRoles: boolean,
  canAddNewOffer: boolean,
  canEditExistingOffer: boolean,
  canViewAllOffers: boolean,
  canManageJobApplications: boolean,
  canViewLogs: boolean,
  description?: string,
): Promise<Role> => {
  return await prisma.role.update({
    where: {
      id: id
    },
    data: {
      name,
      canManageUsers,
      canManageRoles,
      canAddNewOffer,
      canEditExistingOffer,
      canViewAllOffers,
      canManageJobApplications,
      canViewLogs,
      description 
    } 
  })
}

export const deleteRole = async (id: number): Promise<Role> => {
  return await prisma.role.update({
    where: {
      id: id
    },
    data: {
      deleted: true
    }
  })
}