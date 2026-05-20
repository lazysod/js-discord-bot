const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;


module.exports.run = async (bot, message, args) => {
    // bot check 
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    
    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!kickMember) return message.channel.send("Please provide a user to ban!")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given!"
     
    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

    // Protect server owner
    if(kickMember.id == message.guild.owner.id) return message.channel.send("Nah! I can't do that to the server owner!")
    
    // protect bot owner
    if(kickMember.id == config.author_id) return message.channel.send("Nah! I can't do that to my master!")
    
    // Don't do this to administrators???
    if(kickMember.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hmmz I\'d batter not...")

    kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).then(() =>
    message.guild.member(kickMember).kick({ reason: reason})).catch(err => console.log(err))
    message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete({ timeout: 5000 }));

    let embed = new Discord.MessageEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "kick")
    .addField("User:", kickMember.user.username )
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
    let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)

}

module.exports.config = {
    name: "kick",
    description: "kicks a user from the guild!",
    usage: config.prefix + "kick",
    accessableby: "Administrators",
    aliases: ["No Aliasses"]
}