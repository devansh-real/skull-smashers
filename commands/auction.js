module.exports.run = async (client, message, args, prefix) =>{
    var auction_man_role;
    var auction_ping_role;
    var error = false;
    var has_auctioner_role =  false;
    var query = 'SELECT auction_role_id FROM servers WHERE guild_id=\''+message.guild.id+'\'';
    const member = message.guild.members.cache.get(message.author.id);
    const { executeQuery } = require('../utils/database_query');
    const response = await executeQuery(query);
}
module.exports.config = {
    name: "auction",
    aliases: ['auction'],
    isEnabled: false,
    description: '',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 15,
    syntax: '',
    guildOnly: true
}