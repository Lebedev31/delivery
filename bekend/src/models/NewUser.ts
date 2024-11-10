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
  },

  dateOfBirth: {
    type: String,
  },
});

export default model("User", NewUserSchema, "User");
