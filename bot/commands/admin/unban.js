const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;


module.exports.run = async (bot, message, args) => { 

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You can't do that.")
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    if(!args[0]) return message.channel.send("Give me a valid ID"); 
    //This if() checks if we typed anything after "!unban"

    let bannedMember;
    //This try...catch solves the problem with the await
    try{                                                            
        bannedMember = await bot.users.fetch(args[0])
    }catch(e){
        if(!bannedMember) return message.channel.send("That's not a valid ID")
    }

    //Check if the user is not banned
    try {
            await message.guild.fetchBan(args[0])
        } catch(e){
            message.channel.send('This user is not banned.');
            return;
        }

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "..."

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I can't do that")
    message.delete()
    try {
        message.guild.members.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} was readmitted.`).then(m => m.delete({ timeout: 5000 }));

        let embed = new Discord.MessageEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "**un-banned**")
        .addField("User:", bannedMember)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
        
        let sChannel = bot.channels.cache.get(config.channel.botlog);
            sChannel.send(embed)
            //bannedMember.send(`Good news! You have been un-banned from ${message.guild.name}`)
    } catch(e) {
        console.log(e.message)
    }
}

module.exports.config = {
    name: "unban",
    description: "unban a user from the guild!",
    usage: config.prefix + "unban",
    accessableby: "Administrators",
    aliases: ["No Aliasses"]
}