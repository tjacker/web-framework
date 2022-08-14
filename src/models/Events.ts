type Callback = () => void;

interface IEvents {
  [key: string]: Callback[];
}

export class Events {
  private eventsCollection: IEvents = {};

  on(eventName: string, callback: Callback): void {
    const handlers = this.eventsCollection[eventName] || [];

    handlers.push(callback);
    this.eventsCollection[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.eventsCollection[eventName];

    if (!handlers) {
      return;
    }

    handlers.forEach((callback: Callback) => {
      callback();
    });
  }
}
