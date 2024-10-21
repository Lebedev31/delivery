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
