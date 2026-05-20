const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const config = require("../../config.json");
const colours = require("../../colours.json");

module.exports.run = async (bot, message) => {

    const args = message.content.substring(config.prefix.length).split(" ");

    const objectList = [
        'a light 50lb Linux manual :blue_book:...', 
        'a light 100lb book of iTunes criticisms :blue_book:...',
        'a 1 tonne weight book of Borris Johnsoton excuses :notebook_with_decorative_cover:...', 
        'a wet fish'
    ];
    const refusals = [
        'nahh, I\'d rather not thanks!',
        'What kind of monster do you think I am? :face_with_raised_eyebrow: ',
        'hahahahahahahha, no really! Nice try... :laughing:'
    ];
    console.log(args[0]);
    const rand = Math.floor(Math.random() * objectList.length)  + 1
    if(args[0] === 'slap'){
        let userVar = message.author
        if(!args[1]){
            // No second name slap the user
            message.channel.send("\/me slaps <@" + userVar  + '> with ' + objectList[rand]);
        } else {
            // slap the user mentioned
            message.channel.send("/me slaps <@" + args[1] + '> ' + objectList[rand]);
        }
    }

}

module.exports.config = {
    name: 'slap',
    description: 'Playfully interact with users using slaps',
    usage: "$slap",
    accessableby: "Members",
    aliases: ["sl"]
}