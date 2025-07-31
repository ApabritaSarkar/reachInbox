import { Router } from "express";
import { searchEmailsController, getAllEmailsController } from "../controllers/emailController";

const router = Router();

router.get("/", getAllEmailsController);
router.get("/search", searchEmailsController);

export default router;
