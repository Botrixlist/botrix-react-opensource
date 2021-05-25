const db = require("../../helpers/db");
const settings = require("../../settings/config");
const chalk = require("chalk");

module.exports = async (client) => {
  db(client);

  setInterval(async () => {
    client.user.setActivity(
      `botrix.cc | ${settings.BOT_PREFIX} help | ${client.users.cache.size} Users`,
      {
        type: "WATCHING",
      }
    );
  }, 300000);

  console.log(
    chalk.greenBright("[Discord API]"),
    "Bot client is attached to the Discord API."
  );
};
