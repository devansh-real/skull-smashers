const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    var ping1 = prefix+'ping';

    var about = prefix+'about';

    var ping = Date.now() - message.createdTimestamp + "ms";

    if (.content.toLowerCase() === ping1) {

       message.channel.send('pong `'+ping+'`');

       }

       if (message.content.toLowerCase() === about) {

       message.channel.send('Hello! I am created by D.V. 

My birthday is on 23 Nov 2020');

       }

    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Clie
