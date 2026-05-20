const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('../json-bin/config.json');
module.exports = bot => {
    console.log('This Bot Is Online! as ' + bot.user.username );
    bot.user.setActivity('with your mum', { type: 'PLAYING' }).catch(console.error);
    let statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${config.prefix}help command`,
        `your mum undress`,
        `over my code`
    ]
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 5000);
}