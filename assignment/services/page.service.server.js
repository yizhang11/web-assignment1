module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    let pages = [
        { _id: "321", name: "Post 1", websiteId: "456", title: "Lorem" },
        { _id: "432", name: "Post 2", websiteId: "456", title: "Lorem" },
        { _id: "543", name: "Post 3", websiteId: "456", title: "Lorem" }
    ];

    function createPage(req, res) {
        const page = {
            _id: Math.floor(Math.random() * 1000).toString(),
            name: req.body.name,
            websiteId: req.params['websiteId'],
            title: req.body.title
        };
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].websiteId === page.websiteId && pages[i].name === page.name) {
                res.status(404).send("This page has already existed.");
                return;
            }
        }
        pages.push(page);
        res.json(page);
    }

    function findAllPagesForWebsite(req, res) {
        let websiteId = req.params.websiteId;
        let resultSet = [];
        for (let x = 0; x < pages.length; x++) {
            if (pages[x].websiteId === websiteId) {
                resultSet.push(pages[x]);
            }
        }
        res.json(resultSet);
    }

    function findPageById(req, res) {
        let pageId = req.params.pageId;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i]._id === pageId) {
                return res.json(pages[i]);
            }
        }
        res.status(404).send("Cannot find page.");
    }

    function updatePage(req, res) {
        let pageId = req.params.pageId;
        let updatedPage = req.body;
        console.log(pageId);
        for (let i = 0; i < pages.length; i++) {
            if (pages[i]._id === pageId) {
                pages[i].name = updatedPage.name;
                pages[i].title = updatedPage.title;
                res.json(pages[i]);
                return;
            }
        }
        res.status(404).send("Cannot find page");
    }

    function deletePage(req, res) {
        let pageId = req.params.pageId;
        for (let x = 0; x < pages.length; x++) {
            if (pages[x]._id === pageId) {
                res.json(pages[x]);
                pages.splice(x, 1);
                return;
            }
        }
        res.status(404).send("Cannot find page");
    }
}
