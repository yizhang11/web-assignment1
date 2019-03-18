import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model.client';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient) {}

    baseUrl = environment.baseUrl;

    createUser(user: User) {
        return this._http.post(this.baseUrl + '/api/user/', user);
    }

    findUserById(userId: String) {
        return this._http.get<User>(this.baseUrl + '/api/user/' + userId);
    }

    updateUser(user: User) {
        return this._http.put<User>(this.baseUrl + '/api/user/' + user._id, user);
    }

    findUserByCredential(username: String, password: String) {
        const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
        console.log(url);
        return this._http.get<User>(url);
    }

    deleteUserById(userId: String) {
        const req_url = this.baseUrl + '/api/user/' + userId;
        return this._http.delete(req_url);
    }
}

