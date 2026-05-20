const Discord = require('discord.js');
const thisBot = new Discord.Client();
thisBot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;
let xp = require('../../json-bin/xp.json');
const fs = require('fs');

module.exports.run = async (thisBot, message, args) => {
    if(message.author.bot) return;
    message.delete();
    if(config.chat_xp === false)
    return message.channel.send("I'm sorry, that command is not available right now.").then(m => m.delete({ timeout: 5000 }));
    if(args[0]){
        let targetUser = message.guild.members.get(args[0]).id;
    }else{
        let targetUser = message.author.id
    }
    //
    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = curlvl * 300;
    let difference = nxtLvl - curxp;

    const embed = new Discord.MessageEmbed()
    .setTitle(`XP Level`)
    .setColor(colours.purple_medium)
    .setAuthor(message.author.username)
    .addField("Level", curlvl, true)
    .addField("XP", curxp, true)
    .setThumbnail(message.author.displayAvatarURL() )
    .setFooter(difference + " XP til level up");
    message.channel.send(embed).then(m => m.delete({ timeout: 5000 }));
}

module.exports.config = {
    name: "level",
    description: "shows a user their XP level",
    usage: config.prefix + "level",
    accessableby: "everyone",
    aliases: ["lvl"]
}