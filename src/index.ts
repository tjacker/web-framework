import { BaseCollection } from './models/BaseCollection';
import { IUserProps, User } from './models/User';
import { UserCollectionView } from './views/UserCollectionView';
import { UserEdit } from './views/UserEdit';

// Render form
// const user = User.init({ name: 'Joe', age: 29 });
// const userEdit = new UserEdit(document.getElementById('root'), user);

// userEdit.render();

// Render collection
const users = new BaseCollection('http://localhost:3000/users', (json: IUserProps) => {
  return User.init(json);
});

users.fetch();
users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    new UserCollectionView(root, users).render();
  }
});
