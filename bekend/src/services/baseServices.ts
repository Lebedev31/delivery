import { IServices } from "../interfase/servicesInterface";
import { Model } from "mongoose";
import { examinationMongoError } from "../error/errorMongo";
export abstract class BaseServices<T> implements IServices<T> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  // abstract create?(body: T): Promise<T>;
  // abstract update?(id: string): Promise<T>;

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
  async getId(id: string): Promise<T[] | []> {
    try {
      const findCollection = (await this.model
        .find({ category: id })
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
  //  abstract delete?(id: string): Promise<T | null>;
}
