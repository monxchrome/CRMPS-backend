import Joi from "joi";

import { regexConstants } from "../config";

export class AdminValidator {
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);

  static create = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
