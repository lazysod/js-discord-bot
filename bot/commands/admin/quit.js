const Discord = require("discord.js")
const conf = require('../../config.js');
const botConfig = conf.config;
const colours = botConfig.colour;

module.exports.run = async (bot, message, args) => {
    // bot check 
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    if(message.author.id != botConfig.author_id) return message.channel.send("Only my master can use this command!" )

    // send channel a message that you're resetting bot [optional]
    var reason = 'it\'s quitting time!..';
    message.channel.send(reason)
      
    setTimeout(function(){ 
        console.log('Quit command issued');
        process.exit(1);
     }, 5000);
}

module.exports.config = {
    name: "quit",
    description: "Stops bot from running",
    usage: botConfig.prefix + "quit",
    accessableby: "Bot Owner",
    aliases: ["die"]
}