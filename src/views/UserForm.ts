import { User } from '../models/User';

export class UserForm {
  constructor(public parent: HTMLElement | null, public model: User) {
    this.bindModelEvents();
  }

  bindModelEvents(): void {
    this.model.on('change', (): void => this.render());
  }

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

  bindTemplateEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      if (Object.prototype.hasOwnProperty.call(eventsMap, eventKey)) {
        fragment.querySelectorAll(selector).forEach((element) => {
          element.addEventListener(eventName, eventsMap[eventKey]);
        });
      }
    }
  }

  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindTemplateEvents(templateElement.content);

    if (this.parent) {
      this.parent.innerHTML = '';
      this.parent.append(templateElement.content);
    } else {
      throw new Error('Cannot find HTML element.');
    }
  }
}
