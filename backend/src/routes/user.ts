
import {Router} from "express";
import {getRole} from "../controllers/userController.js";

const router=Router();
router.get("/",getRole);

export default router;