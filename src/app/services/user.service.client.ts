import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

    constructor() { }

    users = [
        {_id: '123', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder'  },
        {_id: '234', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley'  },
        {_id: '345', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia'  },
        {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
    ];

    api = {
        'createUser'   : this.createUser,
        'findUserById' : this.findUserById,
        'findUserByName' : this.findUserByUsername,
        'findUserByCredentials' : this.findUserByCredentials,
        'updateUser' : this.updateUser,
        'deleteUserById' : this.deleteUserById
    };

    createUser(user: any) {
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

    updateUser(userId: String, user: any) {
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

