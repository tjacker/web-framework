import { BaseAttributes } from './BaseModel';

export class Attributes<T> implements BaseAttributes<T> {
  constructor(private data: T) {}

  getAll(): T {
    return this.data;
  }

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set = (update: T): void => {
    this.data = { ...this.data, ...update };
  };
}
