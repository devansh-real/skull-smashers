const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', message => {

    var ping1 = prefix+'ping';

    var about = prefix+'about';

    var createheist = prefix+'ch';

    var ping = Date.now() - message.createdTimestamp + "ms";

    if (message.content.toLowerCase() === ping1) {

       message.channel.send('pong, `'+ping+'`');

       }else if (message.content.toLowerCase() === about) {

       message.channel.send('Hello! I am created by D.V.\nMy birthday is on 23 Nov 2020'); 


       

       }else if (message.content.toLowerCase().startsWith(createheist)) {
	       var heistmsg = message.content.toLowerCase().substring(6).split(' ');
	       message.channel.send(typeof heistmsg);
	       message.channel.send(heistmsg.length);

       }

    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
