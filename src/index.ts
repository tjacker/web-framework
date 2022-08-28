import { User } from './models/User';
import { UserForm } from './views/UserForm';

const user = User.init({ name: 'Joe', age: 29 });

const userForm = new UserForm(document.getElementById('root'), user);

userForm.render();
