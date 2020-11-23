const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {
    var msg = prefix+'ping';
    if (message.content.toLowerCase() === msg) {

       message.reply('pong');

       }
    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
