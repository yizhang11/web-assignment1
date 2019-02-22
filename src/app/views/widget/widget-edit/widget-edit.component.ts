import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widgetId: String;
  widget: Widget;

  constructor(private activatedRoute: ActivatedRoute, private widgeService: WidgetService) { }

  ngOnInit() {
    this.activatedRoute.params
        .subscribe(
            (params: any) => {
              this.widgetId = params['wgid'];
            }
        );
    this.widget = this.widgeService.findWidgetById(this.widgetId);
  }

}
