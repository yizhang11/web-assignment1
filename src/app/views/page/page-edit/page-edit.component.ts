import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  page: Page;
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private pageService: PageService) { }

  updatePage() {
    this.pageService.updatePage(this.pageId, this.page);
    console.log(this.page);
  }

  deletePage() {
    this.pageService.deletePage(this.pageId);
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
    this.page = this.pageService.findPageById(this.pageId);
    console.log(this.page);
  }

}
