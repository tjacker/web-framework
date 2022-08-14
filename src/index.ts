import { User } from './models/User';

const user = new User({ name: 'test', age: 100 });

console.log(user.get('name'));

user.on('change', () => {
  console.log('changed!');
});

user.trigger('change');
