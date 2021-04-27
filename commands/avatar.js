module.exports.run = async (bot, message, args, cmd) =>{
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
    var got = require('got');
    got = got("https://cdn.discordapp.com/avatars/"+ user.id +"/"+user.user.avatar+".gif")
    .then(response => {
        user_avatar = "https://cdn.discordapp.com/avatars/"+ user.id +"/"+user.user.avatar+".gif";
        const embed = {embed: {
            color: embed_color[Math.floor(Math.random() * embed_color.length)],
            title: user.user.username,
            image: {
                url: user_avatar,
            }
        }
        }
        message.channel.send(embed);
    })
    .catch(error => {
        user_avatar = "https://cdn.discordapp.com/avatars/"+ user.id +"/"+user.user.avatar+".jpeg"; 
        const embed = {embed: {
            color: embed_color[Math.floor(Math.random() * embed_color.length)],
            title: user.user.username,
            image: {
                url: user_avatar,
            }
        }
        }
        message.channel.send(embed);
    });
    //user_avatar = "https://cdn.discordapp.com/avatars/"+ user.id +"/"+user.avatar+".jpeg"; 
    
}
module.exports.config = {
    name: "avatar",
    aliases: ['avatar'],
    isEnabled: true,
    description: 'This command extracts user profile pic. for you to see.',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: 'avatar 783017883210350602',
    optionalArgs: '',
    cooldown: 15,
    syntax: 'avatar [user id or mention]',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}