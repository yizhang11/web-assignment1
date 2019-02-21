import {Injectable} from '@angular/core';


@Injectable()
export class WebsiteService {

    websites = [
        { _id: '123', name: 'Facebook',    developerId: '456', description: 'Lorem' },
        { _id: '234', name: 'Tweeter',     developerId: '456', description: 'Lorem' },
        { _id: '456', name: 'Gizmodo',     developerId: '456', description: 'Lorem' },
        { _id: '890', name: 'Go',          developerId: '123', description: 'Lorem' },
        { _id: '567', name: 'Tic Tac Toe', developerId: '123', description: 'Lorem' },
        { _id: '678', name: 'Checkers',    developerId: '123', description: 'Lorem' },
        { _id: '789', name: 'Chess',       developerId: '234', description: 'Lorem' }
    ];

    api = {
        'createWebsite' : this.createWebsite,
        'findWebsitesByUser' : this.findWebsitesByUser,
        'findWebsiteById' : this.findWebsiteById,
        'updateWebsite' : this.updateWebsite,
        'deleteWebsite' : this.deleteWebsite
    };

    createWebsite(userId: String, website: any) {
        website._id = Math.floor(Math.random() * 1000).toString();
        website.developerId = userId;
        this.websites.push(website);
        console.log(this.websites);
        return website;
    }

    findWebsitesByUser(userId: String) {
        const resultSet = [];
        for ( const i in this.websites) {
            if (this.websites[i].developerId === userId) {
                resultSet.push(this.websites[i]);
            }
        }
        return resultSet;
    }

    findWebsiteById(websiteId: String) {
        return this.websites.find(function (website) {
            return website._id === websiteId;
        });
    }

    updateWebsite(websiteId: String, website: any) {
        for (const i in this.websites) {
            if (this.websites[i]._id === websiteId) {
                this.websites[i].name = website.name;
                this.websites[i].description = website.description;
                break;
            }
        }
    }

    deleteWebsite(websiteId: String) {
        for (const i in this.websites) {
            if (this.websites[i]._id === websiteId) {
                const j = +i;
                this.websites.splice(j, 1);
            }
        }
    }
}
