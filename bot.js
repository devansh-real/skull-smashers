const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});
client.user.setPresence({

        status: "online",  // You can show online, idle... Do not disturb is dnd

        game: {

            name: "Today is my birthday..... I was created by D.V.",  // The message shown

            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,

        }

    });
 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
