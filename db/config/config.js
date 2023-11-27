require("dotenv").config();
module.exports = {
    development: {
        username: "postgres",
        password: "Bruminita09",
        database: "ferreteria",
        host: "localhost",
        port: 5432,
        logging: false,
        dialect: "postgres",
    },
    production: {
        username: "postgres",
        password: "Bruminita09",
        database: "ferreteria",
        host: "localhost",
        port: 5432,
        logging: true,
        dialect: "postgres",
    },
};
