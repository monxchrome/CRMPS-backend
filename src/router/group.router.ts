import { Router } from "express";

import { groupController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();

export const groupRouter = router;

router.post("/group", groupController.getAll);

router.post(
  "/:orderId",
  authMiddleware.checkAccessToken,
  groupController.create
);
