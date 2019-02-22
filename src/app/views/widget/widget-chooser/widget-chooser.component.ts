import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widget: Widget;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) { }

  createHeaderWidget() {
    this.widget.widgetType = 'HEADER';
    this.widget = this.widgetService.createWidget(this.pageId, this.widget);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', this.widget._id]);
    console.log(this.widget);
  }

  createImageWidget() {
    this.widget.widgetType = 'IMAGE';
    this.widget = this.widgetService.createWidget(this.pageId, this.widget);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', this.widget._id]);
    console.log(this.widget);
  }
  createYoutubeWidget() {
    this.widget.widgetType = 'YOUTUBE';
    this.widget = this.widgetService.createWidget(this.pageId, this.widget);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', this.widget._id]);
    console.log(this.widget);
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
    this.widget = new Widget('', '', '');

  }

}
