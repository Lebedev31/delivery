export interface ISliderCollection {
  imgPath: string;
  description: string;
  price: string;
  weight: string;
  title: string;
  _id?: string;
}

export interface IPopularFoods extends ISliderCollection {
  promotion?: string;
}

export interface ICategoryFood extends IPopularFoods {
  category: string;
}

export interface INewUser {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
}
