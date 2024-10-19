export interface ISliderCollection {
  imgPath: string;
  description: string;
  _id: string;
  price: string;
  weight: string;
  title: string;
}

export interface IPopularFoods extends ISliderCollection {
  promotion?: string;
}
