const { MongoClient } = require("mongodb");
const { mongoConfig, tokenSecret } = require("../config");

class MongoDB {
    static connectToMongoDB = () => {
        MongoClient.connect(mongoConfig.connectionURL).then(
            (connection) => {
                console.log("MongoDB connected")
                this.db = connection.db(mongoConfig.database);
            }
        ).catch(error => console.log(`MongoDB not connected : ${error}`));
    };
};

MongoDB.db = null

module.exports = MongoDB;
