import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { orderMiddleware } from "../middlewares/order.middleware";

const router = Router();

export const authRouter = router;

router.post(
  "/login",
  orderMiddleware.isValidLogin,
  orderMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
