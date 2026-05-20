require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const path = require('path');
// config set up
const conf = require('./config.js');
const config = conf.config;
const colour = config.colour;
const PREFIX = config.prefix;
// end config setup
require('./util/eventHandler.js')(bot);
let coins = require('./json-bin/coins.json');
let xp = require('./json-bin/xp.json');
const warning = require('./json-bin/warning.json');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
// Start events
if(config.welcome_users === true){
    bot.on("guildMemberAdd", member => {
        schannel = bot.channels.cache.get(config.channel.welcome);
        const welcomEmbed = new Discord.MessageEmbed()
        .setTitle('**New User**')
        .setDescription(`Hey @everyone, ${member.user} has joined server!`)
        .setThumbnail(member.user.displayAvatarURL())
        schannel.send(welcomEmbed);
    });
}

// Start events
bot.on("ready", async() => {
    const cache = await bot.channels.cache;
    const channels = [...cache.keys()];
    const channel = await bot.channels.fetch(channels[channels.length - 1]); // that depends of the differents kinds of channels, if this isnt working, try different indexes
    let invite = await channel.createInvite({
      maxAge: 10 * 60 * 1000,
      maxUses: 10,
    });
    fs.writeFileSync(path.join(__dirname, 'logs/invite-log.txt'), JSON.stringify(`discord.gg/${invite.code}`, null, 2));
    console.log(`discord.gg/${invite.code}`);
});
//
fs.readdir("./commands/general/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/general/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});
// Moderator
fs.readdir("./commands/moderator/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/moderator/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});
// Admin
fs.readdir("./commands/admin/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/admin/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});
// Games
fs.readdir("./commands/games/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/games/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name);
        });
    });
});

