import { BaseModel, IBaseData } from '../models/BaseModel';

export abstract class BaseView<T extends BaseModel<K>, K extends IBaseData> {
  abstract template(): string;

  regions: { [key: string]: HTMLElement } = {};

  constructor(public parent: HTMLElement | null, public model: T) {
    this.bindModelEvents();
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  onRender(): void {}

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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (const regionKey in regionsMap) {
      if (Object.prototype.hasOwnProperty.call(regionsMap, regionKey)) {
        const selector = regionsMap[regionKey];
        const element = fragment.querySelector<HTMLElement>(selector);

        if (element) {
          this.regions[regionKey] = element;
        }
      }
    }
  }

  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindTemplateEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    if (this.parent) {
      this.parent.innerHTML = '';
      this.parent.append(templateElement.content);
    } else {
      throw new Error('Cannot find HTML element.');
    }
  }
}
