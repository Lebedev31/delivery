import { Schema, model } from "mongoose";
import { INewUser } from "../interfase/modelsInterfase";

const NewUserSchema = new Schema<INewUser>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: String,
    required: true,
  },
});

export default model("User", NewUserSchema, "User");
