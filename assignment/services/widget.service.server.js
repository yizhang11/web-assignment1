module.exports= function(app){

    let widgets = [
        { _id: "123", widgetType: "HEADER", name: ' ', pageId: "321", size: "2", text: "GIZMODO", url: "", width: "", height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: '' },
        { _id: "234", widgetType: "HEADER", name: ' ', pageId: "321", size: "4", text: "Lorem ipsum", url: "", width: "", height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: '' },
        { _id: "345", widgetType: "IMAGE", pageId: "321", size: "", text: "", width: "100%", url: "http://lorempixel.com/400/200/" },
        { _id: "456", widgetType: "HTML", name: 'html name', pageId: "321", size: "", text: "<p>Lorem ipsum</p>", url: "", width: "", height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: '' },
        { _id: "567", widgetType: "HEADER", name: ' ', pageId: "321", size: "4", text: "Lorem ipsum", url: "", width: "", height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: '' },
        { _id: "678", widgetType: "YOUTUBE", name: ' ', pageId: "321", size: "", text: "", url: 'https://www.youtube.com/embed/mFkli0wD4-w', width: "100%", height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: '' },
        { _id: "789", widgetType: "HTML", name: 'html name', pageId: "321", size: "", text: "<p>Lorem ipsum</p>", url: "", width: "", height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: '' }
    ];

    let multer = require('multer'); // npm install multer --save
    let upload = multer({ dest: __dirname+'/../../src/assets/uploads' });

    /* John pappy's - declare APIs at top and write functions below */

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);

    app.put("/api/page/:pageId/widget",reorderWidgets);

    //UPLOAD
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget (req,res) {
        let pageId = req.params.pageId;
        let widget = req.body;

        for (let i = 0; i < widgets.length; i++) {
            if (widgets[i].pageId === pageId && widgets[i].name === widget.name
                && widgets[i].widgetType === widget.widgetType && widgets[i]._id === widget._id) {
                res.status(404).send("This widget has already existed.");
                return;
            }
        }
        widget._id = Math.random().toString();
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage (req,res) {
        let pageId = req.params.pageId;
        let resultSet = [];
        for(let i in widgets){
            if(widgets[i].pageId === pageId){
                resultSet.push(widgets[i]);
            }
        } res.send(resultSet);
    }

    function findWidgetById (req,res) {
        let widgetId  = req.params.widgetId;
        for(let i in widgets){
            if(widgetId === widgets[i]._id){
                res.send(widgets[i]);
                break;
            }
        }
        res.status(404).send("This widget doesn't exist.");
    }

    function updateWidget (req,res) {
        let widgetId  = req.params.widgetId;
        let widget = req.body;

        for (let i in widgets) {
            if (widgets[i]._id === widgetId) {
                switch (widget.widgetType) {
                    case 'HEADER':
                    case 'TEXT':
                    case 'HTML':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].size = widget.size;
                        return;
                    case 'IMAGE':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].url = widget.url;
                        this.widgets[i].width = widget.width;
                        return;
                    case 'YOUTUBE':
                        this.widgets[i].text = widget.text;
                        this.widgets[i].url = widget.url;
                        this.widgets[i].width = widget.width;
                        return;
                }
            }
        }
        res.send(widget);
    }

    function deleteWidget (req,res) {
        let widgetId  = req.params.widgetId;
        for(let i = 0; i < this.widgets.length; i++) {
            if (this.widgets[i]._id === widgetId) {
                this.widgets.splice(i, 1);
                res.status(200).send("widget deleted");
                return;
            }
        }
        res.status(404).send("Widget doesn't exist.");
    }

    function array_swap(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            let k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    }

    function reorderWidgets(req,res) {
        let startIndex = parseInt(req.query.start);
        let endIndex = parseInt(req.query["end"]);
        array_swap(widgets, startIndex, endIndex);
        res.status(200);
    }

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */
    function uploadImage(req, res) {
        let userId = req.body.userId;
        let websiteId = req.body.websiteId;
        let pageId = req.body.pageId;


        let widgetId      = req.body.widgetId;
        let width         = req.body.width;
        let myFile        = req.file;

        if(myFile == null) {
            //res.redirect("https://yi-assignment1.herokuapp.com/user/" + userId + "/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            res.redirect("http://localhost:3200/user/" + userId + "/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }


        let originalname  = myFile.originalname; // file name on user's computer
        let filename      = myFile.filename;     // new file name in upload folder
        let path          = myFile.path;         // full path of uploaded file
        let destination   = myFile.destination;  // folder where file is saved to
        let size          = myFile.size;
        let mimetype      = myFile.mimetype;

        let url = 'assets/uploads/' + filename;
        console.log(url);

        for (let i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = url;
                widgets[i].width = width;
            }
        }
        //res.redirect("https://yi-assignment1.herokuapp.com/user/" + userId + "/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        res.redirect("http://localhost:3200/user/" + userId + "/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }











};
