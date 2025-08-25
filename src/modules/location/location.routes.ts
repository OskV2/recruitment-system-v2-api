import { Router } from "express";
import * as locationController from "./location.controller";
import { authenticateToken } from "../user/user.controller"; 
// import { checkIfAuthorized } from "../role/role.controller";

const router = Router()

router.get('/:locationId', authenticateToken, locationController.getLocation)

router.get('/', authenticateToken, locationController.getAllLocations)

router.post('/', authenticateToken, locationController.createLocation)

router.patch('/:locationId', authenticateToken, locationController.editLocation)

router.delete('/:locationId', authenticateToken, locationController.deleteLocation)

export default router