import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget: any;

  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService) { }

  updateWidget() {
    this.widgetService.updateWidget(this.widgetId, this.widget);
    console.log(this.widget);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }

  ngOnInit() {
    this.activatedRoute.params
        .subscribe(
            (params: any) => {
              this.userId = params['uid'];
              this.websiteId = params['wid'];
              this.pageId = params['pid'];
              this.widgetId = params['wgid'];
            }
        );
    this.widget = this.widgetService.findWidgetById(this.widgetId);
  }

}
