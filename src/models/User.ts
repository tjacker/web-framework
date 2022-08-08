interface UserProps {
  name?: string;
  age?: number;
}

interface Events {
  [key: string]: Callback[];
}

type Callback = () => void;

export class User {
  private events: Events = {};

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    this.data = { ...this.data, ...update };
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];

    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers) {
      return;
    }

    handlers.forEach((callback: Callback) => {
      callback();
    });
  }
}
