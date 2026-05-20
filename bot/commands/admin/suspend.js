const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;

module.exports.run = async (bot, message, args) => {
  
    if (message.member.hasPermission('MANAGE_ROLES')) {
        if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...")
        let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //Gets the user
        if (!rMember) return message.reply("That user does not exist.");
        //
        if(rMember.roles.cache.find(r => r.name === "SUSPENDED")) {
          return message.reply('User ' + rMember.user.username + ' already has that role.');
        }
        let gRole = rMember.guild.roles.cache.find(r => r.name === 'SUSPENDED'); //Gets the SUSPENDED role
        // get roles of user
        let roleList = rMember._roles;
        if (!roleList) console.log('No roles found for ' + rMember.user.username)
        if(roleList.length > 0){
          // remove all roles
          // This COULD be changed to just cycle through a pre set list of role ID's instead?
          rMember.roles.remove(rMember._roles).then(console.log('Removing role..' ));
        }
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given!"

        rMember.roles.add(gRole.id); //Adds suspended Role
        message.channel.send("User was suspended for " + reason); //Messages the channel that the user was suspended
        try {
          await rMember.send("You have been suspended on " + message.guild.name); //Tries to DM User
        } catch (e) {
          message.channel.send("We tried to DM the user to let them know, but their DM's are locked, Oh well such if life."); //Announces that their DMs are locked
        }
        // Send log to logs channel
        let embed = new Discord.MessageEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "Suspended")
        .addField("User:", rMember.user.username )
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
        let sChannel = bot.channels.cache.get(config.channel.botlog);
        sChannel.send(embed)
        // End log
      } else {
        message.channel.send("You do not have permission to use this command.");
      }
}

module.exports.config = {
    name: "suspend",
    description: "suspends a user from the guild!",
    usage: config.prefix + "suspend <user>",
    accessableby: "Administrators",
    aliases: ["unapprove"]
}