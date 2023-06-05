import { Router } from "express";

import { authController } from "../controllers";
import { adminMiddleware, authMiddleware } from "../middlewares";

const router = Router();

export const authRouter = router;

router.post(
  "/login",
  adminMiddleware.isValidLogin,
  adminMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
