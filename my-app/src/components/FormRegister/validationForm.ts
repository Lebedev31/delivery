import { RegisterOptions } from "react-hook-form";
import { DataSubmit } from "../../redux/types";

const dateRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-([12]\d{3})$/;

export const validationName: RegisterOptions<DataSubmit, "name"> = {
  required: "Поле обязательно для заполнения",
  minLength: {
    value: 3,
    message: "Минимальный размер имени 3 символа",
  },

  maxLength: {
    value: 40,
    message: "Максимальный размер имени 40 символов",
  },

  pattern: {
    value: /[A-Za-z]+/,
    message: "Только латинские буквы",
  },

  validate: {
    notAdmin: (value) => value !== "admin" || "Имя admin зарезервировано",
  },
};

export const validationDateOfBirth: RegisterOptions<DataSubmit, "dateOfBirth"> =
  {
    required: "Поле обязательно для заполнения",

    pattern: {
      value: dateRegex,
      message: "Неверный формат даты (ДД-ММ-ГГГГ)",
    },
  };

export const validationEmail: RegisterOptions<DataSubmit, "email"> = {
  required: "Поле обязательно для заполнения",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Неверный формат email",
  },
};

export const validationPassword: RegisterOptions<DataSubmit, "password"> = {
  required: "Поле обязательно для заполнения",

  maxLength: {
    value: 40,
    message: "Пароль должен быть не более 40 символов",
  },
  validate: {
    hasLowerCase: (value) =>
      /[a-z]/.test(value) ||
      "Пароль должен содержать хотя бы одну строчную букву",
    hasUpperCase: (value) =>
      /[A-Z]/.test(value) ||
      "Пароль должен содержать хотя бы одну заглавную букву",
    hasNumber: (value) =>
      /\d/.test(value) || "Пароль должен содержать хотя бы одну цифру",
    hasSpecialChar: (value) =>
      /[@$!%*?&]/.test(value) ||
      "Пароль должен содержать хотя бы один специальный символ",
    minLength: (value) =>
      value.length >= 8 || "Пароль должен быть не менее 8 символов",
  },
};
