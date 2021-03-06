const { Client, Collection } = require("discord.js");
const config = require("./settings/config");
const glob = require("glob");

const client = new Client({
  fetchAllMembers: true,
  fetchAllGuilds: true,
  disableMentions: "everyone",
  compress: true,
});

client.commands = new Collection();

const commandFiles = glob.sync("./handlers/commands/**/*.js");
for (const file of commandFiles) {
  const command = require(file);
  client.commands.set(command.name, command);
}

const eventFiles = glob.sync("./handlers/events/*.js");
for (const file of eventFiles) {
  const event = require(file);
  const eventName = /\/events.(.*).js/.exec(file)[1];
  client.on(eventName, event.bind(null, client));
}

client.login(config.BOT_TOKEN);
