const url = require("url");

const createUser = require("./createUser");
const listUsers = require("./listUsers");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");


const userRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const httpMethod = req.method;
    const path = parsedUrl.pathname;

    res.setHeader("Content-Type", "application-json");

    if (path == "/users" && httpMethod == "POST") {
        createUser(req, res);
    } else if (path == "/users" && httpMethod == "GET") {
        listUsers(req, res);
    }  else if (path.startsWith("/users/") && httpMethod == "GET") {
        getUser(req, res);
    } else if (path == "/users" && httpMethod == "PUT") {
        updateUser(req, res);
    } else if (path.startsWith("/users/") && httpMethod == "DELETE") {
        deleteUser(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: "Route not found in users"}));
    }
}

module.exports = userRoutes;