import { Router } from "express";

import { orderController } from "../controllers";
import { authMiddleware, orderMiddleware } from "../middlewares";

const router = Router();

export const orderRouter = router;

router.get("/", orderController.getAll);

router.get(
  "/:orderId",
  authMiddleware.checkAccessToken,
  orderMiddleware.isIDValid,
  orderMiddleware.getByIdOrThrow,
  orderController.getById
);

router.put(
  "/:orderId",
  authMiddleware.checkAccessToken,
  orderMiddleware.isIDValid,
  orderMiddleware.isValidUpdate,
  orderMiddleware.getByIdOrThrow,
  orderController.update
);
