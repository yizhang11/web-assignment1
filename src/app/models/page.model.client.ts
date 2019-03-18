export class Page {
    _id: String;
    name: String;
    websiteId: String;
    title: String;

    constructor(name, websiteId, title) {
        this.name = name;
        this.websiteId = websiteId;
        this.title = title;
    }
}
