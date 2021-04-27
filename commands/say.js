module.exports.run = async (bot, message, args)=>{
    const msg = args.join(' ');
    const Discord = require('discord.js');
    var user_avatar = "https://cdn.discordapp.com/avatars/"+ message.author.id +"/"+message.author.avatar+".jpeg";
    var embed_color = ['#1abc9c', '#f1c40f','#2980b9','#e15f41', '#27ae60', '#2ecc71', '#e67e22','#3498db', '#16a085', '#e74c3c', '#f39c12', '#f5cd79', '#f19066'];
    const embed = new Discord.MessageEmbed()
	.setColor(embed_color[Math.floor(Math.random() * embed_color.length)])
	.setAuthor(message.author.username+" says", user_avatar)
	.setDescription(msg)
	.setTimestamp();
    message.channel.send(embed);
}
module.exports.config = {
    name: "say",
    aliases: ['say','speak'],
    isEnabled: true,
    description: '',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 0,
    syntax: 'say <message>',
    category: '<a:notSoFunny:834681596799221790> Fun <a:notSoFunny:834681596799221790>',
    guildOnly: true
}