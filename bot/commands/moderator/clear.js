const Discord = require('discord.js');
const thisBot = new Discord.Client();
thisBot.commands = new Discord.Collection();
const conf = require('../../config.js');
const config = conf.config;

module.exports.run = async (thisBot, message, args) => {
    if(message.author.bot) return;
    if(message.deletable){
        message.delete();
    }
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply("You can't delete messages....").then(m => m.delete({ timeout: 5000 }));
    }

    if(isNaN(args[0]) || parseInt(args[0] <= 0) ){
        return message.reply("Yeh.... That's not a number? I also can't delete 0 messages by the way.").then(message  => message .delete({ timeout: 5000 }));
    }

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
        return message.reply("Sorry!... I can't delete messages.").then(m => m.delete({ timeout: 5000 }));
    }

    let deleteAmmount;

    if(parseInt(args[0]) > 100 ){
        deleteAmmount = 100;
    } else {
        deleteAmmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmmount, true)
        .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages`) ).then(m => m.delete({ timeout: 5000 }))
        .catch(err => message.reply(`Something went wrong... ${err}`));
}

module.exports.config = {
    name: 'clear',
    description: 'Clear display',
    usage: config.prefix + "clear",
    accessableby: "Members",
    aliases: ["cls", "nuke"]
}