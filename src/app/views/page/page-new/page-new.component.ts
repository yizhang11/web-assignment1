import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  page = { _id: '', name: '', websiteId: '', description: '' };
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private pageService: PageService) { }

  createPage() {
    this.pageService.createPage(this.websiteId, this.page);
    console.log(this.page);
  }

  ngOnInit() {
    this.activatedRoute.params
        .subscribe(
            (params: any) => {
              this.userId = params['uid'];
              this.websiteId = params['wid'];
            }
        );
  }

}
