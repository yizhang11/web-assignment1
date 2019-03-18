import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Widget} from '../models/widget.model.client';

@Injectable()
export  class WidgetService {
    baseUrl = environment.baseUrl;

    constructor(private _http: HttpClient) {}


    createWidget(pageId, widget: Widget) {
        const url = this.baseUrl + '/api/page/' + pageId + '/widget';
        return this._http.post(url, widget);
    }

    findWidgetsByPageId(pageId) {
        const url = this.baseUrl + '/api/page/' + pageId + '/widget';
        return this._http.get(url);
    }

    findWidgetById(widgetId) {
        const url = this.baseUrl + '/api/widget/' + widgetId;
        return this._http.get(url);
    }

    updateWidget(widgetId, widget) {
        const url = this.baseUrl + '/api/widget/' + widgetId;
        return this._http.put(url, widget);
    }

    deleteWidget(widgetId) {
        const url = this.baseUrl + '/api/widget/' + widgetId;
        return this._http.delete(url);
    }

    reorderWidgets(startIndex, endIndex, pageId) {
        const url = this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex;
        return this._http.put(url, '');
    }
}
