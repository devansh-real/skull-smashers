module.exports.run = async (bot, message, args, cmd) =>{
    var channel;
    var reason = '';
    var number;
    var time_arg;
    const tick_emoji = '<a:tick:832636717956595732>';
    const member = message.guild.members.cache.get(message.author.id);
    if(!member.hasPermission('MANAGE_CHANNELS')){
        message.reply('You require Manage Channels permission to perform this action!')
    }
    if(args.length > 0){
        if(args[0].includes('<#') && args[0].includes('>')){
            channel = message.guild.channels.cache.get(args[0].replace('<#','').replace('>',''));
            if(!channel){
                message.channel.send('Specify a Valid Channel');
            }
            args.shift();
        }else{
            channel = message.channel;
        }
    }else{
        message.channel.send(`Specify time for slowmode!`);
        return true;
    }

    time_arg = args.shift().toLowerCase();
    if(time_arg.includes('s')){
        time_arg = time_arg.replaceAll('s','');
        number = parseInt(time_arg);
        if(time_arg == 1 ||time_arg == '1'){
            time_arg = time_arg+' Second';
        }else{
            time_arg = time_arg+' Seconds'
        }
        if(isNaN(number)){
            message.channel.send('Enter a valid time!');
            return true;
        }
    }else if(time_arg.includes('m')){
        time_arg = time_arg.replaceAll('m','');
        number = parseInt(time_arg);
        if(time_arg == 1 ||time_arg == '1'){
            time_arg = time_arg+' Minute';
        }else{
            time_arg = time_arg+' Minutes'
        }
        if(!isNaN(number)){
            number = number*60;
        }else{
            message.channel.send('Enter a valid time!');
            return true;
        }
    }else if(time_arg.includes('h')){
        time_arg = time_arg.replaceAll('h','');
        number = parseInt(time_arg);
        if(time_arg == 1 ||time_arg == '1'){
            time_arg = time_arg+' Hour';
        }else{
            time_arg = time_arg+' Hours'
        }
        if(!isNaN(number)){
            number = number*60*60;
        }else{
            message.channel.send('Enter a valid time!');
            return true;
        }
    }else{
        message.channel.send('Enter a valid time!');
        return true;
    }
    if(number>21600){
        message.channel.send('Slowmode cannot be more than 6 hours')
        return true;
    }
    if(args.length>0){
        reason = args.join(' ')
    }
    channel.setRateLimitPerUser(number, reason);
    message.channel.send(`Slowmode is now of ${time_arg}`);
    message.react(tick_emoji);
}
module.exports.config = {
    name: "slowmode",
    aliases: ['slowmode','sm'],
    isEnabled: true,
    description: 'Set Slowmode of any channel in a wink! Use this command and pass time with `s` for seconds, `m` for minutes and `h` for hours',
    requiredPerms: ['MANAGE_CHANNEL'],
    exampleUssage: 'slowmode 4h',
    optionalArgs: '',
    cooldown: 15,
    syntax: 'slowmode <time>',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}