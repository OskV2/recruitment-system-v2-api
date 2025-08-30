import { Router } from "express";
import * as benefitController from "./recruitment-process.controller";
import { authenticateToken } from "../user/user.controller";

const router = Router()

router.get('/:rpId', authenticateToken, )

router.get('/', authenticateToken, )

router.post('/', authenticateToken, )

router.patch('/:rpId', authenticateToken, )

router.delete('/:rpId', authenticateToken, )

export default router