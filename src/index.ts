import { User } from './models/User';

const user = new User({ name: "Tim", age: 39 });

user.set({ name: "Test" });

console.log(user.get("name"));
console.log(user.get("age"));
