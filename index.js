var env = require('./env.json'),
    InsomBot = require('insombot'),
    Discord = require("discord.js");

var mybot = new Discord.Client();
var ins = new InsomBot();

var triggers = {
    "!giphy": "Giphy",
    "!img": "Imgur",
    "!define": "Urban",
    "!test": "Test"
}

var keywords = ins.getKeywords(triggers);

mybot.on("message", function(msg)
{
    if (typeof keywords !== 'undefined' && keywords.length > 0) {
        ins.checkMessageForKeywords(msg.content, keywords, function(keyword) {
            if(keyword != 0) {
                ins.runKeywordFunction(triggers[keyword], keyword, msg, function(reply) {
                    mybot.reply(msg, reply);
                });
            }
        });
    }
});

mybot.login(env["discord_email"], env["discord_pass"]);