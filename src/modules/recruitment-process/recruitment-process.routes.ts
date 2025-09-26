import { Router } from "express";
import * as rpController from "./recruitment-process.controller";
import { authenticateToken } from "../auth/auth.controller";

const router = Router()

router.get('/:rpId', authenticateToken, rpController.getRecruitmentProcess)

router.get('/', authenticateToken, rpController.getAllRecruitmentProcesses)

router.post('/', authenticateToken, rpController.createRecruitmentProcess)

router.patch('/:rpId', authenticateToken, rpController.editRecruitmentProcess)

router.delete('/:rpId', authenticateToken, rpController.deleteRecruitmentProcess)

export default router