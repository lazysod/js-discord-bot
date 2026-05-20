const Discord = require("discord.js");
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;


module.exports.run = async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

    if(message.author.bot) return;
        message.delete();
        let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //Gets the user
        if (!rMember) return message.reply("That user does not exist.");
        //
        if(rMember == message.author) return message.channel.send('Sorry, you can not target yourself...');
        if(rMember.roles.cache.find(r => r.name === "Muted")) {
            return message.reply('User ' + rMember.user.username + ' already has that role.');
        }
        let gRole = rMember.guild.roles.cache.find(r => r.name === 'Muted'); //Gets the SUSPENDED role

        let reason = args.slice(1).join(" ");
        if(!reason) reason = 'You have been given a time out';//"No reason given!"

        // // Remove voice 
        // let voiceRole = rMember.guild.roles.cache.find(r => r.name === 'Voice');
        // rMember.roles.remove(voiceRole.id)

        rMember.roles.add(gRole.id); //Adds suspended Role
        //message.channel.send("User was muted for " + reason); //Messages the channel that the user was suspended
        try {
        await rMember.send( reason + "  on " + message.guild.name); //Tries to DM User
        } catch (e) {
        message.channel.send("We tried to DM the user to let them know, but their DM's are locked, Oh well such if life."); //Announces that their DMs are locked
        }
        // Send log to logs channel
        let embed = new Discord.MessageEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Muted")
        .addField("User:", rMember.user.username )
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
        let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)
        // End log

}
// member.guild.roles
module.exports.config = {
    name: "mute",
    description: "Mutes a member in the discord!",
    usage: config.prefix + "mute <user> <reason>",
    accessableby: "Members",
    aliases: ["m"]
}