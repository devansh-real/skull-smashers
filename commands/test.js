module.exports.run = async (bot, message, args, cmd) =>{
    
    message.channel.send('@Flash Sale 50%+ SALE!', {embed: {
        color: 1075177,
        title: 'LIGHTNING SALE: Laptop',
        thumbnail: {
            url: message.guild.iconURL(),
        },
        description: '**Description**: Use the laptop to post memes using the `postmemes` command, which can either get you bad or good reviews. Depending the review, you could earn some cash!\n' +
        '\n' +
        '**Price**: 1050 [[***65% OFF!***]](https://www.youtube.com/watch?v=tgIqecROs5M)'
      }
    })
}
module.exports.config = {
    name: "test",
    aliases: ['test'],
    isEnabled: true,
    description: 'Pings Event role',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 10,
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    syntax: 'eping <Sponsors> | <message>',
    guildOnly: true
}