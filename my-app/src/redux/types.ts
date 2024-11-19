import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
export type Active = {
  isActive: boolean;
};

export interface Slider {
  imgPath: string;
  description: string;
  _id: string;
  weight: string;
  title: string;
  price: string;
}

export type SliderResponseData = {
  status: number;
  data: Slider[];
};

export type SlideError = {
  status: number;
  message: string;
};

export interface PopularFood extends Slider {
  promotion: string;
}

export type PopularFoodResponseData = {
  status: number;
  data: PopularFood[];
};

export interface ICategoryMenu extends PopularFood {
  category: string;
}

export type CategoryMenuResponseData = {
  status: number;
  data: ICategoryMenu[];
};

export type BasketState = {
  imgPath: string;
  title: string;
  sum: number;
  quantity: number;
  weight: number;
  price: number;
};

export type DataSubmit = {
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword?: string;
};

export type Logout = Pick<DataSubmit, "email" | "password">;

type ObjectErrorValidation = {
  data: {
    errors: [
      {
        msg: string;
        path: string;
        location: string;
        value: string;
        type: string;
      }
    ];
  };
};

type StandartObjectError = {
  data: {
    msg: string;
    nameError: string;
    statusError: string;
  };
};

type CustomObjectError = {
  data: {
    msg: string;
  };
};

type RTKErrorOne = ObjectErrorValidation & FetchBaseQueryError;
type RTKErrorTwo = StandartObjectError & FetchBaseQueryError;
type RTKErrorThree = CustomObjectError & FetchBaseQueryError;

export type UniversalRTKError = RTKErrorOne | RTKErrorThree | RTKErrorTwo;

export function standartError(error: UniversalRTKError): string {
  if (typeof error.data === "object") {
    if ("errors" in error.data) {
      return error.data.errors[0].msg;
    }

    if ("code" in error.data) {
      return error.data.msg;
    }

    if ("msg" in error.data && !("code" in error.data)) {
      return error.data.msg;
    }
  }

  return "Неизвестная ошибка";
}

export type LoginAuthRedirect = {
  redirect: string;
};
