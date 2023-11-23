import { Router } from "express"
import * as forumController from "../controllers/forum-controller"

const router: Router = Router()

router.get("/forum", forumController.allQA)

export default router