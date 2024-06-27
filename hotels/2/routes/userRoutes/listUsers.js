const repository = require("../../dbRepository");

module.exports = async (req, res) => {
    res.writeHead(200);

    const users = await repository.getUsers();
    res.end(JSON.stringify(users));
}