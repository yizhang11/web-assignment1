import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {SharedService} from '../../../services/shared.service.client';
import {DomSanitizer} from '@angular/platform-browser';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

    userId: String;
    websiteId: String;
    pageId: String;
    widgets: Widget[] = [];
    constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
                private sharedService: SharedService, private _sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userId = params['uid'];
                this.websiteId = params['wid'];
                this.pageId = params['pid'];
            }
        );
        this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data: any) => {
            this.sharedService.widgets = data;
            this.widgets = data;
        });
    }
    reorderWidgets(indexes) {
        // call widget service function to update widget as per index
        this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
            .subscribe();
    }

    toNumber(string) {
        return parseInt(string, 10) / 100;
    }

    convertToSafeYoutubeUrl(url) {
        const res = url.split('\/');
        let id = res[res.length - 1];
        if (id.indexOf('watch?v=') !== -1) {
            id = id.substring(8);
        }
        url = 'https://www.youtube.com/embed/' + id;
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
