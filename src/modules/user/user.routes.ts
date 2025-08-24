import { Router } from "express";
import * as userController from "./user.controller";
import { checkIfAuthorized } from "../role/role.controller";

const router = Router();

router.get('/:userId', userController.authenticateToken, checkIfAuthorized('canManageUsers'), userController.getUser);

router.get('/', userController.authenticateToken, checkIfAuthorized('canManageUsers'), userController.getUsers);

router.post('/', userController.authenticateToken, checkIfAuthorized('canManageUsers'), userController.createUser);

router.patch('/:userId', userController.authenticateToken, checkIfAuthorized('canManageUsers'), userController.editUser)

router.delete('/:userId', userController.authenticateToken, checkIfAuthorized('canManageUsers'), userController.deleteUser)

router.post('/login', userController.loginUser)

export default router;