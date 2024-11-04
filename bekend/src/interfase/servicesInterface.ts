export interface IServices<T> {
  create?(body: T): Promise<T>;
  getAll?(): Promise<T[]>;
  getId?(id: string): Promise<T[] | T>;
  update?(id: string): Promise<T | null>;
  delete?(id: string): Promise<T | null>;
}
