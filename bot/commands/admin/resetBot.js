const Discord = require("discord.js")
const conf = require('../../config.js');
const botConfig = conf.config;
const colours = botConfig.colour;

module.exports.run = async (bot, message, args) => {
    // bot check 
    if(message.author.bot ) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    if(message.author.id === message.guild.owner.id || (message.author.id === botConfig.author_id)){
        // send channel a message that you're resetting bot [optional]
        var reason = 'Hold on to your hats, gonna try a reboot!';
        message.channel.send(reason)
        .then(msg => bot.destroy());
        
        setTimeout(function(){ 
            bot.login(botConfig.token)
            console.log('Reboot success')
            message.channel.send('Reboot complete...')
        }, 5000);        
    }else{
        return message.channel.send('Sorry, Only guild owner or bot owner can issue that command.');
    }




}

module.exports.config = {
    name: "resetBot",
    description: "resets the bot",
    usage: botConfig.prefix + "reset",
    accessableby: "Administrators",
    aliases: ["reset"]
}