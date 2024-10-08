const express = require('express');
const repository = require('../../dbRepository');

const router = express.Router();

router.put('/updateUser', async (req, res) => {
    const { id, name, age } = req.body;

    const userId = parseInt(id);
    const userAge = parseInt(age);
    
    const userData = { id: userId, name, age: userAge };

    try {
        const user = await repository.updateUser(userData);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ message: "User was not updated due to some reason" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while updating the user", error });
    }
});

module.exports = router;