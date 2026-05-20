const Discord = require('discord.js');
const bot = new Discord.Client();
const conf = require('../../config.js');
const config = conf.config;
const colour = config.colour;
const prefix = config.prefix;

module.exports.run = async (bot, message, args) => {
    if(message.author.bot) return;
    if(args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)
    
    if(args[0]){
        let command = args[0];
        if(bot.commands.has(command)){
            command = bot.commands.get(command);
            var SHembed = new Discord.MessageEmbed()
            .setColor(colour.cyan)
            .setAuthor(`Bot Help!`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription(`The bot prefix is: ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            message.channel.send(SHembed);
        } else {
            message.channel.send("Sorry, that is an invalid command.");
        }
    }
    if(!args[0]){
        message.delete();
        let embed = new Discord.MessageEmbed()
        .setAuthor('Help Command', message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(colour.redlight)
        .setTimestamp()
        .setDescription(`${message.author.username} check your dms!`)
        .setFooter(bot.user.username, bot.user.displayAvatarURL())

        let sembed = new Discord.MessageEmbed()
        .setColor(colour.cyan)
        .setAuthor(`Bot Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`These are the available commands for the bot!\nThebot prefix is: ${prefix}`)
        .addField(`Commands:`, "`ping` ``info`` ``serverinfo`` ``clear`` ``topic`` ``mute`` ``unmute`` ``kick`` ``addchannel`` ``addrole`` ``ban`` ``unban`` ``removerole`` ``dice`` ``8ball`` ``joke`` ``coins`` ``pay`` ``level`` ``badwords`` ``say`` ``suspend``")
        .setFooter(bot.user.username, bot.user.displayAvatarURL())
        message.channel.send(embed).then(message  => message .delete({ timeout: 10000 }));
        message.author.send(sembed)
    }
}

module.exports.config = {
    name: 'help',
    description: 'Display command help',
    usage: config.prefix + "help",
    accessableby: "Members",
    aliases: ["No Aliasses"]
}