import { BaseModel } from '../models/BaseModel';

export abstract class BaseView<T extends BaseModel<K>, K> {
  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  constructor(public parent: HTMLElement | null, public model: T) {
    this.bindModelEvents();
  }

  bindModelEvents(): void {
    this.model.on('change', (): void => this.render());
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
