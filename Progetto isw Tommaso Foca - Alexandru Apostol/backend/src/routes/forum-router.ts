import { Router } from "express"
import * as forumController from "../controllers/forum-controller"

const router: Router = Router()

router.get("/api/forum", forumController.getQuestions)
router.post("/api/newQuestion", forumController.MakeQuestion)
router.delete("/api/forum/:id", forumController.deletePost)
router.get("/api/answers/:id", forumController.getAnswers)
router.delete("/api/answers/:id", forumController.deleteComment)
router.post("/api/forum/newComment", forumController.newComment)
router.post("/api/forum/editComment", forumController.editComment)
router.get("/api/popular", forumController.mostCommentedPosts)

export default router