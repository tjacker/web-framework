import { IUserProps, User } from '../models/User';
import { BaseView } from './BaseView';

export class UserForm extends BaseView<User, IUserProps> {
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onUpdateNameClick = (): void => {
    const name = (this.parent?.querySelector('#userName') as HTMLInputElement).value;

    this.model.set({ name });
  };

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#setRandomAge': this.onSetAgeClick,
      'click:#updateName': this.onUpdateNameClick,
    };
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>
          <p>User name: ${this.model.get('name')}</p>
          <p>User age: ${this.model.get('age')}</p>
        </div>

        <form>
          <div>
            <label for="userName">Name:</label>
            <input type="text" id="userName" name="userName" />
            <button type="button" id="updateName">Update Name</button>
          </div>
          <br />
            <button type="button" id="setRandomAge">Set Random Age</button>
        </form>
      </div
    `;
  }
}
