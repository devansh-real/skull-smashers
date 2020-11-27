const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

const { loadCommands } = require('./utils/loadCommands');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', message => {
    if (message.author.bot) return;
    
    if (!message.content.startsWith(prefix)) return;
    
    const messageArray = message.content.split(' ');
	const cmd = messageArray[1];
    const args = messageArray.slice(2);
    


    const commandfile = client.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    commandfile.run(client, message, args);
});

 


client.login(process.env.BOT_TOKEN);
