import { Router } from "express"
import * as forumController from "../controllers/forum-controller"

const router: Router = Router()

router.get("/api/forum", forumController.getQuestions)


export default router