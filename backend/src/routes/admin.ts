import {Router} from "express";
import {getRole} from "../controllers/adminController.js";

const router=Router();
router.get("/",getRole);

export default router;