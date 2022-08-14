import { User } from './models/User';

const user = new User({ name: 'test', age: 100 });

user.events.on('change', () => {
  console.log('change');
});

user.events.trigger('change');
