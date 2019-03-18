import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Website} from '../models/website.model.client';


@Injectable()
export class WebsiteService {

    baseUrl = environment.baseUrl;
    constructor(private _http: HttpClient) {

    }

    findWebsiteById(websiteId: String) {
        return this._http.get(this.baseUrl + '/api/website/' + websiteId);
    }

    findWebsitesByUser(userId: String) {
        return this._http.get(this.baseUrl + '/api/user/' + userId + '/website');
    }

    createWebsite(userId, website: Website) {
        const body = {
            name: website.name,
            description: website.description,
            developerId: userId
        };
        const url = this.baseUrl + '/api/user/' + userId + '/website';
        return this._http.post(url, body);

    }

    updateWebsite(websiteId, website: Website) {
        const url = this.baseUrl + '/api/website/' + websiteId;
        const body = website;
        return this._http.put(url, body);
    }

    deleteWebsite(websiteId) {
        const url = this.baseUrl + '/api/website/' + websiteId;
        return this._http.delete(url);
    }
}
