import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.init({ name: 'Joe', age: 29 });

const userEdit = new UserEdit(document.getElementById('root'), user);

userEdit.render();
