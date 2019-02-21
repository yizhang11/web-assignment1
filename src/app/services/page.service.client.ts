import {Injectable} from '@angular/core';


@Injectable()
export class PageService {

    pages = [
        { _id: '321', name: 'Post 1', websiteId: '456', description: 'Lorem' },
        { _id: '432', name: 'Post 2', websiteId: '456', description: 'Lorem' },
        { _id: '543', name: 'Post 3', websiteId: '456', description: 'Lorem' }
    ];

    api = {
        'createPage' : this.createPage,
        'findPagesByWebsiteId' : this.findPagesByWebsiteId,
        'findPageById' : this.findPageById,
        'updatePage' : this.updatePage,
        'deletePage' : this.deletePage
    };

    createPage(websiteId: String, page: any) {
        page._id = Math.floor(Math.random() * 1000).toString();
        page.websiteId = websiteId;
        this.pages.push(page);
        console.log(this.pages);
    }

    findPagesByWebsiteId(websiteId: String) {
        const resultSet = [];
        for ( const i in this.pages) {
            if (this.pages[i].websiteId === websiteId) {
                resultSet.push(this.pages[i]);
            }
        }
        return resultSet;
    }

    findPageById(pageId: String) {
        return this.pages.find(function (page) {
            return page._id === pageId;
        });
    }

    updatePage(pageId: String, page: any) {
        for (const i in this.pages) {
            if (this.pages[i]._id === pageId) {
                this.pages[i].name = page.name;
                this.pages[i].description = page.description;
            }
        }
    }

    deletePage(pageId: String) {
        for (const i in this.pages) {
            if (this.pages[i]._id === pageId) {
                const j = +i;
                this.pages.splice(j, 1);
            }
        }
    }
}
