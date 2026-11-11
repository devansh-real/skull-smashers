
module.exports.run = async (bot, message, args, cmd) =>{
    var got = require('got');
    const guild  = message.guild;
    const member = guild.members.cache.get(message.author.id);
    var key;
    var query;
    if(!member.hasPermission('ADMINISTRATOR')){
        message.channel.send("You Require `Admin` perms for Setup");
        return true;
    }
    var base_url = "https://sjshsvsgsh.000webhostapp.com/db_barrier.php?";
    let collector_options = {              
        time:30000
    };
    const filter = (m) => message.author.id == m.author.id;
    var is_complete = true; 
    var iterator = 0;
    var guild_info = [];
    guild_info.push(guild.id);
    var questions = ["Moderator","Giveaway Manager", "Giveaway Ping", "heist Manager", "Heist Ping", "Event Manager", "Events Ping", "Auction Manager", "Auction Ping"];
    function wait_for_messages(message, index){
        is_complete = 'ongoing';
        message.channel.send(`What role is for ${questions[index]}? \nType \`none\` if none`);
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ['time']});
        collector.on('collect', m => {
            if(m.content == 'none'){
                guild_info.push('none');
                is_complete = true;
                return true;
            }else{
                const roleName = message.guild.roles.cache.find((role) =>{
                    return role.name === m.content;
                });
                if(!roleName){
                    const roleId = message.guild.roles.cache.find((role) =>{
                        return role.id === m.content.replace('<@&','').replace('>','');
                    });
                    if(!roleId){
                        message.reply(`No role named \`${m.content}\`, Setup canceled!`);
                        is_complete ='cancel';
                        return
                    }else{
                        guild_info.push(m.content.replace('<@&','').replace('>',''));
                        is_complete = true;
                        return true;
                    }
                }else{
                    guild_info.push(roleName.id);
                    is_complete = true; 
                    return true;
                }
            }
                
        });
        collector.on('time', collected => {
            message.channel.send(`No reply. Setup Canceled`)
            return 'cancel';
        });
    }
    function insert_query(){
        var got = require('got');
        got = got(`${base_url}key=${key}&query=${encodeURIComponent(query)}`)
        .then(response => {
            if(response.body.includes('affected_rows: 1')){
                message.channel.send('Setup Completed');
            }else{
                message.channel.send('Looks like our server is unreachable.');
            }
           
        })
        .catch(error => {
            console.log(error.response.body);
            message.channel.send('Looks like our server is unreachable.');
        });
        return true;
    }

    function send_Data(){
        var got = require('got');
        key = 'asdfghjwerfghjyrfdvbjuy6rfvyrjf123456dfgh';
        query = 'SELECT guild_id FROM servers WHERE guild_id=\''+guild.id+'\'';
        got = got(`${base_url}key=${key}&query=${encodeURIComponent(query)}`)
            .then(response => {
                if(response.body.includes(guild.id)== false){
                    query = `INSERT INTO \`servers\`(\`guild_id\`, \`moderator_role_id\`, \`giveaway_role_id\`, \`giveaway_ping_role_id\`, \`heist_role_id\`, \`heist_ping_role_id\`, \`event_role_id\`, \`event_ping_role_id\`, \`auction_role_id\`, \`auction_ping_role_id\`) VALUES (\'${guild_info[0]}\', \'${guild_info[1]}\', \'${guild_info[2]}\', \'${guild_info[3]}\', \'${guild_info[4]}\', \'${guild_info[5]}\', \'${guild_info[6]}\', \'${guild_info[7]}\', \'${guild_info[8]}\', \'${guild_info[9]}\')`;
                    if(insert_query()) return true;
                }else{
                    query = "UPDATE `servers` SET `moderator_role_id`=\'"+guild_info[1]+"\',`giveaway_role_id`=\'"+guild_info[2]+"\',`giveaway_ping_role_id`=\'"+guild_info[3]+"\',`heist_role_id`=\'"+guild_info[4]+"\',`heist_ping_role_id`=\'"+guild_info[5]+"\',`event_role_id`=\'"+guild_info[6]+"\',`event_ping_role_id`=\'"+guild_info[7]+"\',`auction_role_id`=\'"+guild_info[8]+"\',`auction_ping_role_id`=\'"+guild_info[9]+"\' WHERE guild_id='"+guild.id+"'";
                    if(insert_query()) return true;
                }
            })
            .catch(error => {
                message.channel.send('Looks like our server is unreachable.');
                return true; 
            });
    }
    function intervalFunc() {
        if(is_complete === true){
            if(iterator<questions.length){
                is_complete = 'ongoing';
                if(wait_for_messages(message, iterator) == false){
                    is_complete = false;
                    clearInterval(intervalObj);
                    return false;
                }
                iterator = iterator+1;
            }else{
                clearInterval(intervalObj);
                if(send_Data()){
                    return true;
                }
            }
        }else if(is_complete == 'cancel'){
            clearInterval(intervalObj);
        }
      }
      const intervalObj = setInterval(intervalFunc, 500);
    
}
module.exports.config = {
    name: "setup",
    aliases: ['setup'],
    isEnabled: true,
    description: 'Sets the basic things for the bot to function good!',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 30,
    syntax: 'setup',
    category: ':tools: Setup Commands :tools:',
    guildOnly: true
}