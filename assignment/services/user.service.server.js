module.exports = function (app) {

    app.post("/api/user", createUser);
    app.get("/api/user?username=username", findUserByName);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    let users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonderland"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function findUserByName(req, res) {
        let username = req.query["username"];
        let user = users.find(function (user) {
            return user.username === username;
        });
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        let username = req.query["username"];
        let password = req.query["password"];
        let user = null;

        if (username && password){
            user = users.find(function (user) {
                return user.username === username && user.password === password;
            });
        }
        res.json(user);
    }

    function findUserById(req, res){
        let userId = req.params["userId"];
        let user = users.find(function (user) {
            return user._id === userId;
        });
        res.json(user);
    }

    function updateUser(req, res){
        let userId = req.params['userId'];
        let user = req.body;

        console.log(req.body);
        console.log("update user: " + userId + " " + user.firstName + " " + user.lastName);

        for(let i = 0; i < users.length; i++) {
            if (users[i]._id === userId) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;

                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("not found!");
    }

    function createUser(req, res) {
        let user = req.body;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === user["username"]) {
                res.status(404).send("This username is already exist.");
                return;
            }
        }
        user._id = Math.floor(Math.random() * 1000).toString();
        users.push(user);
        res.json(user);
    }

    function deleteUser(req, res) {
        let user = req.body;
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id === user["_id"]) {
                users.splice(i, 1);
                res.status(200).send("User deleted")
                return;
            }
        }
        res.status(404).send("User doesn't exist.");
    }


}
