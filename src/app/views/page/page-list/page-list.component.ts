import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})

export class PageListComponent implements OnInit {

    userId: String;
    websiteId: String;
    pages: Page[] = [];
    constructor(private pageService: PageService, private activatedRoute: ActivatedRoute,
                private sharedService: SharedService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userId = params['uid'];
                this.websiteId = params['wid'];
            }
        );
        this.pageService.findPagesByWebsiteId(this.websiteId).subscribe((data: any) => {
            this.sharedService.pages = data;
            this.pages = data;
        });
    }
}
