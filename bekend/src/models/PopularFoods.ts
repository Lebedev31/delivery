import { Schema, model } from "mongoose";
import { IPopularFoods } from "../interfase/modelsInterfase";

const PopularFoodsSchema = new Schema<IPopularFoods>({
  imgPath: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  weight: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  promotion: {
    type: String,
  },
});

export default model("PopularFood", PopularFoodsSchema, "PopularFood");
