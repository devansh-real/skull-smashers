const client = require('discord.js');
module.exports.run = async (bot, message, args) =>{
    const {guild, channel}  = message;
    var number;
    var time;
    var time_arg
    var timer_msg;
    var embed;
    if(typeof args[0] !='undefined'){
        time_arg = args[0].toLowerCase();
    }else{
        message.channel.send('Specify time');
        return true;
    }
    var embed_color = ['#1abc9c', '#f1c40f','#2980b9','#e15f41', '#27ae60', '#2ecc71', '#e67e22','#3498db', '#16a085', '#e74c3c', '#f39c12', '#f5cd79', '#f19066'];
    var title = args.slice(1);
    title = title.join(' ');
    var user_avatar = "https://cdn.discordapp.com/avatars/"+ message.author.id +"/"+message.author.avatar+".jpeg";

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
        channel.send('Time Cannot be More than 7 Days!');
        return true;
    }else if(number<10000){
        channel.send('Timer must be atleast of 10 seconds.');
        return true;
    }
    const targetTime = Date.now()+number;
    if(title =='' || title =='undefined'){
        title = 'Timer'
    }
    if(guild.iconURL() != null){
        var guild_icon = guild.iconURL();
    }
    function build_embed(){
         embed = {embed: {
            color: embed_color[Math.floor(Math.random() * embed_color.length)],
            author: {
              name: title
            },
            description: time,
            footer: {
              text: message.author.username,
              icon_url: user_avatar
            }
          }
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
    time_calc();
    build_embed();
    
    
    var send= channel.send(embed).then(msg =>{
        timer_msg = msg;
    })
    .catch(error=>{
        console.log(error);
        return false;
    });
    if(send == false) return true;
    var intervalObj;
    var interval = 60000;
    function setting_interval(interval){
        intervalObj = setInterval(intervalFunc, interval);
    }
    if(number<=60000){
      interval = 10000;
    }
    if(number<=11000){
        interval = 1000;
      }
    
    setting_interval(interval)
    function intervalFunc(){
        if(timer_msg.deleted){
            clearInterval(intervalObj);
            return false;
        }
        if(Date.now()>=targetTime){
            time = 'Timer Ended!';
            build_embed();
            timer_msg.edit(embed);
            channel.send(`<@${message.author.id}> Timer Ended! \n${timer_msg.url}`);
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
            build_embed();
            timer_msg.edit(embed);
        }
        
    }

}
module.exports.config = {
    name: "timer",
    aliases: ['timer','countdown'],
    isEnabled: true,
    description: 'Starts the timer and when it ends its pings you. Use this command and pass time with `s` for seconds, `m` for minutes, `h` for hours and `d` for days',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: 'timer 10h New Day!',
    optionalArgs: '',
    cooldown: 15,
    syntax: 'timer <time> [Title]',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}
