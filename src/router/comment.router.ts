import { Router } from "express";

import { commentController } from "../controllers/comment.controller";

const router = Router();

export const commentRouter = router;

router.get("/", commentController.getAll);

router.post("/", commentController.create);
