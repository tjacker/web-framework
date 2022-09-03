import { IUserProps, User } from '../models/User';
import { BaseView } from './BaseView';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';

export class UserEdit extends BaseView<User, IUserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      userShow: '#userShow',
      userForm: '#userForm',
    };
  }

  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template(): string {
    return `
      <div>  
        <div id="userShow"></div>
        <div id="userForm"></div>
      </div>  
    `;
  }
}
