import { Router } from "express"
import * as roleController from './role.controller'
import { authenticateToken } from "../auth/auth.controller"

const router = Router()

router.get('/:roleId', authenticateToken, roleController.checkIfAuthorized('canManageRoles'), roleController.getRole)

router.get('/', authenticateToken, roleController.checkIfAuthorized('canManageRoles'), roleController.getAllRoles)
// router.get('/', authenticateToken, roleController.getAllRoles)

router.post('/', authenticateToken, roleController.checkIfAuthorized('canManageRoles'), roleController.createRole)

router.patch('/:roleId', authenticateToken, roleController.checkIfAuthorized('canManageRoles'), roleController.editRole)

router.delete('/:roleId', authenticateToken, roleController.checkIfAuthorized('canManageRoles'), roleController.deleteRole)

export default router;