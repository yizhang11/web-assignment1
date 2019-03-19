import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {SharedService} from '../../../../services/shared.service.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

    flag = false; // setting error flag as false by default
    error: string;
    alert: string;
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: Widget;
    widgets: Widget[] = [];

    constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute,
                private sharedService: SharedService) { }

    ngOnInit() {

        // initialize error and alert text
        this.error = 'Enter the name of the widget';
        this.alert = '* Enter the widget name';

        this.activatedRoute.params
            .subscribe(
                (params: any) => {
                    this.userId = params['uid'];
                    this.websiteId = params['wid'];
                    this.pageId = params['pid'];
                    this.widgetId = params['wgid'];
                    this.widgets = this.sharedService.widgets;
                }
            );
        this.widgetService.findWidgetById(this.widgetId).subscribe(
            (widget: Widget) => {
                this.widget = widget;
            }
        );
    }

    updateWidget() {

        // if name field is undefined then set error 'flag' to true making 'error' and 'alert' message visible
        if (this.widget['name'] === undefined) {
            this.flag = true;
        } else {
            this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
                (widget: Widget) => {
                    console.log('update widget header: ' + widget);
                    this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data: any) => {
                        this.sharedService.widgets = data;
                    });
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
