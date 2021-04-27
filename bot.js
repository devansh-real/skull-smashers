const Discord = require('discord.js');


const client = new Discord.Client();

var prefix = "ss ";

const {
    loadCommands, all_alises
} = require('./utils/loadCommands');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.command_settings = new Discord.Collection();
client.itemValue = new Discord.Collection();
client.DankSalesServers = {};
loadCommands(client);
const commad_base = require('./utils/command_base');
const {dankSalesListener} = require('./handlers/dankSalesListner');
client.on('ready', () => {
    console.log('I am ready!');
    dankSalesListener(client);
});
const {UpdateValue} = require('./utils/tradeValueChartUpdater');
const {UpdateDankSales} = require('./utils/DankSalesServersUpdater');
UpdateDankSales(client)
UpdateValue(client);
function startValueUpdate(){
    UpdateValue(client);
}
setInterval(startValueUpdate, 60000)
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
commad_base.initial_setup(client);
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().startsWith('pls heist') || message.content.toLowerCase().startsWith('pls bankrob')) {
        message.channel.send(message.author + ', Hey you Oversmart, Heist is disabled here and I am watching you 😑😑');
    } else if (message.content.toLowerCase().startsWith('pls rob') || message.content.toLowerCase().startsWith('pls steal')) {
        message.channel.send('You stole BASICALLY EVERYTHING LMFAO! 🤑Your payout was 9999999');
    }
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    
    try {
        const messageArray = message.content.split(' ');
        const args = messageArray.slice(2);
        if(messageArray.length<0) return
        const cmd = messageArray[1].toLowerCase();
        if(client.aliases.get(cmd) != 'undefined'){
            const command = client.aliases.get(cmd);
            commad_base.processCommand(client, message, command, cmd, args, prefix);
        }
    }catch(err){
        console.log(err);
    }
});




client.login('ODE4NzA5NDk1NTc5NTQxNTg0.YEcAog.Mf6EMD44_qZrPaSxdd526J7DFAw');
