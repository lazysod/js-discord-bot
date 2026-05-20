
const Discord = require('discord.js');
const bot = new Discord.Client();
const conf = require('../../config.js');
const ms = require('ms');
const config = conf.config;
const colour = config.colour;
const prefix = config.prefix;
module.exports.run = async (bot, message, args) => {

    // $poll <channel> question
    if(!args[0]){
        if(!args[1]){
            // error out if no options given?
            return message.channel.send("Do you need help?");
        }      
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("Sorry, you have no access to that command.").then(m => m.delete({ timeout: 5000 }));
    }
    let content = args.slice(0).join(" ");
    var question = content.replace(/\?.*$/g,"?");
    var optionBlock = content.replace(question, "");  
    var options = optionBlock.split(',');
    options = options.filter(item => item)

    if(question.length < 3) return message.reply("You have not asked a question").then(message  => message .delete({ timeout: 10000 }));

    // strip unwanted content from submitted channel
    if(options.length < 2){
        //return message.reply('Sorry, I need at least 2 options!');
    }
    // Option block
    // var optionBlock = '';
    // reactarray = [
    //     '👍',
    //     '👎'
    // ]
    // if(options.length === 2){
    //     let i = 0;
    //     options.forEach(function (item, index) {
    //       optionBlock += reactarray[i] + ' ' + item + "\n\n";
    //       i++;
    //     });
    // }
    // remove message
    message.delete();
    const embedPoll = new Discord.MessageEmbed()
    .setTitle(`Poll created by ${message.author.username}`)
    .setDescription(question)
    .setFooter('React to vote!')
    .setColor(colour.gold)
    let msgEmbed = await message.channel.send(embedPoll);
    await msgEmbed.react('👍')
    await msgEmbed.react('👎')
    await msgEmbed.react(':man_shrugging:')

}

module.exports.config = {
    name: "poll",
    description: "Creates an interactivbe poll",
    usage: config.prefix + "poll <question> <options>",
    accessableby: "everyone",
    aliases: ["vote"]
}