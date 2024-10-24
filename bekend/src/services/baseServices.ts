import { IServices } from "../interfase/servicesInterface";
import { Model } from "mongoose";

export abstract class BaseServices<T> implements IServices<T> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  // abstract create?(body: T): Promise<T>;
  // abstract update?(id: string): Promise<T>;

  async getAll(): Promise<T[] | []> {
    const findCollection = (await this.model.find().lean()) as T[];
    return findCollection.length ? findCollection : [];
  }
  // abstract getId?(id: string): Promise<T>;
  //  abstract delete?(id: string): Promise<T | null>;
}
