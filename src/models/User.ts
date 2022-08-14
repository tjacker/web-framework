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
}
