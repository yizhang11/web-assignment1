import {Injectable} from '@angular/core';

@Injectable()
export  class WidgetService {

    widgets = [
        { _id: '123', widgetType: 'HEADER', pageId: '321', size: 2, text: 'GIZMODO'},
        { _id: '234', widgetType: 'HEADER', pageId: '321', size: 4, text: 'Lorem ipsum'},
        { _id: '345', widgetType: 'IMAGE', pageId: '321', width: '100%',
            'url': 'http://lorempixel.com/400/200/'},
        { _id: '456', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
        { _id: '567', widgetType: 'HEADER', pageId: '321', size: 4, text: 'Lorem ipsum'},
        { _id: '678', widgetType: 'YOUTUBE', pageId: '321', width: '100%',
            url: 'https://youtube/AM2Ivdi9c4E' },
        { _id: '789', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'}
    ];

    api = {
        'createWidget' : this.createWidget,
        'findWidgetsByPageId' : this.findWidgetsByPageId,
        'findWidgetById' : this.findWidgetById,
        'updateWidget' : this.updateWidget,
        'deleteWidget' : this.deleteWidget
    };

    createWidget(pageId: String, widget: any) {
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

    updateWidget(widgetId: String, widget: any) {
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
