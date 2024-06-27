const repository = require("../../dbRepository");

module.exports = async (req, res) => {

    const userId = parseInt(req.url.split("/")[2]);
    const user = await repository.getUserById(userId);

    if (user != null) {
        res.writeHead(200);

        res.end(JSON.stringify(user));            
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: "User not found"}));
    }
}