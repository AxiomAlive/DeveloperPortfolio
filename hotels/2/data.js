let users = [];
let currentId = 1;

module.exports = {
    addUser(user) {
        user.id = currentId++;
        users.push(user);
    },
    getUsers() {
        return users;
    },
    getUserById() {
        return users.find(u => u.id == id);
    },
    updateUser(id, dataWrapper) {
        const indexOfUser = users.findIndex(u => u.id == id);

        if (userIndex != -1) {
            users[userIndex] = {...users[indexOfUser], ...dataWrapper};

            return users[indexOfUser];
        }
        return null;
    },
    deleteUser(id) {
        const indexOfUser = users.findIndex(u => u.id == id);

        if (userIndex != -1) {
            users.splice(indexOfUser, 1);
            return true;
        }
        return false;
    }
};