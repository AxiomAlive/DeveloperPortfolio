const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("hotels.db");


db.run(`create table if not exists users (
    id integer primary key autoincrement,
    name text not null,
    age integer not null
)`)

module.exports = {
    async addUser(dataWrapper) {
        const nextId = await new Promise((resolve, reject) => {
            db.run("insert into users (name, age) values (?, ?)", [dataWrapper.name, dataWrapper.age], function(err) {
                if(err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
        const user =  {id: nextId, ...dataWrapper};
        return user;
    },
    async getUsers() {
        try {
            const users = await new Promise((resolve, reject) => {
                db.all("select * from users", [], function(error, resultSet) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(resultSet);
                    }
                });
            });
            
            return users;
        } catch(error) {
            return null;
        }
    },
    async getUserById(id) {
       const user = await new Promise((resolve, reject) => {
            db.get("select * from users where id = ?", [id], function(err, row) {
                if(err) {
                    reject(err);
                } else{
                    resolve(row);
                }
            });
        });
        return user;
    },
    async updateUser(dataWrapper) {
        const changes = await new Promise((resolve, reject) => {
            db.run("update users set name = ?, age = ? where id = ?", [dataWrapper.name, dataWrapper.age, dataWrapper.id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });

        if (changes == 0) {
            return null;
        }

        return this.getUserById(dataWrapper.id);
    },
    async deleteUser(id) {
        const changes = await new Promise((resolve, reject) => {
            db.run("delete from users where id = ?", [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
        
        return changes > 0;
    }
};

