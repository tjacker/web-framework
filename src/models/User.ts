import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { EventCallback, Events } from './Events';
import { Update } from './Update';

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public attributes: Attributes<IUserProps>;
  public update: Update<IUserProps> = new Update<IUserProps>(rootUrl);
  public events: Events = new Events();

  constructor(userProps: IUserProps) {
    this.attributes = new Attributes<IUserProps>(userProps);
  }

  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: IUserProps): void {
    this.attributes.set(update);
    this.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.get('id');

    if (!id) {
      throw new Error('Cannot fetch without an id.');
    }

    const response: AxiosResponse = await this.update.fetch(id);
    this.set(response.data);
  }

  async save(): Promise<void> {
    const user: IUserProps = this.attributes.getAll();

    try {
      await this.update.save(user);
      this.trigger('save');
    } catch {
      this.trigger('error');
    }
  }
}
