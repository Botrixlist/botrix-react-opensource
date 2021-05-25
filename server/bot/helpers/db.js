const mongoose = require("mongoose");
const chalk = require("chalk");
const settings = require("../settings/config");

module.exports = (client) => {
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family: 4,
  };
  mongoose.connect(settings.MONGO_STRING, dbOptions);
  mongoose.Promise = global.Promise;
};
