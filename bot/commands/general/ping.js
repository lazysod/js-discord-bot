const Discord = require('discord.js');
const thisBot = new Discord.Client();
thisBot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (thisBot, message, args) => {
    if(message.author.bot) return;
    message.delete();
    const pingEmbed = new Discord.MessageEmbed()
    .setTitle('**User Ping**')
    .addField('**User Name**', message.author.username)
    .setColor(0xF1C40F)
    .addField('Ping Time: ', `${Date.now() - message.createdTimestamp}` + ' ms')
    .addField('Current Server', message.guild.name)
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter(`${thisBot.user.username} | Footer` );
    message.channel.send(pingEmbed).then(m => m.delete({ timeout: 5000 }));
    
}

module.exports.config = {
    name: 'ping',
    description: 'Display ping info',
    usage: config.prefix + "ping",
    accessableby: "Members",
    aliases: ["p"]
}