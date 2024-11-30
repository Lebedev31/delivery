import { IServices } from "../interfase/servicesInterface";
import { Model } from "mongoose";
import { examinationMongoError } from "../error/errorMongo";

export class BaseServices<T extends object> implements IServices<T> {
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
      const filter: Record<string, any> = {};
      filter[property] = id;
      const findCollection = (await this.model.find(filter).lean()) as T[];
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

  async update(id: string, body: Partial<T>): Promise<T> {
    try {
      const updateSlide = await this.model.updateOne(
        { _id: id },
        { $set: body },
        {
          new: true,
          runValidators: true,
        }
      );

      console.log(updateSlide);
      return updateSlide as T;
    } catch (error) {
      if (error instanceof Error) {
        const mongoErr = examinationMongoError(error);
        throw mongoErr;
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deleteItem = await this.model.deleteOne({ _id: id });
    } catch (error) {
      if (error instanceof Error) {
        const mongoErr = examinationMongoError(error);
        throw mongoErr;
      }
      throw error;
    }
  }
}
