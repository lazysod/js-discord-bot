const Discord = require('discord.js');
const thisBot = new Discord.Client();
thisBot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (thisBot, message, args) => {
    if(message.author.bot) return;
        const siEmbed = new Discord.MessageEmbed()
        .setTitle('Server Info')
        .setColor(colours.purple_medium)
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Created On:**", `${message.guild.createdAt}`)
        .addField("**You Joined:**", `${message.member.joinedAt}`)
        //.addField("**Invite URL:**", `${config.invite}`)
        .setFooter(`${thisBot.user.username} | Footer` );
        message.channel.send(siEmbed);
    
}


module.exports.config = {
    name: 'serverinfo',
    description: 'Display server information',
    usage: config.prefix + "serverinfo",
    accessableby: "Members",
    aliases: ["si"]
}