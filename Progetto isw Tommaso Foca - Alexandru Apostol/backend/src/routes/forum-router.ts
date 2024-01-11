import { Router } from "express"
import * as forumController from "../controllers/forum-controller"

const router: Router = Router()

router.get("/api/forum", forumController.getQuestions)
router.post("/api/newQuestion", forumController.MakeQuestion)
router.delete("/api/forum/:id", forumController.deletePost)
router.get("/api/answers/:id", forumController.getAnswers)
router.delete("/api/answers/:id", forumController.deleteAnswer)
router.post("/api/forum/newComment", forumController.newComment)

export default router