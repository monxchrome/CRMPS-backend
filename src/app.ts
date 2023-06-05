import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./config";
import { cronRunner } from "./cron";
import { authRouter, commentRouter, orderRouter } from "./router";
import { IError } from "./types";
import * as swaggerJson from "./utils/swagger.json";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/orders", orderRouter);
app.use("/comments", commentRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 400;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  // eslint-disable-next-line no-console
  console.log(`Server has started on port: ${configs.PORT}`);
});
