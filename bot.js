const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {
    var msg = prefix+'ping';
    var ping = Date.now() - message.createdTimestamp + "ms";
    if (message.content.toLowerCase() === msg) {

       message.channel.send('pong `'+ping+'`');

       }
    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
