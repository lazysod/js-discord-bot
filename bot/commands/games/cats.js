const Discord = require("discord.js");
const axios = require("axios");
const conf = require('../../config.js');
const config = conf.config;

module.exports.run = async (Discord, message, args) => {
    if(message.author.bot) return;
    let getJoke = async() => {
        let response = await axios.get(
            "https://api.lazytools.io/get/cats"
        );
        var joke = response.data;
        return joke;
    };
    let jokeValue = await getJoke();
    console.log(jokeValue);
    message.reply(`Random cat fact:\n${jokeValue.fact}\n${jokeValue.image}`);
}

module.exports.config = {
    name: "cats",
    description: "Gives random cat Info",
    usage: config.prefix + "dice",
    accessableby: "everyone",
    aliases: []
}