const Discord = require('discord.js');
const bot = new Discord.Client();
let coins = require('../../json-bin/coins.json');
const fs = require('fs');
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    //message.delete()    
    if(!args[0]) 
    return message.channel.send("You need to tell me who to pay.")
    
    if(!coins[message.author.id]){
        return message.reply("You don't have any coins!")
    }
    //
    let pUser = message.mentions.members.first() || message.guild.roles.cache.find(args[0])
    if(!pUser.id){
        return message.channel('Sorry, that\'s not a person');
    }
    // add check for user? 
    if(message.author.id == pUser)
    return message.channel.send(`Trying to pay yourself eh ${message.author.username}?, **shame on you!**!`)

    if(pUser == bot.user.id)
    return message.channel.send('Awwww I\'m flattered but I can\'t accept money!.....I mean I\'m a bot WTF do you think I\'m going to spend it on?')

    if(args[1] < 1)
    return message.channel.send(`Hey ${message.author.username}! Stop trying to be smart, you lack the practice required to be good at it.`)

    /*
        Process coins
    */
    if(!coins[pUser.id]){
        coins[pUser.id] = {
            'coins': 0
        };
    }
    
    let sCoins = coins[message.author.id].coins;

    if(sCoins < args[1]) return message.reply("Not enough coins there!");

    coins[message.author.id] = {
        'coins': sCoins - parseInt(args[1])
    };

    coins[pUser.id] = {
        'coins': pCoins + parseInt(args[1])
    };

    message.channel.send(`${message.author} has given ${pUser} ${args[1]} coins.`);
    console.dir(coins);
    fs.writeFile("./json-bin/coins.json", JSON.stringify(coins), (err) => {
        if(err)console.log(err)
        return;
    });
    
}

module.exports.config = {
    name: "pay",
    description: "Pay a user",
    usage: config.prefix + "pay <user> <ammount>",
    accessableby: "Members",
    aliases: ["No Aliasses"]
}