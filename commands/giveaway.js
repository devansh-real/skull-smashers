module.exports.run = async (client, message, args, prefix) =>{
    const Discord = require('discord.js');
    if(typeof client.giveaway_info == 'undefined'){
        client.giveaway_info = new Discord.Collection();
    }
    cmd = args.shift().toLowerCase();
    const {channel} = message;
    var number;
    var time_arg;
    var winners;
    var role_arg;
    var role;
    var price;
    var winners_user = '';
    var gaw_msg;
    var time;
    var embed;
    var targetTime;
    var gaw_users = [];
    var end_msg
    var reaction_emoji = '<a:moneyrain:827426909558013993>';
    var party_emoji = '<a:party_popper:827430050328215613>';
    var embed_color = ['#1abc9c', '#f1c40f','#2980b9','#e15f41', '#27ae60', '#2ecc71', '#e67e22','#3498db', '#16a085', '#e74c3c', '#f39c12', '#f5cd79', '#f19066'];
    
    response = response['result'];
    if(!member.hasPermission('ADMINISTRATOR')){
        const { executeQuery } = require('../utils/database_query');
        var poper_emoji = '';
        var query = "SELECT `giveaway_role_id` FROM `servers` WHERE guild_id='"+message.guild.id+"'";
        var response = await executeQuery(query);
        if(typeof response['errorRaised'] == 'undefined'){
            message.channel.send('Looks like Setup is incomplete try running `setup` command first');
            return
        }
        const member = await message.guild.members.cache.get(message.author.id);
        if(response[0].giveaway_role_id == 'none'){
            message.channel.send('No giveaway manager role is set')
            return
        }
        if(!member.roles.cache.has(response[0].giveaway_role_id)){
            message.channel.send('You do not have giveaway manager role!')
            return
        }
    }

    function build_embed_gaw_ended(){
        embed = {embed: {
           color: embed_color[Math.floor(Math.random() * embed_color.length)],
           title: price,
           description: `The giveaway for ended \n Winner: ${winners_user}`,
           thumbnail: {
               url: 'https://cdn.discordapp.com/attachments/827075304786100256/827427224621416498/tenor.gif',
           },
           fields: field,
           footer: {
             text: `${winners} winners`
           }
         }
       }
    }
    function select_winners(isReroll=false){
        gaw_users.shift();
        if(winners == 0){
            end_msg = `No one won giveaway for ${price}\n${gaw_msg.url}`
            return true;
        }
        for(var i=1;i<=winners;i++){
            winners_user = winners_user+'<@!'+gaw_users[Math.floor((Math.random() * (gaw_users.length-1)) + 0)]+'>, ';
        }
        if(gaw_users == []){
            winners_user = 'No one';
        }
        if(isReroll){
            if(gaw_users.length > 0){
                end_msg = `${winners_user}! won giveaway reroll for ${price}\n${gaw_msg.url}`;
            }else{
                end_msg = `No one won giveaway for ${price}\n${gaw_msg.url}`
            }
            return
        }
        build_embed_gaw_ended()
        if(gaw_users.length > 0){
            end_msg = `Congratulations ${winners_user}! You have won giveaway for ${price}\n${gaw_msg.url}`;
        }else{
            end_msg = `No one won giveaway for ${price}\n${gaw_msg.url}`
        }
    }
    if(cmd == 'start'){
        
        //prefix g start 10m 1w none Price
        if(args.length<4){
            message.channel.send('Please provide time winners requirements and Price');
            return
        }
        time_arg = args.shift().toLowerCase();
        if(time_arg.includes('s')){
            number = parseInt(time_arg.replace('s',''));
            if(!isNaN(number)){
                number = number*1000;
            }else{
                channel.send('Enter a valid time!');
                return true;
            }
        }else if(time_arg.includes('m')){
            number = parseInt(time_arg.replace('m',''));
            if(!isNaN(number)){
                number = number*1000*60;
            }else{
                channel.send('Enter a valid time!');
                return true;
            }
        }else if(time_arg.includes('h')){
            number = parseInt(time_arg.replace('h',''));
            if(!isNaN(number)){
                number = number*1000*60*60;
            }else{
                channel.send('Enter a valid time!');
                return true;
            }
        }else if(time_arg.includes('d')){
            number = parseInt(time_arg.replace('d',''));
            if(!isNaN(number)){
                number = number*1000*60*60*24;
            }else{
                channel.send('Enter a valid time!');
                return true;
            }
        }else{
            channel.send('Enter a valid time!')
        }
    
        if(number>604800000){
            channel.send('Giveaway Cannot be More than 7 Days!');
            return true;
        }else if(number<10000){
            channel.send('Giveaway must be atleast of 10 seconds.');
            return true;
        }
        targetTime = Date.now()+number
        winners = args.shift().toLowerCase().replace('w','');
        if(isNaN(winners)){
            channel.send('Cannot prase winners!');
            return true;
        }

        role_arg = args.shift();
            if (role_arg != 'none'){
                const roleName = message.guild.roles.cache.find((role) =>{
                    return role.name === role_arg;
                });
                if(!roleName){
                    const roleId = message.guild.roles.cache.find((role) =>{
                        return role.id === role_arg.replace('<@&','').replace('>','');
                    });
                    if(!roleId){
                        message.reply(`No role with name/id \`${role_arg}\`, Heist Canceled!`);
                        return
                    }else{
                    role = roleId;
                    }
                }else{
                role = roleName
                }
        }
       
        function time_calc(){
            var days = '';
            var hours = '';
            var minutes = '';
            var seconds = '';
            var delta = Math.abs(targetTime - Date.now()) / 1000;
            days = Math.round(Math.floor(delta / 86400));
            delta -= days * 86400;
            hours = Math.round(Math.floor(delta / 3600) % 24);
            delta -= hours * 3600;
            minutes = Math.round(Math.floor(delta / 60) % 60);
            delta -= minutes * 60;
            seconds = Math.round(delta % 60);
    
            days = days.toString();
            hours = hours.toString();
            minutes = minutes.toString();
            seconds = seconds.toString();
    
            if(days != '0'){
                time = `${days} Day, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
                return true;
            }else if(hours != '0'){
                time = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
                return true;
            }else if(minutes !='0'){
                time = `${minutes} minutes, ${seconds} seconds`;
                return true;
            }else{
                time = `${seconds} seconds`;
                return true;
            }
        }
        
        price = args.join(' ');
        if(role_arg != 'none'){
            var field = [
                {name:'Hosted by', value: `**User:** <@!${message.author.id}>`},
                {name:'Requirements', value: `**Role:** <@&${role.id}>`}
            ];
        }else{
            var field = [
                {name:'Hosted by', value: `**User:** <@!${message.author.id}>`}
            ];
        }
        function build_embed_new_gaw(){
             embed = {embed: {
                color: embed_color[Math.floor(Math.random() * embed_color.length)],
                title: price,
                description: `React with ${reaction_emoji} to enter \n **Time:** ${time}`,
                thumbnail: {
                    url: 'https://cdn.discordapp.com/attachments/827075304786100256/827427224621416498/tenor.gif',
                },
                fields: field,
                footer: {
                  text: `${winners} winners`
                }
              }
            }
        }
        time_calc();
        args.shift()
        var intervalObj;
        var interval = 60000;
        function intervalFunc(){
            var gaw_info = client.giveaway_info.get(gaw_msg.id);
            if(gaw_info['isEnded']){
                clearInterval(intervalObj);
                return
            }
            if(gaw_msg.deleted){
                clearInterval(intervalObj);
                client.giveaway_info.set(gaw_msg.id, {
                    'isEnded': true,
                    'price': price,
                    'winners': winners,
                    'gaw_users': gaw_users,
                    'role': role,
                    'role_arg': role_arg,
                    'gaw_msg': gaw_msg
                })
                return false;
            }
            if(Date.now()>=targetTime){
                client.giveaway_info.set(gaw_msg.id, {
                    'isEnded': true,
                    'price': price,
                    'winners': winners,
                    'gaw_users': gaw_users,
                    'role': role,
                    'role_arg': role_arg,
                    'gaw_msg': gaw_msg
                })
                select_winners();
                gaw_msg.edit(`${party_emoji} GIVEAWAY ENDED! ${party_emoji}` , embed);
                channel.send(end_msg);
                clearInterval(intervalObj);
                return true;
            }
            if(targetTime-Date.now()<=6000){
                clearInterval(intervalObj);
                interval = 1000;
                setting_interval(1000);
            }
            if(targetTime-Date.now()<120000){
                clearInterval(intervalObj);
                interval = 20000;
                setting_interval(20000);
            }
            if(number<=60000){
                interval = 10000;
            }
            if(number<=11000){
            interval = 1000;
            }
            if(number>=1*1000*60*60*24){
                interval = 1*1000*60*60;
            }
            if(number>=1*1000*60*60){
                interval = 10*1000*60;
            }
            if(time_calc() == true){
                build_embed_new_gaw();
                gaw_msg.edit(`${party_emoji} NEW GIVEAWAY! ${party_emoji}`, embed);
            }
            
        }
        function setting_interval(interval){
            intervalObj = setInterval(intervalFunc, interval);
        }
        if(number<=60000){
        interval = 10000;
        }
        if(number<=11000){
            interval = 1000;
        }
        build_embed_new_gaw();
        const filter = (reaction, user) => {
            return reaction.emoji.name === 'moneyrain';
        };
        var send = channel.send(`${party_emoji} NEW GIVEAWAY! ${party_emoji}`, embed).then(msg =>{
            message.delete()
            client.giveaway_info.set(msg.id, {
                'isEnded': false,
                'price': price,
                'winners': winners,
                'role': role,
                'role_arg': role_arg,
                'gaw_msg': gaw_msg
            })
            gaw_msg = msg;
            gaw_msg.react(reaction_emoji);
            const collector = gaw_msg.createReactionCollector(filter, { time: number });
            collector.on('collect', (reaction, user) => {
                if(!reaction_emoji.includes(reaction.emoji.id)){
                    return
                }
                if(role_arg != 'none'){
                    
                    if(member.roles.has(role)){
                        var gaw_info = client.giveaway_info.get(gaw_msg.id);
                        if(gaw_info['isEnded'] == true){
                            collector = 'null'
                            return true;
                        }
                        gaw_users.push(user.id);
                        client.giveaway_info.set(gaw_msg.id,{
                            'isEnded': false,
                            'price': price,
                            'winners': winners,
                            'gaw_users': gaw_users,
                            'role': role,
                            'role_arg': role_arg,
                            'gaw_msg': gaw_msg
                        })
                    }else{
                        gaw_msg.reactions.resolve(reaction_emoji).users.remove(user);
                        user.send(`You do not have ${role.name} role to join this giveaway \n ${gaw_msg.url}`);
                    }
                }else{
                    var gaw_info = client.giveaway_info.get(gaw_msg.id);
                        if(gaw_info['isEnded'] == true){
                            collector = 'null'
                            return true;
                        }
                        gaw_users.push(user.id);
                        client.giveaway_info.set(gaw_msg.id,{
                            'isEnded': false,
                            'price': price,
                            'winners': winners,
                            'gaw_users': gaw_users,
                            'role': role,
                            'role_arg': role_arg,
                            'gaw_msg': gaw_msg
                        })
                }
            });
            collector.on('end', collected => {
                // Fucxcccccccccccccccccc nothing to Do here BRUH
            });
            next_process()
        })
        .catch(error=>{
            console.log(error);
            return false;
        });
        if(send == false) return true;
        
        function next_process(){
            setting_interval(interval)
            
        }
    }else if(cmd == 'end'){
        if(typeof client.giveaway_info.get(args[0]) != 'undefined'){
            const giveaway = client.giveaway_info.get(args[0]);
            if(giveaway['isEnded']){
                message.channel.send('The giveaway has already ended!');
                return
            }
            price = giveaway['price'];
            gaw_users = giveaway['gaw_users'];
            winners = giveaway['winners'];
            role = giveaway['role'];
            var role_arg = giveaway['role_arg'];
            gaw_msg = giveaway['gaw_msg'];
            if(role_arg != 'none'){
                var field = [
                    {name:'Hosted by', value: `**User:** <@!${message.author.id}>`},
                    {name:'Requirements', value: `**Role:** <@&${role.id}>`}
                ];
            }else{
                var field = [
                    {name:'Hosted by', value: `**User:** <@!${message.author.id}>`}
                ];
            }
            select_winners();
            gaw_msg.edit(`${party_emoji} GIVEAWAY ENDED! ${party_emoji}` , embed);
            message.channel.send(end_msg);
            client.giveaway_info.set(gaw_msg.id,{
                'isEnded': true,
                'price': price,
                'winners': winners,
                'gaw_users': gaw_users,
                'role': role,
                'role_arg': role_arg,
                'gaw_msg': gaw_msg
            });
        }else{
            message.channel.send('Cannot find any giveaway of that id');
        }
    }else if(cmd == 'reroll'){
        if(typeof client.giveaway_info.get(args[0]) != 'undefined'){
            const giveaway = client.giveaway_info.get(args[0]);
            if(!giveaway['isEnded']){
                message.channel.send('The giveaway is not ended yet');
                return true;
            }
            price = giveaway['price'];
            gaw_users = giveaway['gaw_users'];
            winners = giveaway['winners'];
            role = giveaway['role'];
            gaw_msg = giveaway['gaw_msg'];
            select_winners(true);
            message.channel.send(end_msg);
        }
    }

}
module.exports.config = {
    name: "giveaway",
    aliases: ['g','giveaway'],
    isEnabled: true,
    description: 'Starts the giveaway with given price and Requirement role \n** Sub Commands:** \n`end`: Ends a giveaway before its actual time! \n**Example Ussage:** `prefix g end 835165872775364668` \n`reroll`: ReRolls the winners! \n**Example Ussage:** `prefix g reroll 835165872775364668`',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: 'g start 10m 1w none $500',
    optionalArgs: '',
    cooldown: 10,
    syntax: 'g start <Time> <No. of Winners>w <role or none if none> <Price>',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}