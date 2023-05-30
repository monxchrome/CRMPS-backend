import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

export const userRouter = router;

router.get("/", userController.getAll);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  userMiddleware.isValidCreate,
  userController.create
);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIDValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:carID",
  authMiddleware.checkAccessToken,
  userMiddleware.isIDValid,
  userMiddleware.isValidUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:carID",
  authMiddleware.checkAccessToken,
  userMiddleware.isIDValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);
