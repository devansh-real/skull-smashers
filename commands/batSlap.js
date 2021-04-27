module.exports.run = async (bot, message, args, cmd) =>{
    const Discord = require('discord.js');
    const DIG = require("discord-image-generation");
    var embed_color = ['#1abc9c', '#f1c40f','#2980b9','#e15f41', '#27ae60', '#2ecc71', '#e67e22','#3498db', '#16a085', '#e74c3c', '#f39c12', '#f5cd79', '#f19066'];
    var user1;
    var user2;
    var user_avatar;
    if(typeof args[0] != 'undefined'){
        user1 = await message.guild.members.cache.get(args[0].replace('<@!','').replace('>',''));
        if(typeof args[1] != 'undefined'){
            user2 = await message.guild.members.cache.get(args[1].replace('<@!','').replace('>',''));
        }else{
            message.reply('You need to mention 2 users!');
            return
        } 
    }else{
        message.reply('You need to mention 2 users!');
        return
    }
    if(typeof user1 == 'undefined' || typeof user2 == 'undefined' ){
        message.reply('Enter Valid Users');
        return
    }
    user_avatar1 = "https://cdn.discordapp.com/avatars/"+ user1.id +"/"+user1.user.avatar+".jpeg"; 
    user_avatar2 = "https://cdn.discordapp.com/avatars/"+ user2.id +"/"+user2.user.avatar+".jpeg"; 
    let img = await new DIG.Batslap().getImage(user_avatar1, user_avatar2);
    let attach = new Discord.MessageAttachment(img, "delete.png");;
    message.channel.send(attach)
}
module.exports.config = {
    name: "batslap",
    aliases: ['batslap'],
    isEnabled: true,
    description: 'ImMA Slap Your face',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 10,
    category: ':camera_with_flash: Image :camera_with_flash:',
    syntax: 'batslap <User1> <User2>',
    guildOnly: true
}