const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    // chack for bot
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    // Has User permission to manage messages?
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("You have nbo access to this command.").then(m => m.delete({ timeout: 5000 }));
    }
   
    if(!args[0]){
        if(!args[1]){
            return message.channel.send("I have nothing to say.");
        }      
        return message.channel.send("You need to specify a channel");
    }
    // strip unwanted content from submitted channel
    var mychan = args[0].replace('<', '');
    mychan = mychan.replace('>', '');
    var mychan = mychan.replace("#", "");
    // Proceess typed or hashtag selected channel name
    if(isNaN(mychan)){
        var targetChannel = bot.channels.cache.find(r => r.name === mychan);
    }else{
        var targetChannel = bot.channels.cache.get(mychan);
    }
    // Error out if we can't find the channel
    if(!targetChannel){
        message.reply("Sorry I can't find that channel");
        console.log('Error: Unable to find channel ' + mychan);
    }
    // send output
    var myMsg = args.slice(1).join(" ");
    targetChannel.send(myMsg)
}

module.exports.config = {
    name: 'say',
    description: 'make bot speak in other channels',
    usage: config.prefix + "say <channel name> <content>",
    accessableby: "Admins",
    aliases: ["sp"]
}