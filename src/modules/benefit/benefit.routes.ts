import { Router } from "express";
import * as benefitController from "./benefit.controller";
import { authenticateToken } from "../auth/auth.controller";
import { checkIfAuthorized } from "../role/role.controller";

const router = Router();

router.get('/:benefitId', authenticateToken, benefitController.getBenefit);

router.get('/', authenticateToken, benefitController.getAllBenefits);

router.post('/', authenticateToken, benefitController.createBenefit);

router.patch('/benefitId', authenticateToken, benefitController.editBenefit);

router.delete('/benefitId', authenticateToken, benefitController.deleteBenefit);

export default router;