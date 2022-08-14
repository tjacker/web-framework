export type EventCallback = () => void;

interface IEvents {
  [key: string]: EventCallback[];
}

export class Events {
  private eventsCollection: IEvents = {};

  on = (eventName: string, callback: EventCallback): void => {
    const handlers = this.eventsCollection[eventName] || [];

    handlers.push(callback);
    this.eventsCollection[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.eventsCollection[eventName];

    if (!handlers) {
      return;
    }

    handlers.forEach((callback: EventCallback) => {
      callback();
    });
  };
}
