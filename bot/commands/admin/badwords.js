const Discord = require("discord.js")
const fs = require('fs');
const blacklisted = require("../../json-bin/badwords.json");
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;
module.exports.run = async (bot, message, args, badwords) => {
    // bot check 
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
    if(!message.member.hasPermission(["MANAGE_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Sorry pal, you can't do that.")
    if(!args[0])return message.reply("Please supply an action")
    let action = args[0]
    if(args[0] != 'list'){
        if(!args[1])return message.reply("Please supply a word to block")        
    }
    var badword = args.slice(1).join(" ");
    if(action == 'add'){
        // add new words
        blacklisted['words'].push(badword)
        fs.writeFileSync(__dirname + "../../../badwords.json", JSON.stringify(blacklisted), (err) => {
            if(err)console.log(err)
        });
        message.reply(badword + ' added successfully to blacklist');
    }else if(action == 'delete'){
        // remove 
        var badwordsIndex = blacklisted['words'].indexOf(badword);
        //remove car from the colors array
        blacklisted['words'].splice(badwordsIndex, 1);
        fs.writeFileSync(__dirname + "../../../badwords.json", JSON.stringify(blacklisted), (err) => {
            if(err)console.log(err)
        });
        message.reply(badword + ' was removed');
    }else if(action == 'list'){
        var wordList = '';
        blacklisted['words'].forEach(listAll);
        function listAll(value, index, array) {
            wordList = wordList + value + ", "; 
        }
        let bwembed = new Discord.MessageEmbed()
        .setColor(colours.redlight)
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${message.guild.name} Banned Words`, message.guild.iconURL)
        .setDescription(wordList);
        return message.channel.send(bwembed)
    }else{
        // error here
        return message.reply("If you don't know what you're doinng just type " + config.prefix + 'help');
    }
    //
    let embed = new Discord.MessageEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Badwords")
    .addField("User:", message.author.username)
    .addField("Action:", args[0])
    .addField("Word:", badword)
    .addField("Date:", message.createdAt.toLocaleString());
    
    let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)
}

module.exports.config = {
    name: "badwords",
    description: "Add or remove badwords",
    usage: config.prefix + "badwords <add/remove/list> <word>",
    accessableby: "Administrators",
    aliases: ["bw"]
}