module.exports.run = async (bot, message, args, cmd) =>{
    var query = 'SELECT giveaway_ping_role_id FROM servers WHERE guild_id=\''+message.guild.id+'\'';
    const { executeQuery } = require('../utils/database_query');
    const response = await executeQuery(query);
    const role = message.guild.roles.cache.find((role) =>{
        return role.id === args[0].replace('<@&','').replace('>','');
    });
    if(typeof response['errorRaised'] == 'undefined'){
        console.log(response.toString());
        message.channel.send('Looks like Setup is incomplete try running `setup` command first');
        return
    }else{
        if(typeof role != 'undefined' && role){
            query = "UPDATE `servers` SET `giveaway_ping_role_id`=\'"+role.id+"\' WHERE guild_id='"+message.guild.id+"'";
            const response = await executeQuery(query);
            if(!response['errorRaised']){
                message.reply('Successfully set Giveaway ping role!');
                return
            }else{
                console.log(response);
                return
            }
        }else{
            message.reply('Specify a Valid role!');
            return
        }
    }
}
module.exports.config = {
    name: "setgping",
    aliases: ['setgping'],
    isEnabled: true,
    description: 'Sets Giveaway Ping role',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 10,
    category: ':tools: Setup Commands :tools:',
    syntax: 'setgping <role>',
    guildOnly: true
}