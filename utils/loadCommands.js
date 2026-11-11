const fs = require('fs');
var alises = {};
function loadCommands(bot) {
    fs.readdir('commands/', (err, files) => {

        if (err) console.log(err);
    
        const jsfile = files.filter(f => f.split('.').pop() === 'js');
        if (jsfile.length <= 0) {
            return console.log('Bot Couldn\'t Find Commands in commands Folder.');
        }
    
        jsfile.forEach((f, i) => {
            const pull = require(`../commands/${f}`);
            console.log(`Successfully loaded ${f}`);
            bot.commands.set(pull.config.name, pull);
            let settings = {}
            if(pull.config.isEnabled == 'undefined'){
                settings['isEnabled'] = false;
            }else{
                settings['isEnabled'] = pull.config.isEnabled;
            }

            if(pull.config.description == 'undefined'){
                settings['description'] = '';
            }else{
                settings['description'] = pull.config.description;
            }

            if(pull.config.requiredPerms == 'undefined'){
                settings['requiredPerms'] = [];
            }else{
                settings['requiredPerms'] = pull.config.requiredPerms;
            }

            if(pull.config.exampleUssage == 'undefined'){
                settings['exampleUssage'] = '';
            }else{
                settings['exampleUssage'] = pull.config.exampleUssage;
            }

            if(pull.config.optionalArgs == 'undefined'){
                settings['optionalArgs'] = '';
            }else{
                settings['optionalArgs'] = pull.config.optionalArgs;
            }

            if(pull.config.syntax == 'undefined'){
                settings['syntax'] = '';
            }else{
                settings['syntax'] = pull.config.syntax;
            }

            if(pull.config.guildOnly == 'undefined'){
                settings['guildOnly'] = '';
            }else{
                settings['guildOnly'] = pull.config.guildOnly;
            }

            if(pull.config.cooldown == 'undefined'){
                settings['cooldown'] = 0;
            }else{
                settings['cooldown'] = pull.config.cooldown;
            }

            if(pull.config.aliases == 'undefined'){
                settings['aliases'] = [];
            }else{
                settings['aliases'] = pull.config.aliases;
            }

            if(pull.config.category != 'undefined'){
                settings['category'] = pull.config.category;
            }

            for(var i=0;i<pull.config.aliases.length;i++){
                bot.aliases.set(pull.config.aliases[i], pull.config.name);
            }
            
//            alises[pull.config.name] = pull.config.aliases;
            bot.command_settings.set(pull.config.name, settings);
        });
        console.log(alises);
    });
}
module.exports = {
    loadCommands,
    'all_alises': alises
}