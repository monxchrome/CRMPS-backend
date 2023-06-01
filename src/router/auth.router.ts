import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

export const authRouter = router;

router.post(
  "/login",
  adminMiddleware.isValidLogin,
  adminMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/register",
  adminMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
