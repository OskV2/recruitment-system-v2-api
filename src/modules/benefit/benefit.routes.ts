import { Router } from "express";
import * as benefitController from "./benefit.controller";
import { authenticateToken } from "../user/user.controller";
import { checkIfAuthorized } from "../role/role.controller";


const router = Router();

router.get('/:userId', authenticateToken, );

router.get('/', authenticateToken, );

export default router;