module.exports.run = async (client, message, args, cmd, prefix) =>{
    const trophy_emoji = '<a:Trophy:834661834833002506>';
    var categories = {}
    if(args.length <=0){
        var category_items 
        for(const [key, value] of client.command_settings){
            const cmd_settings = client.command_settings.get(key);
            if(cmd_settings.isEnabled){
                if(typeof categories[cmd_settings.category] != 'undefined'){
                    category_items = categories[cmd_settings.category];
                }else{
                    category_items = [];
                }
                category_items.push(' `'+key+'`');
                categories[cmd_settings.category] = category_items;
            }
        }
        var fields_obj = [];
        for(const key in categories){
            var cat_command = categories[key]
            fields_obj.push({
                name: key,
                value: cat_command.join()
            })
        }
        const embed = {embed:{
            color: '#fa8231',
            title: `${trophy_emoji} Our Command List! ${trophy_emoji}`,
            
            fields: fields_obj,
            footer: {
                text: `Req. by ${message.author.username} | Use '${prefix}'before every command`
            }
        }}
        message.channel.send(embed)
    }else if(typeof client.aliases.get(args[0]) != 'undefined' && client.command_settings.get(client.aliases.get(args[0])).isEnabled){
        var fields_obj = [];
        var alias = ''
        const cmd_to_get = client.aliases.get(args[0]);
        
        const cmd_settings = client.command_settings.get(cmd_to_get);
        for(var i = 0; i < cmd_settings.aliases.length; i++){
            alias = alias+', `'+cmd_settings.aliases[i]+'`'
        }
        alias = alias.replace(', ', '')
        fields_obj.push({
            name: 'Description:',
            value: cmd_settings.description
        });
        fields_obj.push({
            name: 'Ussage Syntax:',
            value: `\`${prefix}${cmd_settings.syntax}\``
        });
        fields_obj.push({
            name: 'Command Aliases:',
            value: alias
        });
        fields_obj.push({
            name: 'Cooldown:',
            value: `Default cooldown: ${cmd_settings.cooldown}`
        });
        if(cmd_settings.exampleUssage != ''){
            fields_obj.push({
                name: `Example Ussage:`,
                value: `\`${prefix}${cmd_settings.exampleUssage}\``
            });
        }
        const embed = {embed:{
            color: '#fa8231',
            author:{
                name: `${prefix}${cmd} info`
            },
            fields: fields_obj,
            footer: {
                text: `Req. by ${message.author.username} | Use '${prefix}'before every command`
            }
        }};
        message.channel.send(embed);
    }else{
        message.channel.send('No such command!');
    }
}
module.exports.config = {
    name: "help",
    aliases: ['help'],
    isEnabled: true,
    description: 'Shows the list of Commands avaliable for you to use.',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 5,
    syntax: 'help [command]',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}