import { BaseCollection } from './models/BaseCollection';
import { IUserProps, User } from './models/User';

const collection = User.collection();
collection.fetch();

collection.on('change', () => {
  console.log(collection.models);
});
