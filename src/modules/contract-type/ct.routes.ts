import { Router } from "express";
import * as contractTypeRoutes from "./ct.controller";
import { authenticateToken } from "../user/user.controller"; 
// import { checkIfAuthorized } from "../role/role.controller"; 

const router = Router()

router.get('/:ctId', authenticateToken, contractTypeRoutes.getContractType)

router.get('/', authenticateToken, contractTypeRoutes.getAllContractTypes)

router.post('/', authenticateToken, contractTypeRoutes.createContractType)

router.patch('/:ctId', authenticateToken, contractTypeRoutes.editContractType)

router.delete('/:ctId', authenticateToken, contractTypeRoutes.deleteContractType)

export default router