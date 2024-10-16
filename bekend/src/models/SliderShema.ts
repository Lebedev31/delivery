import { Schema, model } from "mongoose";
import { ISliderCollection } from "../interfase/modelsInterfase";

const SliderSchema = new Schema<ISliderCollection>({
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
});

export default model("Slider", SliderSchema, "Slider");
