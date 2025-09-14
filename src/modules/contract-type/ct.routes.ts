import { Router } from "express";
import * as contractTypeController from "./ct.controller";
import { authenticateToken } from "../auth/auth.controller";
// import { checkIfAuthorized } from "../role/role.controller"; 

const router = Router()

router.get('/:ctId', authenticateToken, contractTypeController.getContractType)

router.get('/', authenticateToken, contractTypeController.getAllContractTypes)

router.post('/', authenticateToken, contractTypeController.createContractType)

router.patch('/:ctId', authenticateToken, contractTypeController.editContractType)

router.delete('/:ctId', authenticateToken, contractTypeController.deleteContractType)

export default router