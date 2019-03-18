import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {SharedService} from '../../../../services/shared.service.client';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

    flag = false; // setting error flag as false by default
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: Widget;
    widgets: Widget[] = [];

    constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute,
                private sharedService: SharedService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userId = params['uid'];
                this.websiteId = params['wid'];
                this.pageId = params['pid'];
                this.widgetId = params['wgid'];
                this.widgets = this.sharedService.widgets;
                this.widget = this.sharedService.widget;
            }
        );
    }

    updateWidget() {

        // if name field is undefined then set error 'flag' to true making 'error' and 'alert' message visible
        if (this.widget['name'] === undefined) {
            this.flag = true;
        } else {
            this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((data: any) => {
            });
            this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data: any) => {
                this.sharedService.widgets = data;
            });
        }
    }

    deleteWidget() {

        this.widgetService.deleteWidget(this.widgetId).subscribe((data: any) => {
        });
        this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data1: any) => {
            this.sharedService.widgets = data1;
        });

    }
}
