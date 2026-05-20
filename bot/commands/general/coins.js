const Discord = require('discord.js');
let coins = require('../../json-bin/coins.json');
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    message.delete();
    if(config.chat_money === false)
    return message.channel.send("I'm sorry, that command is not available right now.").then(m => m.delete({ timeout: 5000 }));
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };

    }
    let uCoins = coins[message.author.id].coins;
    let coinEmbed1 = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor(colours.green_light)
    .setDescription('Your balance is:')
    .addField(":money_with_wings: ", `${uCoins}`);
    
    message.channel.send(coinEmbed1).then(m => m.delete({ timeout: 5000 }));
    

}

module.exports.config = {
    name: "coins",
    description: "show users balance",
    usage: config.prefix + "coins",
    accessableby: "Members",
    aliases: ["coin"]
}