module.exports.run = async (bot, message, args, cmd) =>{
    const Discord = require('discord.js');
    const DIG = require("discord-image-generation");
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
    let img = await new DIG.Wanted().getImage(user_avatar, '₹');
    let attach = new Discord.MessageAttachment(img, "delete.png");;
    message.channel.send(attach);
}
module.exports.config = {
    name: "wanted",
    aliases: ['wanted'],
    isEnabled: true,
    description: 'You are under arrest! HAHAHA',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 10,
    category: ':camera_with_flash: Image :camera_with_flash:',
    syntax: 'wanted [User]',
    guildOnly: true
}