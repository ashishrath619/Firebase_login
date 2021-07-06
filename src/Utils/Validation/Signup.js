import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const SignupSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code == "string.empty") {
          err.message = "Email is required field";
        } else if (err.code == "string.email") {
          err.message = "Please Enter a valid email";
        }
      });
      return errors;
    }),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code == "string.empty") {
          err.message = "password is required field";
        } else if (err.code == "string.pattern.field") {
          err.message = "password must be character,number or@#";
        }
      });
      return errors;
    }),
  repeat_password: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .error((errors) => {
      console.log("error", errors);

      errors.forEach((err) => {
        if (err.code == "any.required") {
          err.message = "password is required field";
        } else if (err.code == "any.only") {
          err.message = "password and Repeat Password does not match";
        }
      });
      return errors;
    }),
});

export const SignupRsolver = joiResolver(SignupSchema);
