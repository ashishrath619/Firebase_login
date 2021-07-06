import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .message("Please enter the Valid Email"),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .message("Please enter the Valid Password"),
});

export const LoginResolver = joiResolver(LoginSchema);
