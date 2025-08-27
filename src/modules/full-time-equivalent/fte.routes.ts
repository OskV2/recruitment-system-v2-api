import { Router } from "express";
import * as fteController from "./fte.controller";
import { authenticateToken } from "../user/user.controller";
import { checkIfAuthorized } from "../role/role.controller";

const router = Router()

router.get('/:fteId', authenticateToken, fteController.getFte);

router.get('/', authenticateToken, fteController.getAllFte);

router.post('/', authenticateToken, fteController.createFte);

router.patch('/fteId', authenticateToken, fteController.editFte);

router.delete('/fteId', authenticateToken, fteController.deleteFte);

export default router