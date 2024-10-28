import { BaseServices } from "./baseServices";
import { ISliderCollection } from "../interfase/modelsInterfase";
import { IPopularFoods } from "../interfase/modelsInterfase";
import { ICategoryFood } from "../interfase/modelsInterfase";

export class SliderServices extends BaseServices<ISliderCollection> {}

export class PopularFoodServices extends BaseServices<IPopularFoods> {}

export class CategoryMenuServices extends BaseServices<ICategoryFood> {}
