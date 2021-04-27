module.exports.run = async (client, message, args, cmd) =>{
    //var query = `UPDATE basic_variables SET \`value\`=\'${}\' WHERE name=\'dankSalesWebHooks\'`;
    const { executeQuery } = require('../utils/database_query');
    //const response = await executeQuery(query);
    var channel
    if(typeof args[0] != 'undefined'){
        channel = await message.guild.channels.cache.get(args[0].replace('<#','').replace('>',''))
    }else{
        message.reply('You need to specify a channel')
    }
    if(!channel || typeof channel == `undefined`){
        message.reply('You need to specify a valid Channel');
    }
    var role;
    if(typeof args[1] != 'undefined'){
        role = await message.guild.roles.cache.get(args[1]);
        if(typeof role == 'undefined' || !role){
            message.reply('You need to specify a valid Role');
        }
        role = role.id;
    }else{
        role = 'none';
    }
    channel.createWebhook('Dank Sales', {
        avatar: 'https://cdn.discordapp.com/attachments/835370838831398943/836117481399386122/Pngtreebusiness_people_avatar_icon_user_4815126.png',
    })
        .then(webhook => {
            client.DankSalesServers[message.guild.id] = {"webhook":{"id": webhook.id, "token": webhook.token},"pingRole": role};
            var query = `UPDATE basic_variables SET \`value\`=\'${JSON.stringify(client.DankSalesServers).replaceAll('\n', '').replaceAll(' ', '')}\' WHERE name=\'dankSalesWebHooks\'`;
            var response = executeQuery(query);
            message.channel.send(`Successfully set <#${channel.id}> for Dank sales Update!`);
        })
        .catch(err=>{
            console.log(err)
        })
}
module.exports.config = {
    name: "setdanksales",
    aliases: ['setdanksales', 'saleschannel', 'offerchannel', 'danksales'],
    isEnabled: true,
    description: 'Sets Giveaway Ping role',
    requiredPerms: ['MANAGE_SERVER', 'SEND_MESSAGES'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 30,
    category: ':tools: Setup Commands :tools:',
    syntax: 'setdanksales <channel> [ping role when deal is 50%+]',
    guildOnly: true
}