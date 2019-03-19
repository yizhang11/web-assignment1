import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

    userId: String;
    websiteId: String;
    pages: Page[] = [];
    page: Page;
    constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router,
                private sharedService: SharedService) {}
    createPage() {
        this.pageService.createPage(this.websiteId, this.page).subscribe((page: Page) => {
            console.log('create page: ' + page._id + ' ' + page.name);
            this.page = page;
            this.pageService.findPagesByWebsiteId(this.websiteId).subscribe((data: any) => {
                this.sharedService.pages = data;
            });
        });
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userId = params['uid'];
                this.websiteId = params['wid'];
            }
        );
        this.page = new Page('', '', '');
    }

}
