const Discord = require('discord.js');
const thisBot = new Discord.Client();
thisBot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(message.author.bot){
        //console.log('hit 1');
        return message.channel.send("Yeh, I don\'t take orders from a bot...")
    }

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        //console.log('hit 2');
        return message.reply("You have nbo access to this command.").then(m => m.delete({ timeout: 5000 }));
    }
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        //console.log('hit 4');
        return message.reply("Sorry can't help you....").then(m => m.delete({ timeout: 5000 }));
    }
   
    if(args[0]){
        var myMsg = args.slice(0).join(" ");
        message.channel.send(myMsg, {
            tts: true
           }).catch(err => message.reply(`Something went wrong... ${err}`));
    }
}

module.exports.config = {
    name: 'speak',
    description: 'make bot speak in channels',
    usage: config.prefix + "speak",
    accessableby: "Members",
    aliases: ["squak"]
}