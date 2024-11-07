import { IServices } from "../interfase/servicesInterface";
import { Model } from "mongoose";
import { examinationMongoError } from "../error/errorMongo";

export class BaseServices<T> implements IServices<T> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async getAll(): Promise<T[] | []> {
    try {
      const findCollection = (await this.model.find().lean()) as T[];
      return findCollection.length ? findCollection : [];
    } catch (error) {
      if (error instanceof Error) {
        const mongoErr = examinationMongoError(error);
        throw mongoErr;
      }
      throw error;
    }
  }
  async getId(id: string, property: string): Promise<T[] | []> {
    try {
      const findCollection = (await this.model
        .find({ property: id })
        .lean()) as T[];
      return findCollection.length ? findCollection : [];
    } catch (error) {
      if (error instanceof Error) {
        const mongoErr = examinationMongoError(error);
        throw mongoErr;
      }
      throw error;
    }
  }

  async create(body: T): Promise<T> {
    try {
      const newUser = new this.model(body);
      const createNewUser = (await newUser.save()) as T;
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
