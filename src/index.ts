import { User } from './models/User';

const user = new User({ name: 'test', age: 100 });

user.save();
