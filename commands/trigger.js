module.exports.run = async (bot, message, args, cmd) =>{
    const Discord = require('discord.js');
    const DIG = require("discord-image-generation");
    var embed_color = ['#1abc9c', '#f1c40f','#2980b9','#e15f41', '#27ae60', '#2ecc71', '#e67e22','#3498db', '#16a085', '#e74c3c', '#f39c12', '#f5cd79', '#f19066'];
    var user;
    var user_avatar;
    if(typeof args[0] != 'undefined'){
        user = message.guild.members.cache.get(args[0].replace('<@!','').replace('>',''));
    }else{
        user = message.guild.members.cache.get(message.author.id);
    }
    if(typeof user == 'undefined'){
        message.reply('Enter a Valid User');
    }
    user_avatar = "https://cdn.discordapp.com/avatars/"+ user.id +"/"+user.user.avatar+".jpeg"; 
    let img = await new DIG.Triggered().getImage(user_avatar);
    let attach = new Discord.MessageAttachment(img, "delete.gif");;
    message.channel.send(attach)
}
module.exports.config = {
    name: "trigger",
    aliases: ['trigger', 'triggered'],
    isEnabled: true,
    description: 'I AM TRIGGEREDDD!!!!!',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 10,
    category: ':camera_with_flash: Image :camera_with_flash:',
    syntax: 'trigger [User]',
    guildOnly: true
}