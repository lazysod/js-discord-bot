const Discord = require('discord.js');
const bot = new Discord.Client();
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    
    if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

    if(!message.member.guild.me.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send("Sorry! I don\'t have permission to do that.")
     
    myNewChannel = args.join(' ');
    if(!args[0]){
        var maxNum = 6;
    }
    const rnum = Math.floor(Math.random() * maxNum) + 1;
    const url = 'http://radioapocalypse.live/rmo/'
    message.channel.send("Activating MoBot Spycam: ", {files: [url + 'mo' + rnum + '.jpg']}).then(m => m.delete({ timeout: 10000 }));



}

module.exports.config = {
    name: "randommo",
    description: "random mo pic",
    usage: config.prefix + "rmo",
    accessableby: "Administrators",
    aliases: ["rmo"]
}