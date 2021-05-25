const chalk = require("chalk");
const settings = require("../../settings/config");
const { Collection, MessageEmbed } = require("discord.js");
const config = require("../../settings/config");

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefix = settings.BOT_PREFIX;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.developerOnly && !config.DEV_IDS.includes(message.author.id))
    return message.reply(
      "this command can only be used by authorized developers."
    );

  if (command.staffOnly && !config.STAFF_IDS.includes(message.author.id))
    return message.reply("this command can only be used by authorized staff.");

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  if (timestamps.has(message.author.id)) {
    if (
      !settings.STAFF_IDS.includes(message.author.id) ||
      !settings.DEV_IDS.includes(message.author.id)
    ) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        let embed = new MessageEmbed()
          .setAuthor(`Botrix`, message.guild.iconURL())
          .setDescription(
            `You are currently on command cooldown, please wait \`${timeLeft}\` more seconds before reusing this command.`
          )
          .setTimestamp()
          .setColor("#fca311")
          .setFooter(
            `Requested by ${message.author.username}`,
            message.author.displayAvatarURL()
          );
        return message.reply(embed);
      }
    }
  }

  if (
    !settings.DEV_IDS.includes(message.author.id) ||
    !settings.STAFF_IDS.includes(message.author.id)
  ) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(chalk.redBright("[Command Error]"), error);
  }
};
