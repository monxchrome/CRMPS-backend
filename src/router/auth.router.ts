import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { orderMiddleware } from "../middlewares/order.middleware";
import {adminMiddleware} from "../middlewares/admin.middleware";

const router = Router();

export const authRouter = router;

router.post(
  "/login",
  orderMiddleware.isValidLogin,
  orderMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

router.post(
  "/register",
  adminMiddleware.isValidCreate,
  adminMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);
