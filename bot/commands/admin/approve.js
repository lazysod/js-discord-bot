const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {

    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...");
    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Sorry pal, you can't do that.");
    if(!args[0]) return message.channel.send("Um....Couldn't find that user!?");
    let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) return message.channel.send("Sorry! I don\'t have permission to do that.");

    //if(!args[0]) return message.channel.send("Oh c\'mon at least gimme a hint.")
    let userRole = config.start_rank;
    let gRole = message.guild.roles.cache.find(r => r.name === userRole);
    if(!gRole) return message.reply("Couldn't find that role.");
    
    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return message.channel.send("Please supply a user to be muted!");
    let muterole = message.guild.roles.cache.find(r => r.name === "Limbo");
    mutee.roles.remove(muterole.id).then(() => {
        message.delete();
    })

    if (rMember.roles.cache.some(role => role.name === gRole)) {
        return message.reply(`Oh, looks like ${rMember} aready has that role.`);
    }else{
        await(rMember.roles.add(gRole.id));
        await(rMember.roles.remove(muterole.id));
    }

    //message.delete();
    // message.channel.send(`${rMember} was given the role ${userRole}.`).then(m => m.delete({ timeout: 5000 }));;
    try{
        rMember.send(`Congrats, you have been given the role ${userRole}`)
    }catch (e){
        message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${userRole}. We tried to DM them, but their DMs are locked.`);
    }
   /**/
   let embed = new Discord.MessageEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Add Role")
    .addField("User:", rMember)
    .addField("Moderator:", message.author.username)
    .addField("Rank:", gRole)
    .addField("Date:", message.createdAt.toLocaleString())
    let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)
}

module.exports.config = {
    name: "approve",
    description: "Gives people starting rank",
    usage: config.prefix + "approve <user>",
    accessableby: "Administrators",
    aliases: ["up"]
}