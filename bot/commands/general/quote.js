const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
// const quote = require('../../json-bin/quotes.json');
// const quoteCount = Object.keys(quote).length;
const conf = require('../../config.js');
const config = conf.config;
const colours = config.colour;
const jbin = config.jbin;

module.exports.run = async (bot, message, jbin, path, config) => {
    const quote = require('../../json-bin/quotes.json');
    const quoteCount = Object.keys(quote).length;
    if(message.author.bot) return message.channel.send("Yeh, I don\'t take orders from a bot...");
    //message.delete();
    let userInput = message.content.split(" ");
    if(!userInput[1]) {
       // console.log('Quote is: ' + quote[2].quote);
        var rnum = Math.floor(Math.random() * quoteCount);
        message.channel.send(rnum +": " + quote[rnum].quote);
    }else{
        console.log('Quote is: ' + quote[2].quote);
        let com = userInput[1];
        if( !isNaN(com) ){
            // Get number
            if(quote.indexOf( quote[com] ) !== -1){
                message.channel.send('Oops....I cann\'t find that quote...');
            }else{
               message.channel.send(com +": " + quote[com].quote); 
            }
            
        }else{
            console.log('command: ' + com);
            switch(com) {
                case 'add':
                    // code block
                    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
                        return message.reply("You have nbo access to this command.").then(m => m.delete({ timeout: 5000 }));
                    }
                    
                    let newcontent = userInput.slice(3).join(" ");
                    if(!userInput[3]){
                        return message.reply("Ya kinda need to give me something to quote...").then(m => m.delete({ timeout: 5000 }));
                    }
                    message.channel.send('Adding " ' + newcontent + ' "');
                    quote[quoteCount] = {
                        quote: newcontent
                    }
                    fs.writeFile(__dirname + "../../../json-bin/quotes.json", JSON.stringify(quote), (err) => {
                        if(err)console.log(err)
                    });
                  break;
                case 'delete':
                    // code block
                    var delNumber = userInput[2];
                    delete quote[delNumber];
                    //
                    console.log("After removal:", quote);
                    fs.writeFile(__dirname + "../../../json-bin/quotes.json", JSON.stringify(quote), (err) => {
                        if(err)console.log(err)
                        return;
                    });
                  break;
                default:
                  // Error out possibly with instructions comment
                  return message.reply("Not sure i understand that command...");
            }
        }
    }
}

module.exports.config = {
    name: "quote",
    description: "show users balance",
    usage: config.prefix + "quote",
    accessableby: "Members",
    aliases: ["No Aliasses"]
}