export interface IServices<T> {
  create?(body: T): Promise<T | null>;
  getAll?(): Promise<T[]>;
  getId?(id: string): Promise<T>;
  update?(id: string): Promise<T | null>;
  delete?(id: string): Promise<T | null>;
}
