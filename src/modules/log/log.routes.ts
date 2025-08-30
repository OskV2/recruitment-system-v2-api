import { Router } from "express";
import * as logController from "./log.controller";
import { authenticateToken } from "../user/user.controller";
import { checkIfAuthorized } from "../role/role.controller";

const router = Router()

router.get('/logId', authenticateToken, checkIfAuthorized('canViewLogs'), logController.getLog)

router.get('/', authenticateToken, checkIfAuthorized('canViewLogs'), logController.getLog)

export default router