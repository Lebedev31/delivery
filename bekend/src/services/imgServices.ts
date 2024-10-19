import { BaseServices } from "./baseServices";
import { ISliderCollection } from "../interfase/modelsInterfase";
import { IPopularFoods } from "../interfase/modelsInterfase";

export class SliderServices extends BaseServices<ISliderCollection> {}

export class PopularFoodServices extends BaseServices<IPopularFoods> {}
