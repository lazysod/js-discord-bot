const Discord = require('discord.js');
const bot = new Discord.Client();
let coins = require('../../coins.json');
const config = require("../../config.json");


module.exports.run = async (bot, message, args) => {
    
    //message.delete()    
    
    if(!args[0]){
        const pUser = message.guild.members.cache.random();
        console.log('hit 1')
    }else{
        const pUser = message.mentions.members.first() || message.guild.roles.cache.find(args[0])
        console.log('hit 2')
    }
    

    
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")

    if(!coins[message.author.id]){
        return message.reply("You don't have any coins!")
    }
    //
    
    // add check for user? 
    if(message.author.id == pUser)
    return message.channel.send(`Trying to pay yourself eh ${message.author.username}?, **shame on you!**!`)

    if(pUser == bot.user.id)
    return message.channel.send(`Awwww I\'m flattered but you really should get out more ${message.author.username}`)

    message.channel.send('Hello ' + pUser)
    /*
        Process coins
    */

    
}

module.exports.config = {
    name: "love",
    description: "shows affinity with another user",
    usage: config.prefix + "love <user>",
    accessableby: "Members",
    aliases: ["No Aliasses"]
}