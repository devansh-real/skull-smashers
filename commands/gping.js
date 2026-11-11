module.exports.run = async (bot, message, args, cmd) =>{
    const { executeQuery } = require('../utils/database_query');
    var poper_emoji = '';
    var query = "SELECT `giveaway_role_id` FROM `servers` WHERE guild_id='"+message.guild.id+"'";
    var response = await executeQuery(query);
    if(typeof response['errorRaised'] == 'undefined'){
        message.channel.send('Looks like Setup is incomplete try running `setup` command first');
        return
    }else{
        response = response['result'];
        const member = await message.guild.members.cache.get(message.author.id);
        if(response[0].giveaway_role_id == 'none'){
            message.channel.send('No giveaway manager role is set')
            return
        }
        if(!member.roles.cache.has(response[0].giveaway_role_id)){
            message.channel.send('You do not have giveaway manager role!')
            return
        }
    }
    var users = `<@!${message.author.id}>`
    var msg = 'none'
    if(typeof args[0] != 'undefined'){
        users = ''
        args = args.join(' ');
        args = args.split('|');

        const user_ids = args[0].split(' ');
        
        for(var i=0; i<user_ids.length; i++){
            if(user_ids[i].includes('<@')){
                users = ', '+user_ids[i];
            }else{
                users = ', <@!'+user_ids[i]+'>';
            }
        }
        users = users.replace(', ','');
    }
    if(typeof args[1] != 'undefined'){
        msg = args[1];
    }
    var query = "SELECT `giveaway_ping_role_id` FROM `servers` WHERE guild_id='"+message.guild.id+"'";
    
    response = await executeQuery(query);
    if(typeof response['errorRaised'] == 'undefined'){
        message.channel.send('Looks like Setup is incomplete try running `setup` command first');
        return
    }else{
        response = response['result'];
        const embed_color = ['#1abc9c', '#f1c40f','#2980b9','#e15f41', '#27ae60', '#2ecc71', '#e67e22','#3498db', '#16a085', '#e74c3c', '#f39c12', '#f5cd79', '#f19066'];
        const embed = {embed:{
            color: embed_color[Math.floor(Math.random() * embed_color.length)],
            title: `Giveaway Alert!`,
            description: `**Sponsor**: ${users} \n**Message**: ${msg}`,
            footer:{
                text: 'Thank Sponsor(s) at General!'
            }
        }}
        message.channel.send(`<@&${response[0].giveaway_ping_role_id}>`, embed);
    }
}
module.exports.config = {
    name: "gping",
    aliases: ['gping'],
    isEnabled: true,
    description: 'Pings Giveaway role',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 10,
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    syntax: 'gping <Sponsors> | <message>',
    guildOnly: true
}