import { IUserProps, User } from '../models/User';
import { BaseView } from './BaseView';

export class UserShow extends BaseView<User, IUserProps> {
  template(): string {
    return `
      <h1>User Form</h1>
      <div>
        <p>User name: ${this.model.get('name')}</p>
        <p>User age: ${this.model.get('age')}</p>
      </div>  
    `;
  }
}
