import { AxiosResponse } from 'axios';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { BaseModel } from './BaseModel';
import { EventCallback, Events } from './Events';

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
}
