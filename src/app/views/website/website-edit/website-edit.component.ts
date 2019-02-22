import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId: String;
  user: User;
  websiteId: String;
  website: Website;
  websites: any;

  constructor(private userService: UserService, private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  updateWebsite() {
    this.websiteService.updateWebsite(this.websiteId, this.website);
    console.log(this.website);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId);
  }
  ngOnInit() {
    this.activatedRoute.params
        .subscribe(
            (params: any) => {
              this.userId = params['uid'];
              this.websiteId = params['wid'];
            }
        );
    this.user = this.userService.findUserById(this.userId);
    this.website = this.websiteService.findWebsiteById(this.websiteId);
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

}
