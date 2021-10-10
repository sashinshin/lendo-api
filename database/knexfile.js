const knex = require("knex");

const filename = process.env.NODE_ENV === 'dev' ? "./database/dbDev.sqlite3" : "./database/db.sqlite3";

const db = knex({
    client: "sqlite3",
    connection: {
        filename
    },
    useNullAsDefault: true
});

module.exports = db;
