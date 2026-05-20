const Discord = require("discord.js")
const conf = require('../../config.js');
const config = conf.config;

module.exports.run = async (Discord, message, args) => {
    if(message.author.bot) return;
    if(!args[0]){
        let responses = [
            "Yeh, gonna need a question there champ.",
            "Oh gimme *something* to work with at least!",
            "I can\'t reply to **nothing** now can I? I mean I know I\'m good but I got limits y'know."
        ];
        var reply = Math.floor(Math.random() * responses.length);
        message.delete();
        return message.reply(responses[reply]);
    }
    let responses = [
        "As I see it, yes.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don’t count on it.",
        "It is certain.",
        "It is decidedly so.",
        "Most likely.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Outlook good.",
        "Reply hazy, try again.",
        "Signs point to yes.",
        "Very doubtful.",
        "Without a doubt.",
        "Yes.",
        "Yes – definitely.",
        "You may rely on it.",
        "Do I look like I care?",
        "Uh? Sorry i was organising my sock drawer.",
        "As If",
        "Ask Me If I Care",
        "Dumb Question Ask Another",
        "Forget About It",
        "Get A Clue",
        "In Your Dreams",
        "Not",
        "Not A Chance",
        "Obviously",
        "Oh Please",
        "Sure",
        "That's Ridiculous",
        "Well Maybe",
        "What Do You Think?",
        "Whatever",
        "Who Cares?",
        "Yeah And I'm The Pope",
        "Yeah Right",
        "You Wish",
        "Sorry i'm washing my hair...",
        "**STOP!**.....I can't deal with the stress of making a decision like this!...",
        "You've Got To Be Kidding",        
    ];
    var reply = Math.floor(Math.random() * responses.length);
    message.reply(responses[reply]);

}

module.exports.config = {
    name: "8ball",
    description: "Funny 8ball replies",
    usage: config.prefix + "8ball <question>",
    accessableby: "everyone",
    aliases: ["8b"]
}
