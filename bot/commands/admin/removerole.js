const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    // bot check 
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    
    if(!message.member.hasPermission(["MANAGE_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sorry pal, you can't do that.")
    if(!args[0])return message.reply("Um....Couldn't find that user!?")
    let rMember = message.mentions.members.first() || message.guild.members.get(args[0])
    
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Specify a role!");
    
    let gRole = message.guild.roles.cache.find(r => r.name === role.trim())
    if(!gRole) return message.reply("Couldn't find that role.");
    
    if (!rMember.roles.cache.some(role => role.name === gRole.name)) {
        return message.reply(`Oh, looks like ${rMember} does not have that role.`);
    }
    
    if(rMember.roles.cache.find(r => r.name === gRole.id));
    await(rMember.roles.remove(gRole.id));
    
    message.delete();
    message.channel.send(`${rMember} had the role ${gRole} was removed.`).then(m => m.delete({ timeout: 5000 }));;
    try{
        rMember.send(`You have lost the role of ${gRole.name}`)
    }catch (e){
        message.channel.send(`<@${rMember.id}> have lost the role ${gRole.name}. We tried to DM them, but their DMs are locked.`);
    }

    let embed = new Discord.MessageEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Remove Role")
    .addField("User:", rMember)
    .addField("Moderator:", message.author.username)
    .addField("Rank:", gRole.name)
    .addField("Date:", message.createdAt.toLocaleString())
    
    let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)

}

module.exports.config = {
    name: "removeRole",
    description: "removes user roles",
    usage: config.prefix + "role <user> <role>",
    accessableby: "Administrators",
    aliases: ["rr"]
}