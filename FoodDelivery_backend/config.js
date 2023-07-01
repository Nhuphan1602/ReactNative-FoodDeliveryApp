const config = require("./package.json").projectConfig

module.exports = {
    mongoConfig: {
        connectionURL: config.mongoConnectionURL,
        database: "foodDelivery_db",
        collections: {
            USERS: "users",
            RESTAURANTS: "restaurants",
            CARTS: "carts",
        },
    },
    serverConfig: {
        ip: config.serverIP,
        port: config.serverPort
    },
    tokenSecret: "foodDelivery_secret"
};