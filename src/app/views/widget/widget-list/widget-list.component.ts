import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgets: any;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  convertToSafeYoutubeUrl(url) {
    const res = url.split('\/');
    let id = res[res.length - 1];
    if (id.indexOf('watch?v=') !== -1) {
        id = id.substring(8);
    }
    url = 'https://www.youtube.com/embed/' + id;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toNumber(string) {
      return parseInt(string, 10) / 100;
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

    this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
  }
}
