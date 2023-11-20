import { Router } from "express"
import * as forumController from "../controllers/forum-controller.ts"

const router: Router = Router()

router.get("/api/forum", forumController.allQA)

export default router