const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;

module.exports.run = async (Discord, message, args) => {
    if(message.author.bot) return;
    if(!args[0]){
        var maxNum = 6;
        
    } else {
        var maxNum = args[0]; 
    }
    message.delete();
    const reply = Math.floor(Math.random() * maxNum) + 1;
    message.channel.send(`${message.author} rolls a ${reply}.`);
}

module.exports.config = {
    name: "dice",
    description: "rolls a dice",
    usage: config.prefix + "dice",
    accessableby: "everyone",
    aliases: ["roll"]
}