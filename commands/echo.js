module.exports.run = async (bot, message, args, cmd) =>{
    var channel;
    var msg;
    const tick_emoji = '<a:tick:832636717956595732>';
    if(args.length> 0){
        if(args[0].includes('<#') && args[0].includes('>')){
            channel = bot.channels.get(args[0].replace('<#','').replace('>',''))
            args.shift();
        }else{
            channel = message.channel;
        }
        msg = args.join(' ')
        const userPerms = await guild.members.cache.get(message.author.id).permissionsIn(channel).toArray();
        if(!userPerms.includes('SEND_MESSAGES')){
            message.reply(`You dont have message access to <#${channel.id}>`);
            return true;
        }
        channel.send(msg);
        message.react(tick_emoji);
    }else{
        message.channel.send(`Specify Message to Echo`)
        return true;
    }
}
module.exports.config = {
    name: "echo",
    aliases: ['echo'],
    isEnabled: true,
    description: 'Sends Message to Specified channel, if none specified message will be sent in the same channel in which command executed.',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: 'echo 832636717956595732 Hey Whatsup!',
    optionalArgs: '',
    cooldown: 20,
    syntax: 'echo [Channel] <message>',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}