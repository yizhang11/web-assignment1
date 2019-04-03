import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-widget-youtube',
    templateUrl: './widget-youtube.component.html',
    styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

    flag = false; // setting error flag as false by default
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: any;

    constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userId = params['uid'];
                this.websiteId = params['wid'];
                this.pageId = params['pid'];
                this.widgetId = params['wgid'];
            }
        );
        this.widgetService.findWidgetById(this.widgetId)
            .subscribe(
                (data: any) => {
                    this.widget = data;
                    console.log('youtube: ' + this.widget);
                },
                (error: any) => console.log(error)
            );
    }

    updateWidget() {

        // if name field is undefined then set error 'flag' to true making 'error' and 'alert' message visible
        console.log('update youtube: ' + this.widget.url);
        if (this.widget['name'] === undefined) {
            this.flag = true;
        } else {
            this.widgetService.updateWidget(this.widgetId, this.widget);
        }
    }

    deleteWidget() {

        this.widgetService.deleteWidget(this.widgetId).subscribe((data: any) => {
        });

    }

}
