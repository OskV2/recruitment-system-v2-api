import { Router } from "express";
import * as userController from "./user.controller";
import { checkIfAuthorized } from "../role/role.controller";
import { authenticateToken } from "../auth/auth.controller";

const router = Router();

router.get('/:userId', authenticateToken, checkIfAuthorized('canManageUsers'), userController.getUser);

router.get('/', authenticateToken, checkIfAuthorized('canManageUsers'), userController.getUsers);

router.post('/', authenticateToken, checkIfAuthorized('canManageUsers'), userController.createUser);

router.patch('/:userId', authenticateToken, checkIfAuthorized('canManageUsers'), userController.editUser)

router.delete('/:userId', authenticateToken, checkIfAuthorized('canManageUsers'), userController.deleteUser)

export default router;