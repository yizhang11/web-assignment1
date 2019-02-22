import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';


@Injectable()
export class PageService {

    pages: Page[] = [
        new Page('321', 'Post 1', '456', 'Lorem'),
        new Page('432', 'Post 2', '456', 'Lorem'),
        new Page('543', 'Post 3', '456', 'Lorem')
    ];

    api = {
        'createPage' : this.createPage,
        'findPagesByWebsiteId' : this.findPagesByWebsiteId,
        'findPageById' : this.findPageById,
        'updatePage' : this.updatePage,
        'deletePage' : this.deletePage
    };

    createPage(websiteId: String, page: Page) {
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

    updatePage(pageId: String, page: Page) {
        for (const i in this.pages) {
            if (this.pages[i]._id === pageId) {
                this.pages[i].name = page.name;
                this.pages[i].title = page.title;
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
