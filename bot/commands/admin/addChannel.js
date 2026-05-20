const Discord = require('discord.js');
const bot = new Discord.Client();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {

    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...");
    if(!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!");
    if(!message.member.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send("Sorry! I don\'t have permission to do that.");
    if(!args[0]) return message.channel.send("Please provide a channel name.");

    myNewChannel = args.join(' ');
    message.delete();
    let embed = new Discord.MessageEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Add Channel")
    .addField("Channel:", `<#${myNewChannel}>`)
    .addField("Moderator:", message.author.username)
    .addField("Date:", message.createdAt.toLocaleString())
    let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)

    try {
        message.guild.channels.create(myNewChannel, 'text').then(async m => {
            await m.setParent(message.channel.parent.id)
            await m.lockPermissions()
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports.config = {
    name: "addchannel",
    description: "removes user roles",
    usage: config.prefix + "addchannel <channel name>",
    accessableby: "Administrators",
    aliases: ["ac"]
}