const repository = require("../../dbRepository");

const {URLSearchParams} = require("url");

module.exports = async (req, res) => {

    let requestBody = "";


    req.on("data", (dataChunk) => {
        requestBody += dataChunk;
    });

    req.on("end", async () => {
        const parsedBody = new URLSearchParams(requestBody);
        
        const userId = parseInt(parsedBody.get("id"));
        const userName = parsedBody.get("name");
        const userAge = parseInt(parsedBody.get("age"));
        const userData = {id: userId, name: userName, age: userAge};

        const user = await repository.updateUser(userData);

        if (user != null) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({message: "User was not updated due to some reason"}));
        }
    });
}