const Discord = require('discord.js');
const moment = require('moment');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;
// const moment = require('moment');

module.exports.run = async (bot, message, args) => {

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to use that command")
    if(!args[0]){
        var user = message.author;
    }else{
        var user = message.mentions.members.first() || message.guild.members.cache.find(args[0])
    }

    if(!user){
        return message.channel.send('I actually don\'t know who that person is?...');
    }
    const member = message.guild.member(user);

    let game;
    if(member.presence.activities.length >=1){
        game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
    }else{
        game  = 'none';
    }
    let roleList = member._roles;
    //console.log(member.user);
    if(roleList.length > 0){
        newlist = []
        roleList.forEach((element) => {
            let roleName = member.guild.roles.cache.find(r => r.id === element)
            newlist.push(roleName.name);
        })
    }else{
        var roleBlock = 'None';
    }
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.displayAvatarURL())
        .addField(`Tag:`, `${member.user.discriminator}`, true)
        .addField("ID:", `${user.id}`, true)
        .addField("Nickname:", `${member.user.username !== null ? `${member.user.username}` : 'None?'}`, true)
        .addField("Status:", `${user.presence.status}`, true)
        .addField("In Server", message.guild.name, true)
        .addField("Game:", game, true)
        .addField("Bot:", `${member.user.bot}`, true)
        .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
        .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
        .addField("Roles:", newlist.toString(), true)
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
    message.channel.send({embed});   
}
module.exports.config = {
    name: 'userinfo',
    description: 'Display a users info',
    usage: config.prefix + "ping",
    accessableby: "Admin",
    aliases: ["ui"]
}