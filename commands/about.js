module.exports.run = async (bot, message, args, cmd) =>{
    message.channel.send('Hello! I am created by Frozen Venom⚡⚡#5011\nMy birthday is on 23 Nov 2020');
}
module.exports.config = {
    name: "about",
    aliases: ['about'],
    isEnabled: true,
    description: 'Just a command to get some info about me.',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 40,
    syntax: 'about',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}