import { Router } from "express";

import { commentController } from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

export const commentRouter = router;

router.get("/", commentController.getAll);

router.post(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commentController.create
);
