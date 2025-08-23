import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

router.get('/:userId', userController.getUser);

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.patch('/:userId', userController.editUser)

router.delete('/:userId', userController.deleteUser)

router.post('/login', userController.loginUser)

export default router;