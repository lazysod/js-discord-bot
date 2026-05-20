const Discord = require('discord.js');
const bot = new Discord.Client();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")

    // if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

    // if(!message.member.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send("Sorry! I don\'t have permission to do that.")
    if(!args[0]){
        var message_string = '**Emotional Damage!**';
    } else {
        const user = message.author.username;
        var message_string = args[0] + ' ' + user + ' just inflicted **emotional damage!**';
    }
    message.channel.send( message_string, {files: ['https://thesaltire.scot/img/emotional-damage.gif']}).then(m => m.delete({ timeout: 10000 }));
}

module.exports.config = {
    name: "damage",
    description: "emotional Damage Meme",
    usage: config.prefix + "damage",
    accessableby: "Members",
    aliases: ["edam"]
}