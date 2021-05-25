export default async function sanitize(bot: any) {

  if (bot.length >= 0) {
    bot = await bot.map((bot_: any) => {
      let cleanBot = {
        username: bot_.username,
        botid: bot_.botid,
        botTags: bot_.botTags,
        botLibrary: bot_.botLibrary,
        certified: bot_.certified,
        votes: bot_.votes,
        logo: bot_.logo,
        invite: bot_.invite,
        description: bot_.description,
        long: bot_.long,
        prefix: bot_.prefix,
        state: bot_.state,
        website: bot_.website,
        owners: bot_.owners,
        servers: bot_.servers,
        shards: bot_.shards,
        users: bot_.users,
        nsfw: bot_.nsfw,
        bannerURL: bot_.bannerURL,
        badges: bot_.badges,
        vanity: bot_.vanity,
      };

      return cleanBot;
    });

    return bot;
  } else {
    let cleanBot = {
      username: bot.username,
      botid: bot.botid,
      botTags: bot.botTags,
      botLibrary: bot.botLibrary,
      certified: bot.certified,
      votes: bot.votes,
      logo: bot.logo,
      invite: bot.invite,
      description: bot.description,
      long: bot.long,
      prefix: bot.prefix,
      state: bot.state,
      website: bot.website,
      owners: bot.owners,
      servers: bot.servers,
      shards: bot.shards,
      users: bot.users,
      nsfw: bot.nsfw,
      bannerURL: bot.bannerURL,
      badges: bot.badges,
      vanity: bot.vanity,
    };

    return cleanBot;
  }
}
