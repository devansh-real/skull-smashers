const Discord = require('discord.js');
function initial_setup(client){
    client.cooldowns = new Discord.Collection();
    return
}
function processCommand(client, message, command, cmd, args, prefix){
    const { cooldowns } = client;
    const commandSettings = client.command_settings.get(command);
    if(!commandSettings.isEnabled) return
    if(commandSettings.guildOnly && message.channel.type === 'dm') return true; // message.reply('I can\'t execute that command inside DMs!');
    
    const member = message.guild.members.cache.get(message.author.id);
    for(var i=0; i<commandSettings.requiredPerms.length;i++){
        if(!member.hasPermission(commandSettings.requiredPerms[i])){
            message.reply(`You require ${commandSettings.requiredPerms} permissions to execute this command`);
        }
    }
    if(!cooldowns.has(command)) cooldowns.set(command, new Discord.Collection());
    const now = Date.now();
    const timestamps = cooldowns.get(command);
    const cooldownAmount = commandSettings.cooldown * 1000;
    if (timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime){
            if(!message.author.id == '783017883210350602'){
                const timeLeft = (expirationTime - now) / 1000;
                if(Math.floor(timeLeft) === 0){
                    timeLeft = 1;
                }
                const embed = new Discord.MessageEmbed()
                .setAuthor('Slow Down Mate!')
                .setDescription(`**You are on Cooldown** \n You need to wait **${Math.floor(timeLeft)}** second(s) more before you can run that command again`);
                message.channel.send(embed);
                return
            }
        }else{
            timestamps.delete(message.author.id), cooldownAmount;
        }
    }
    timestamps.set(message.author.id, now);
    const commandfile = client.commands.get(command);

    commandfile.run(client, message, args, cmd, prefix);
}

module.exports = {
    processCommand,
    initial_setup
}