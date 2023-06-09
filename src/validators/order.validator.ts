import Joi from "joi";

import { regexConstants } from "../config";
import { ECourse, ECourseFormat, ECourseType, EStatus } from "../enums";

export class OrderValidator {
  private static firstName = Joi.string().min(1).max(20).trim();
  private static surname = Joi.string().min(1).max(20).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static phone = Joi.string().regex(regexConstants.PHONE);
  private static age = Joi.number().max(150);
  private static course = Joi.valid(...Object.values(ECourse));
  private static course_format = Joi.valid(...Object.values(ECourseFormat));
  private static course_type = Joi.valid(...Object.values(ECourseType));
  private static status = Joi.valid(...Object.values(EStatus));
  private static sum = Joi.number();
  private static alreadyPaid = Joi.number();
  private static group = Joi.string();

  static create = Joi.object({
    name: this.firstName,
    surname: this.surname,
    email: this.email,
    phone: this.phone,
    age: this.age,
    course: this.course,
    course_format: this.course_format,
    course_type: this.course_type,
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
    course_type: this.course_type,
    status: this.status,
    sum: this.sum,
    alreadyPaid: this.alreadyPaid,
    group: this.group,
  });
}
