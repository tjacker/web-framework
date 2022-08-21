import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { BaseCollection } from './BaseCollection';
import { BaseModel } from './BaseModel';
import { Events } from './Events';

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends BaseModel<IUserProps> {
  static init(user: IUserProps) {
    return new User(
      new Attributes<IUserProps>(user),
      new ApiSync<IUserProps>(rootUrl),
      new Events()
    );
  }

  static collection(): BaseCollection<User, IUserProps> {
    return new BaseCollection<User, IUserProps>(rootUrl, (json: IUserProps) => User.init(json));
  }
}
