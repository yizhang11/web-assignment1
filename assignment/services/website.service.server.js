module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    let websites = [
        { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
        { _id: "234", name: "Tweeter", developerId: "456", description: "Lorem" },
        { _id: "456", name: "Gizmodo", developerId: "456", description: "Lorem" },
        { _id: "890", name: "Go", developerId: "123", description: "Lorem" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
        { _id: "678", name: "Checkers", developerId: "123", description: "Lorem" },
        { _id: "789", name: "Chess", developerId: "234", description: "Lorem" }
    ];

    function createWebsite(req, res) {
        const website = {
            _id: Math.floor(Math.random() * 1000).toString(),
            name: req.body.name,
            developerId: req.params['userId'],
            description: req.body.description
        };
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        let userId = req.params.userId;
        let resultSet = [];
        for (let x = 0; x < websites.length; x++) {
            if (websites[x].developerId === userId) {
                resultSet.push(websites[x]);
            }
        }
        res.json(resultSet);
    }

    function findWebsiteById(req, res) {
        let websiteId = req.params.websiteId;
        for (let i = 0; i < websites.length; i++) {
            if (websites[i]._id === websiteId) {
                return res.json(websites[i]);
            }
        }
        res.status(404).send("Cannot find the website");
    }

    function updateWebsite(req, res) {
        let websiteId = req.params.websiteId;
        let updatedWebsite = req.body;

        console.log("update website: " + websiteId + " " + updatedWebsite.name + " " + updatedWebsite.description);
        for (let i = 0; i < websites.length; i++) {
            if (websites[i]._id === websiteId) {
                websites[i].name = updatedWebsite.name;
                websites[i].description = updatedWebsite.description;

                res.json(updatedWebsite);
                return;
            }
        }
        res.status(404).send("Website not found!");
    }

    function deleteWebsite(req, res) {
        let websiteId = req.params.websiteId;
        for (let x = 0; x < websites.length; x++) {
            if (websites[x]._id === websiteId) {
                res.json(websites[x]);
                websites.splice(x, 1);
                return;
            }
        }
        res.status(404).send("Website with ID: " + websiteId + " cannot be found");
    }
}
