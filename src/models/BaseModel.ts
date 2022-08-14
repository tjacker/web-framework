import { AxiosPromise, AxiosResponse } from 'axios';

export type BaseEventCallback = () => void;

export interface BaseAttributes<T> {
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
}

export interface BaseSync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface BaseEvents {
  on(eventName: string, callback: BaseEventCallback): void;
  trigger(eventName: string): void;
}

export interface IBaseData {
  id?: number;
}

export class BaseModel<T extends IBaseData> {
  constructor(
    private attributes: BaseAttributes<T>,
    private sync: BaseSync<T>,
    private events: BaseEvents
  ) {}

  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.get('id');

    if (!id) {
      throw new Error('Cannot fetch without an id.');
    }

    const response: AxiosResponse = await this.sync.fetch(id);
    this.set(response.data);
  }

  async save(): Promise<void> {
    const user: T = this.attributes.getAll();

    try {
      await this.sync.save(user);
      this.trigger('save');
    } catch {
      this.trigger('error');
    }
  }
}
