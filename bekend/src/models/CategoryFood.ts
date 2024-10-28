import { ICategoryFood } from "../interfase/modelsInterfase";
import { Schema, model } from "mongoose";

const CategoryFoodSchema = new Schema<ICategoryFood>({
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

  category: {
    type: String,
    required: true,
  },
});

export default model("CategoryFood", CategoryFoodSchema, "CategoryFood");
