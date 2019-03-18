import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {SharedService} from '../../../services/shared.service.client';

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

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService) { }

  createWidget(widgetType) {
    this.widget.widgetType = widgetType;
    this.widgetService.createWidget(this.pageId, this.widget).subscribe((data: any) => {
      this.widget = data;
      this.sharedService.widget = data;
      this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data1: any) => {
        this.sharedService.widgets = data1;
      });
      this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.widget._id])
    });
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
