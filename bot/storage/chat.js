const Discord = require('discord.js');
const thisBot = new Discord.Client();
thisBot.commands = new Discord.Collection();
const config = require("../../config.json");

module.exports.run = async (thisBot, message, args) => {

    
    
}

module.exports.config = {
    name: 'chat',
    description: 'Display ping info',
    usage: "$chat",
    accessableby: "Members",
    aliases: ["ch"]
}