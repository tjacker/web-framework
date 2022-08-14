import { Events } from './Events';
import { Update } from './Update';

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Events = new Events();
  public update: Update<IUserProps> = new Update<IUserProps>(rootUrl);

  constructor(private data: IUserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: IUserProps): void {
    this.data = { ...this.data, ...update };
  }
}
