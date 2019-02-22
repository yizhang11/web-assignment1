import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';

@Injectable()
export  class WidgetService {

    widgets: Widget[] = [
        new Widget('123', 'HEADER', '321', '2', 'GIZMODO'),
        new Widget('234', 'HEADER', '321', '4', 'Lorem ipsum'),
        new Widget('345', 'IMAGE', '321', '', 'url', '', 'http://lorempixel.com/400/200/'),
        new Widget('456', 'HTML', '321', '', '<p>Lorem ipsum</p>'),
        new Widget('567', 'HEADER', '321', '4', 'Lorem ipsum'),
        new Widget('678', 'YOUTUBE', '321', '', '', '100%', 'https://youtube/AM2Ivdi9c4E'),
        new Widget('789', 'HTML', '321', '', '<p>Lorem ipsum</p>')
    ];

    api = {
        'createWidget' : this.createWidget,
        'findWidgetsByPageId' : this.findWidgetsByPageId,
        'findWidgetById' : this.findWidgetById,
        'updateWidget' : this.updateWidget,
        'deleteWidget' : this.deleteWidget
    };

    createWidget(pageId: String, widget: Widget) {
        widget._id = Math.floor(Math.random() * 1000).toString();
        widget.pageId = pageId;
        this.widgets.push(widget);
        return widget;
    }

    findWidgetsByPageId(pageId: String) {
        const resultSet = [];
        for ( const i in this.widgets) {
            if (this.widgets[i].pageId === pageId) {
                resultSet.push(this.widgets[i]);
            }
        }
        return resultSet;
    }

    findWidgetById(widgetId: String) {
        return this.widgets.find(function (widget) {
            return widget._id === widgetId;
        });
    }

    updateWidget(widgetId: String, widget: Widget) {
        for ( const i in this.widgets ) {
            if ( this.widgets[i]._id === widgetId ) {
                switch (widget.widgetType) {
                    case 'HEADER':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].size = widget.size;
                        return true;

                    case 'IMAGE':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].url = widget.url;
                        this.widgets[i].width = widget.width;
                        return true;

                    case 'YOUTUBE':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].url = widget.url;
                        this.widgets[i].width = widget.width;
                        return true;
                }

            }
        }
        return false;
    }

    deleteWidget(widgetId: String) {
        for (const i in this.widgets) {
            if (this.widgets[i]._id === widgetId) {
                const j = +i;
                this.widgets.splice(j, 1);
            }
        }
    }
}
