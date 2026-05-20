const Discord = require('discord.js');
const thisBot = new Discord.Client();
thisBot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (thisBot, message, args) => {
    if(message.author.bot) return;
        const embed = new Discord.MessageEmbed()
        .setTitle('**Bot Information**')
        .setColor(colours.purple_medium)
        .addField('**Name:**', thisBot.user.username)
        .addField('**Version:**', config.version)
        .addField('**Description:**', thisBot.user.username + ' is a Discord server bot created by ' + config.author + ' to enhanse and help with Discord server management.')
        .addField('**Bot Master:**', config.author)
        .addField('**Current Server:**', message.guild.name)
        .setThumbnail(thisBot.user.displayAvatarURL())
        .setFooter(`${thisBot.user.username} | Footer` );
        message.channel.send(embed);  
}

module.exports.config = {
    name: 'info',
    description: 'Display bot info',
    usage: config.prefix + "info",
    accessableby: "Members",
    aliases: ["inf"]
}