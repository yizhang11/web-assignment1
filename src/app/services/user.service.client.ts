import {Injectable} from '@angular/core';
import {User} from '../models/user.model.client';

@Injectable()
export class UserService {

    constructor() { }

    users: User[] = [
        new User('123', 'alice',    'alice',    'Alice',  'Wonder', ''),
        new User('234', 'bob',      'bob',      'Bob',    'Marley', ''),
        new User('345', 'charly',   'charly',   'Charly', 'Garcia', ''),
        new User('456', 'jannunzi', 'jannunzi', 'Jose',   'Annunzi', '')
    ];

    api = {
        'createUser'   : this.createUser,
        'findUserById' : this.findUserById,
        'findUserByName' : this.findUserByUsername,
        'findUserByCredentials' : this.findUserByCredentials,
        'updateUser' : this.updateUser,
        'deleteUserById' : this.deleteUserById
    };

    createUser(user: User) {
        user._id = Math.floor(Math.random() * 1000).toString();
        this.users.push(user);
        console.log(this.users);
        return user;
    }

    findUserById(userId: String) {
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x]._id === userId) {  return this.users[x]; }
        }
    }

    findUserByUsername(username: String) {
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x].username === username) {  return this.users[x]; }
        }
    }

    findUserByCredentials(username: String, password: String) {
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x].username === username && this.users[x].password === password) {  return this.users[x]; }
        }
    }

    updateUser(userId: String, user: User) {
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x]._id === userId) {
                this.users[x].firstName = user.firstName;
                this.users[x].lastName = user.lastName;
                return this.users[x];
            }
        }
    }
    deleteUserById(userId: String) {
        for (let x = 0; x < this.users.length; x++) {
            if (this.users[x]._id === userId) {
                this.users.splice(x, 1);
                break;
            }
        }
    }
}

