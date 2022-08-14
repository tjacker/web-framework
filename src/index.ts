import { User } from './models/User';

const user = User.init({ id: 1, name: 'Tim', age: 40 });

user.on('save', () => {
  console.log(user);
});

user.save();
