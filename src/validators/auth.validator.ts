import Joi from "joi";

import { regexConstants } from "../config";

export class AuthValidator {
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().min(1).max(10);

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
