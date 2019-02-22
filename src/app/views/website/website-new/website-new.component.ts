import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: String;
  websiteId: String;
  website: Website;
  websites: any;

  constructor(private userService: UserService, private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  createWebsite() {
    this.websiteService.createWebsite(this.userId, this.website);
    console.log(this.website);
  }

  ngOnInit() {
    this.activatedRoute.params
        .subscribe(
            (params: any) => {
              this.userId = params['uid'];
              this.websiteId = params['wid'];
            }
        );
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    console.log(this.websites);
    this.website = new Website('', '', '', '');
  }

}
