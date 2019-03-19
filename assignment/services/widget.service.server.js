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
    const path = require('path');
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../dist/yi-project1/assets/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
        }
    })

    let upload = multer({ storage: storage });

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
        let widget = req.body;
        widget._id = Math.floor(Math.random() * 1000).toString();
        widget.pageId = req.params['pageId'];

        console.log(widget);
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
        const widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });
        if (widget) {
            console.log("find widget by id: " + widget._id);
            res.json(widget);
            return;
        } else {
            console.log("find widget by id: not found");
            res.json({});
            return;
        }
        res.status(404).send("This widget doesn't exist.");
    }

    function updateWidget (req,res) {
        let widgetId  = req.params.widgetId;
        let widget = req.body;
        console.log(widget);

        for (let i in widgets) {
            if (widgets[i]._id === widgetId) {
                switch (widgets[i].widgetType) {
                    case 'HEADER':
                    case 'TEXT':
                    case 'HTML':
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].size = widget.size;
                        res.send(widget[i]);
                        return;
                    case 'IMAGE':
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].url = widget.url;
                        widgets[i].width = widget.width;
                        res.send(widget[i]);
                        return;
                    case 'YOUTUBE':
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].url = widget.url;
                        widgets[i].width = widget.width;
                        res.send(widget[i]);
                        return;
                }
            }
        }
    }

    function deleteWidget (req,res) {
        let widgetId  = req.params.widgetId;
        for(let i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.status(200);
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

        //let baseUrl = 'http://localhost:3200';
        let baseUrl = 'https://yi-assignment1.herokuapp.com';
        const callbackUrl = baseUrl + '/user/' + userId + "/website/" + websiteId
            + "/page/" + pageId + "/widget";
        if(myFile == null) {
            res.redirect(callbackUrl + "/" + widgetId);
            return;
        }


        let originalname  = myFile.originalname; // file name on user's computer
        let filename      = myFile.filename;     // new file name in upload folder
        let path          = myFile.path;         // full path of uploaded file
        let destination   = myFile.destination;  // folder where file is saved to
        let size          = myFile.size;
        let mimetype      = myFile.mimetype;

        let url = '/assets/uploads/' + filename;
        console.log(url);

        for (let i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = url;
                widgets[i].width = width;
                res.redirect(callbackUrl + "/" + widgetId);
            }
        }
    }











};
