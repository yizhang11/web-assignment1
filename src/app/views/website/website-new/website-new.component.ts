import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: String;
  website: Website;
  websites: any;

  constructor(private userService: UserService, private websiteService: WebsiteService, private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  createWebsite() {
    this.websiteService.createWebsite(this.userId, this.website).subscribe((website: Website) => {
      this.website = website;
      this.websiteService.findWebsitesByUser(this.userId).subscribe((data: any) => {
        this.sharedService.websites = data;
      });
    });
  }

  ngOnInit() {
    this.websites = this.sharedService.websites;
    this.activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
    );
    console.log(this.websites);
    this.website = new Website('', '', '');
  }

}
