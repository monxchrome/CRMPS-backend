import { Router } from "express";

import { orderController } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { orderMiddleware } from "../middlewares/order.middleware";

const router = Router();

export const orderRouter = router;

router.get("/", orderController.getAll);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  orderMiddleware.isValidCreate,
  orderController.create
);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  orderMiddleware.isIDValid,
  orderMiddleware.getByIdOrThrow,
  orderController.getById
);

router.put(
  "/:carID",
  authMiddleware.checkAccessToken,
  orderMiddleware.isIDValid,
  orderMiddleware.isValidUpdate,
  orderMiddleware.getByIdOrThrow,
  orderController.update
);

router.delete(
  "/:carID",
  authMiddleware.checkAccessToken,
  orderMiddleware.isIDValid,
  orderMiddleware.getByIdOrThrow,
  orderController.delete
);
