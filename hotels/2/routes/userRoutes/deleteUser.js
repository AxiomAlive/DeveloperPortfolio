const repository = require("../../dbRepository");

module.exports = async (req, res) => {
    const userId = parseInt(req.url.split("/")[2]);

    const isUserDeleted = await repository.deleteUser(userId);
    
    if (isUserDeleted) {
        res.writeHead(204);    
        res.end();
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: "User not found"}));
    }
}