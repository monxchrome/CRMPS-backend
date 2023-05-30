import Joi from "joi";

import { regexConstants } from "../config/constants/regex.constants";

export class UserValidator {
  private static firstName = Joi.string().min(1).max(20).trim();
  private static surname = Joi.string().min(1).max(20).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static phone = Joi.string().regex(regexConstants.PHONE);
  private static age = Joi.number().max(150);
  private static course = Joi.string().min(1).max(20).trim();
  private static course_format = Joi.string().min(1).max(20).trim();
  private static status = Joi.string().min(1).max(20).trim();
  private static sum = Joi.number();
  private static alreadyPaid = Joi.number();

  static create = Joi.object({
    name: this.firstName,
    surname: this.surname,
    email: this.email,
    phone: this.phone,
    age: this.age,
    course: this.course,
    course_format: this.course_format,
    status: this.status,
    sum: this.sum,
    alreadyPaid: this.alreadyPaid,
  });

  static update = Joi.object({
    name: this.firstName,
    surname: this.surname,
    email: this.email,
    phone: this.phone,
    age: this.age,
    course: this.course,
    course_format: this.course_format,
    status: this.status,
    sum: this.sum,
    alreadyPaid: this.alreadyPaid,
  });
}
