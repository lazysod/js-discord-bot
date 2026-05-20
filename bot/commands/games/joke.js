const Discord = require("discord.js")
const axios = require("axios")
const conf = require('../../config.js');
const config = conf.config;

module.exports.run = async (Discord, message, args) => {
    if(message.author.bot) return;
    let getJoke = async() => {
        let response = await axios.get(
            "https://api.lazytools.io/get/dad/random/"
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
    var maxDelivery = Math.floor(Math.random() * delivery.length);
    var reaction = [
        "",
        ":drum: ",
        ":stuck_out_tongue_winking_eye:",
        ":tired_face:",
        ":yum:",
        ":laughing:",
        ":rofl:",
        ":eyes:"
    ]
    var maxReaction = Math.floor(Math.random() * reaction.length);
    message.reply(`${delivery[maxDelivery]} \n ${jokeValue.joke} \n\n ${reaction[maxReaction]}`)
}

module.exports.config = {
    name: "joke",
    description: "Tells a random joke",
    usage: config.prefix + "dice",
    accessableby: "everyone",
    aliases: ["funny"]
}