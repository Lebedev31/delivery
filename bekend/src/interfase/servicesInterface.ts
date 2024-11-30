export interface IServices<T> {
  create?(body: T): Promise<T>;
  getAll?(): Promise<T[]>;
  getId?(id: string, property: string): Promise<T[] | T>;
  update?(id: string, body: T): Promise<T | null>;
  delete?(id: string): Promise<void>;
}
