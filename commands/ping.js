module.exports.run = async (bot, message, args, cmd) =>{
    var pingpong = Date.now() - message.createdTimestamp + "ms";
    message.reply('pong, `' + pingpong + '`');
}
module.exports.config = {
    name: "ping",
    aliases: ['ping'],
    isEnabled: true,
    description: 'Tells you the current ping of my server.',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 40,
    syntax: 'ping',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}