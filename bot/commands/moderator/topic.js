const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.reply("You don\'t have permission to set topics...").then(m => m.delete({ timeout: 5000 }));
    }

    var myTopic = args.join(' ');
    if(!myTopic) myTopic =  (`Hello from ${message.channel.name}!`)
    message.channel.setTopic(myTopic);
    message.delete({ timeout: 5000 });
    // Log action 

    let embed = new Discord.MessageEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Topic set")
    .addField("Content:", myTopic)
    .addField("Channel:", `<#${message.channel.id}>`)
    .addField("Moderator:", message.author.username)
    //.addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
    let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)
}

module.exports.config = {
    name: "topic",
    description: "Changes topic",
    usage: config.prefix + "kick",
    accessableby: "Moderators",
    aliases: ["t"]
}