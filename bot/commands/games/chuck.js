const Discord = require("discord.js")
const axios = require("axios")
const conf = require('../../config.js');
const config = conf.config;

module.exports.run = async (Discord, message, args) => {
    if(message.author.bot) return;
    let getJoke = async() => {
        let response = await axios.get(
            "https://api.lazytools.io/get/chuck/random/"
        );
        let joke = response.data;
        return joke;
    };
    let jokeValue = await getJoke();
    message.delete();
    var delivery = [
        "",
        "here's your joke",
        "ok, try this one", 
        "ok!", 
        "hmmz, you heard this one?",
        "try this one for size!"
    ]
    message.reply(`Chuck Norris Fact: ${jokeValue.id} \n ${jokeValue.joke}`)
}

module.exports.config = {
    name: "chuck",
    description: "Tells a random chuck norris joke",
    usage: config.prefix + "chuck",
    accessableby: "everyone",
    aliases: ["No Aliasses"]
}