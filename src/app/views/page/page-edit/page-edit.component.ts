import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

    userId: String;
    websiteId: String;
    pages: Page[] = [];
    pageId: String;
    page: Page;

    constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router,
                private sharedService: SharedService) {}

    updatePage() {
        this.pageService.updatePage(this.pageId, this.page).subscribe((page: Page) => {
            this.page = page;
            console.log('update page: ' + page._id + ' ' + page.name);
            this.pageService.findPagesByWebsiteId(this.websiteId).subscribe((data: any) => {
                this.sharedService.pages = data;
            });
        });
    }
    deletePage() {
        this.pageService.deletePage(this.pageId).subscribe((data: any) => (data: Page) => {
            console.log('delete page: ' + this.page._id);
            this.pageService.findPagesByWebsiteId(this.websiteId).subscribe((data: any) => {
                this.sharedService.pages = data;
            });
        });
    }

    ngOnInit() {
        this.activatedRoute.params
            .subscribe(
                (params: any) => {
                    this.userId = params['uid'];
                    this.websiteId = params['wid'];
                    this.pageId = params['pid'];
                }
            );
        this.pageService.findPageById(this.pageId).subscribe((page: Page) => {
            this.page = page;
        });
        this.pageService.findPagesByWebsiteId(this.websiteId).subscribe((data: any) => {
            this.sharedService.pages = data;
        });
        console.log(this.page);
    }

}
