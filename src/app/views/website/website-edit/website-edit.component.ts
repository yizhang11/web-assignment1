import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service.client';

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

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService) { }

  updateWebsite() {
    this.website._id = this.websiteId;
    this.websiteService.updateWebsite(this.userId, this.website).subscribe((data: any) => {
      this.sharedService.websites = data;
    });
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe((data: any) => {
      this.sharedService.websites = data;
    });
  }
  ngOnInit() {
    this.websites = this.sharedService.websites;
    this.activatedRoute.params.subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
    );
  }

}
