import { Router } from "express";
import * as jobOfferController from "./job-offer.controller";
import { authenticateToken } from "../user/user.controller";

const router = Router()

router.get('/jobOfferId', authenticateToken, jobOfferController.getJobOffer)

router.get('/', authenticateToken, jobOfferController.getAllJobOffers)

router.post('/', authenticateToken, jobOfferController.createJobOffer)

router.patch('/jobOfferId', authenticateToken, jobOfferController.editJobOffer)

export default router