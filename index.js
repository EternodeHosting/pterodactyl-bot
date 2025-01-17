const Discord = require('discord.js'),
    bot = new Discord.Client({
        presence: {
            status: "online",
            afk: false,
            activities: [{
                name: "Trisout Hosting",
                type: 0
            }]
        },
        intents: 1991 + 32768,
    }),
    bdd = require('./bdd/bdd.json');
const ptero = require("pteroly");

bot.slashCommands = new Discord.Collection();
bot.Admin = ptero.Admin;
bot.Admin.login(bdd.ptero.HOST_PANEL_URL, bdd.ptero.YOUR_ADMIN_API_KEY, (loggedIn, errorMsg) => {
    console.log('Panel up:' + loggedIn);
    if (!loggedIn) console.error(errorMsg);
});
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

require("./handler")(bot);
console.log("Bot is Ready");

module.exports = bot;

bot.login(bdd.token);