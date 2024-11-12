import NewUserSchema from "../models/NewUser";
import { body, ValidationChain } from "express-validator";

class ValidationForm {
  static validationUser(): ValidationChain[] {
    return [
      body("email")
        .isEmail()
        .withMessage("Неверный формат email")
        .normalizeEmail()
        .custom(async (value: string) => {
          const existEmail = await NewUserSchema.findOne({ email: value });
          if (existEmail) {
            throw new Error(
              "Такой email уже существует в базе, укажите другой"
            );
          }
          return true;
        }),

      body("name")
        .isString()
        .isLength({ min: 3, max: 40 })
        .withMessage(
          "Минимальный размер строки 3 символа, максимальный размер 40"
        )
        .custom((value: string) => {
          return /[A-Za-z]+/.test(value);
        })
        .withMessage("Только латинские буквы"),

      body("password")
        .isLength({ min: 8, max: 40 })
        .withMessage(
          "Минимальный размер пароля 3 символа, максимальный размер 40"
        )
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
        .withMessage(
          "Пароль должен содержать хотя бы одну строчную букву,заглавную букву,одну цифру, специальный символ"
        ),

      body("dateOfBirth")
        .matches(/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-([12]\d{3})$/)
        .withMessage("Неверный формат даты"),
    ];
  }

  static validationLogin(): ValidationChain[] {
    return [
      body("email")
        .isEmail()
        .withMessage("Неверный формат email")
        .normalizeEmail(),

      body("password")
        .isLength({ min: 8, max: 40 })
        .withMessage(
          "Минимальный размер пароля 3 символа, максимальный размер 40"
        )
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
        .withMessage(
          "Пароль должен содержать хотя бы одну строчную букву,заглавную букву,одну цифру, специальный символ"
        ),
    ];
  }
}

export default ValidationForm;
