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

  onSaveModelClick = (): Promise<void> => this.model.save();

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#setRandomAge': this.onSetAgeClick,
      'click:#updateName': this.onUpdateNameClick,
      'click:#saveModel': this.onSaveModelClick,
    };
  }

  template(): string {
    return `
      <form>
        <div>
          <label for="userName">Name:</label>
          <input type="text" id="userName" name="userName" placeholder="${this.model.get(
            'name'
          )}" />
          <button type="button" id="updateName">Update Name</button>
        </div>
        <div style="margin-top: 20px">
          <button type="button" id="setRandomAge">Set Random Age</button>
        </div>
        <div style="margin-top: 20px">
          <button type="button" id="saveModel">Save User</button>
        </div>
      </form>
    `;
  }
}
