import { Router } from "express";

import { commentController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();

export const commentRouter = router;

router.get("/", commentController.getAll);

router.post(
  "/:orderId",
  authMiddleware.checkAccessToken,
  commentController.create
);
