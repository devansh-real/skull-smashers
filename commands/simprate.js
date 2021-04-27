module.exports.run = async (bot, message, args, cmd) =>{
    const Discord = require('discord.js');
    var rateOf;
    var embed_color = ['#1abc9c', '#f1c40f','#2980b9','#e15f41', '#27ae60', '#2ecc71', '#e67e22','#3498db', '#16a085', '#e74c3c', '#f39c12', '#f5cd79', '#f19066'];
    const rate = Math.floor(Math.random() * 100);
    if(args[0]!= '' && typeof args[0]!= 'undefined'){
        rateOf = args.join(' ')+ ' is';
    }else{
        rateOf = "You are";
    }
    const embed = new Discord.MessageEmbed()
	.setColor(embed_color[Math.floor(Math.random() * embed_color.length)])
	.setAuthor('Simp rate Machine')
	.setDescription(rateOf+' '+rate+'% Simp!')
    message.channel.send(embed);
}
module.exports.config = {
    name: "simprate",
    aliases: ['simprate', 'howsimp'],
    isEnabled: true,
    description: 'Wanna test how simp you are? You can now, by this simprate Machine!',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 40,
    syntax: 'simprate',
    category: '<a:notSoFunny:834681596799221790> Fun <a:notSoFunny:834681596799221790>',
    guildOnly: true
}