// Handle messages
bot.on("message", async message => {

    // DM check

    /*
    if(message.channel.type == "dm") {
        let args = message.content.split(" ");
        let sChannel = bot.channels.cache.get(config.botlog);
        console.log(sChannel);
        //sChannel.send(message.author.username + ': ' + args).catch(err => console.log(err))
        if(args.includes('oi')){
            message.author.send('hello bawbag!');
        }
    }
    */
    if(message.author.bot || message.channel.type === "dm") return;
    //if(!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return; // not to work on admins
    // Start live filter
    if(config.wordFilter === true){
        if(!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"]))
        {
            let profanityUsed = false;
            //let blacklisted = ['testing123'];
            let blacklisted = require('./json-bin/badwords.json');
            blacklisted = blacklisted.words
            for (var i in blacklisted) {
                if( message.content.toLocaleLowerCase().includes(blacklisted[i].toLowerCase())) profanityUsed = true;
            }
            if(profanityUsed){
                if(!warning[message.author.id]){
                    warning[message.author.id] = {
                        count: 0
                    };
                    var warncount = 1;
                }else{
                    var warncount = warning[message.author.id].count + 1;
                }
                if(warncount > 3){
                    // kick/ban?
                    warning[message.author.id] = {
                        count: 0
                    };
                    /**/
                    fs.writeFile(path.join(__dirname, 'json-bin/warning.json'), JSON.stringify(warning), (err) => {
                        if(err)console.log(err)
                    });
                    // Kick user here
                    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to remove users it seems.")

                    // Protect server owner
                    if(message.author.id == message.guild.owner.id) return message.channel.send("Nah! I can't do that to the server owner!")
                    // protect bot owner
                    if(message.author == config.author_id) return message.channel.send("Nah! I can't do that to my master!")
                    // time to kick
                    let reason = 'Repeated language violation';
                    let uaction;
                    if(config.wordFilter_kick === true){
                        // kick
                        message.guild.member(message.author).kick({ reason: reason}).catch(err => console.log(err));
                        uaction = 'kicked';
                    } else if(config.wordFilter_ban === true) {
                        // user
                        message.guild.member(message.author).ban({ reason: reason}).catch(err => console.log(err));
                        uaction = 'banned';
                    }
                    // add admin notice
                    let warnReportEmbed2 = new Discord.MessageEmbed()
                    .setColor(colour.redlight)
                    .setAuthor(`${message.guild.name} Modlogs`)
                    .addField("Moderation:", `User ${uaction}`)
                    .addField("User:", message.author.username)
                    .addField("Reason:", `User ${uaction} by bot for constant language abuse`)
                    .addField("Date:", message.createdAt.toLocaleString());
                    let sChannel = bot.channels.cache.get(config.botlog);
                    sChannel.send(warnReportEmbed2)
                }else{
                    warning[message.author.id] = {
                        count: warning[message.author.id].count +1
                    }
                    fs.writeFile(path.join(__dirname, 'json-bin/warning.json'), JSON.stringify(warning), (err) => {
                        if(err)console.log(err)
                    });
                }
                message.delete();
                switch (warncount) {
                    case 1:
                        var warnLabel = 'first';
                        break;
                    case 2:
                        var warnLabel = 'second';
                        break;
                    case 3:
                        var warnLabel = 'last';
                        break
                }
                let warnEmbed = new Discord.MessageEmbed()
                .setTitle('Language Warning')
                .setColor(colour.red_dark)
                .setDescription(`Sorry ${message.author}, you can\'t use that word here!\n**This your ${warnLabel} warning!**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter(`${bot.user.username} | Footer` );
                message.channel.send(warnEmbed);//.then(m => m.delete({ timeout: 8000 }));
                // add admin notice
                let warnReportEmbed = new Discord.MessageEmbed()
                .setColor(colour.red_dark)
                .setAuthor(`${message.guild.name} Modlogs`)
                .addField("Moderation:", "Language Warning")
                .addField("User:", `${message.author}`)
                .addField(`Event:`, `User given ${warnLabel} language violation warning.`)
                .addField("Date:", message.createdAt.toLocaleString());
                let sChannel = bot.channels.cache.get(config.botlog);
                    sChannel.send(warnReportEmbed);
                return;
            }
        }
    }
    //
    if(config.chat_money === true){
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                coins: 0
            };
        }
        let coinAmt = Math.floor(Math.random() * 15) + 1;
        let baseAmt = Math.floor(Math.random() * 15) + 1;
        if(coinAmt === baseAmt){
            coins[message.author.id] = {
                coins: coins[message.author.id].coins + coinAmt
            };
            fs.writeFile(path.join(__dirname, 'json-bin/coins.json'), JSON.stringify(coins), (err) => {
                if(err)console.log(err)
            });
            let coinEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setColor(colour.green_light)
            .addField(":money_with_wings: ", `${coinAmt} coins added!`)
            message.channel.send(coinEmbed).then(m => m.delete({ timeout: 8000 }));
            //.then(m => m.delete({ timeout: 5000 }));
        }
    }
    if(config.chat_xp === true){
        // Start XP
        let xpAdd = Math.floor(Math.random() * 7) + 8;
        if(!xp[message.author.id]){
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvl = curlvl * 300;
        xp[message.author.id].xp = curxp + xpAdd;
        if(nxtLvl <= xp[message.author.id].xp){
            xp[message.author.id].level = curlvl + 1;
            let levelEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setColor(colour.purple_light)
            .setTitle('Level Up!')
            .addField(`⭐ ${message.author.username} is now level ${curlvl}!`)
            .setThumbnail(message.author.displayAvatarURL() )
            .addField("⭐ Level", curlvl + 1);
            message.channel.send(levelEmbed).then(m => m.delete({ timeout: 8000 }));
        }
        fs.writeFile(path.join(__dirname, 'json-bin/xp.json'), JSON.stringify(xp), (err) => {
            if(err)console.log(err)
        });
    }
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile){
        commandfile.run(bot,message,args)
    }else{
        message.channel.send('***I\'m sorry Dave! I\'m affraid I can\'t do that...***');
    }
})
bot.login(config.token);
