const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

const {
    loadCommands
} = require('./utils/loadCommands');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', message => {
    if (message.author.bot) return;
	console.log(message.author+' says:- '+message.content.toLowerCase());
    if (!message.content.startsWith(prefix)) return;

    if (message.content.toLowerCase() === prefix + 'ping') {
        var pingpong = Date.now() - message.createdTimestamp + "ms";
        message.channel.send('pong, `' + pingpong + '`');
    } else if (message.content.toLowerCase() === prefix + 'about') {
        message.channel.send('Hello! I am created by D.V.\nMy birthday is on 23 Nov 2020');
    } else if (message.content.toLowerCase().startsWith('pls heist') || message.content.toLowerCase().startsWith('pls bankrob')) {
        message.channel.send(message.author + ', Hey you Oversmart, Heist is disabled here and I am watching you 😑😑');
    } else if (message.content.toLowerCase().startsWith('pls rob') || message.content.toLowerCase().startsWith('pls steal')) {
        message.channel.send('You stole BASICALLY EVERYTHING LMFAO! 🤑Your payout was 9999999');
        message.channel.send('LOL dream OP!');
    } else {
        try {
            const messageArray = message.content.split(' ');
            const cmd = messageArray[1];
            const args = messageArray.slice(2);



            const commandfile = client.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
            commandfile.run(client, message, args);
        } catch (err) {
            console.log(err);
        }
    }
});




client.login(process.env.BOT_TOKEN);
