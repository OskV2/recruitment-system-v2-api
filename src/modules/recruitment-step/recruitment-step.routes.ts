import { Router } from "express";
import * as rsController from "./recruitment-step.controller";
import { authenticateToken } from "../auth/auth.controller";
import { checkIfAuthorized } from "../role/role.controller";

const router = Router()

router.get('/rsId', authenticateToken, rsController.getRecruitmentStep)

router.get('/', authenticateToken, rsController.getAllRecruitmentSteps)

router.post('/', authenticateToken, rsController.createRecruitmentStep)

router.patch('/rsId', authenticateToken, rsController.editRecruitmentStep)

router.delete('/rsId', authenticateToken, rsController.deleteRecruitmentStep)

export default router