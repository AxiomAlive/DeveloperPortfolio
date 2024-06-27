const { URLSearchParams } = require("url");
const repository = require("../../dbRepository.js");


module.exports = (req, res) => {
    let body = "";


    req.on("data", (dataChunk) => {
        body += dataChunk;
    });

    req.on("end", async () => {
        const parsedBody = new URLSearchParams(body);

        const name = parsedBody.get("name");
        const age = parseInt(parsedBody.get("age"));

        if (name != null && age != NaN) {
            const userData = {name, age};

            const newUser = await repository.addUser(userData);

            res.writeHead(201);
            res.end(JSON.stringify(newUser));
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({message: "Name and age are required fields"}));
        }
    });
};