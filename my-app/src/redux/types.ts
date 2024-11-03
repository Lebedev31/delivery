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
};
