import { IServices } from "../interfase/servicesInterface";

export abstract class BaseServices<T> implements IServices {
  abstract create?(body: T): Promise<T>;
  abstract update?(id: string): Promise<T>;
  abstract getAll?(): Promise<T[] | []>;
  abstract getId?(id: string): Promise<T>;
  abstract delete?(id: string): Promise<T | null>;
}
