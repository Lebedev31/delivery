import { IServices } from "../interfase/servicesInterface";
import { INewUser } from "../interfase/modelsInterfase";
import NewUserSchema from "../models/NewUser";
import { Model } from "mongoose";
import { examinationMongoError } from "../error/errorMongo";

class User implements IServices<INewUser> {
  private model: Model<INewUser>;

  constructor(model: Model<INewUser>) {
    this.model = model;
  }
  async create(body: INewUser): Promise<INewUser> {
    try {
      const newUser = new NewUserSchema(body);
      const createNewUser = await newUser.save();
      return createNewUser;
    } catch (error) {
      if (error instanceof Error) {
        const mongoErr = examinationMongoError(error);
        throw mongoErr;
      }
      throw error;
    }
  }
}

export default User;
