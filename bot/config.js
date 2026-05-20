// set config from Json File.
    var config = {};
    exports.config = require('./json-bin/config.json');
    // Get channels list from json file.
    var chList = require('./json-bin/channels.json');
    // Add to config
    exports.config.channel = chList.channel;
    // Add Ranks
    var rankList = require('./json-bin/ranks.json');
    // Add to config
    exports.config.ranks = rankList.ranks;
    // Add colours
    var color = require('./json-bin/colours.json');
    exports.config.colour = color;
    // Get token from .env file
    exports.config.token = process.env.TOKEN;