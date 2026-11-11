const Discord = require('discord.js');

module.exports.run = async (bot, message, args, prefix) => {
  message.delete();
  var got = require('got');
  var csvToJson = require('csvtojson');
  const key = 'asdfghjwerfghjyrfdvbjuy6rfvyrjf123456dfgh';
  var has_role = false;
  var early = false;
  var heist_started = false;
  var error = false;
  var isLong = false;
  var requirement = [];
  var heist_man_role = '';
  const base_url = "https://sjshsvsgsh.000webhostapp.com/db_barrier.php?";
  var query = "SELECT `heist_role_id` FROM `servers` WHERE guild_id='"+message.guild.id+"'";
  const member = message.guild.members.cache.get(message.author.id);
  if(args.includes('--long')){
    isLong = true;
    args.splice(args.indexOf('--long'),1)
  }
  if(args.includes('--early')){
    early = true;
  }
  if(!member.hasPermission('ADMINISTRATOR')){
    const { executeQuery } = require('../utils/database_query');
    var poper_emoji = '';
    
    var response = await executeQuery(query);
    if(typeof response['errorRaised'] == 'undefined'){
        message.channel.send('Looks like Setup is incomplete try running `setup` command first');
        return
    }
    response = response['result'];
    const member = await message.guild.members.cache.get(message.author.id);
        if(response[0].heist_role_id == 'none'){
            message.channel.send('No heist manager role is set')
            return
        }
        if(!member.roles.cache.has(response[0].heist_role_id)){
            message.channel.send('You do not have Heist manager role!')
            return
        }
}else{
  has_role = true;
}
if(error == true){
  return true;
}
  
  // amount req, sponsors, early role
  var heistmsg = args;
  var amount = args[0];
  if (typeof args[0] === 'undefined'){
    message.channel.send("You need to Specify amount");
    return true;
  }
  var early_role = [];
  var early_role_id = [];
  if(args.includes('--early')){
    early = true;
  for(index=args.indexOf('--early')+1; index>args.indexOf('--early') && index<args.length;index++){
    early_role.push(args[index]);
  }
  var error = false;
  early_role.forEach(element=>{
    const roleName = message.guild.roles.cache.find((role) =>{
      return role.name === element;
    });
      if(!roleName){
        const roleId = message.guild.roles.cache.find((role) =>{
            return role.id === element.replace('<@&','').replace('>','');
        });
        if(!roleId){
            message.reply(`No role with name/id \`${element}\`, Heist Canceled!`);
            error = true;
            return
        }else{
          early_role_id.push(element.replace('<@&','').replace('>',''));
          early = true;
        }
    }else{
      early = true;
      early_role_id.push(roleName.id);
    }
  });
}
if(error){
  return true;
}
error = false;
if(args[1]!= 'none'){
const roleName = message.guild.roles.cache.find((role) =>{
  return role.name === args[1];
});
  if(!roleName){
    const roleId = message.guild.roles.cache.find((role) =>{
        return role.id === args[1].replace('<@&','').replace('>','');
    });
    if(!roleId){
        message.reply(`No role with name/id \`${args[1]}\`, Heist Canceled!`);
        error = true;
        return
    }else{
      requirement.push(args[1].replace('<@&','').replace('>',''));
    }
}else{
  requirement.push(roleName.id);
}}else{
  requirement.push('none');
}
if(error){
  return true;
}

    if (amount.includes('k')){
        amount = amount.replace('k','K');
    }else if(amount.includes('m')){
        amount = amount.replace('m',' Million');
    }
    heistmsg.shift();
    heistmsg.shift();
    var sponsor_length = heistmsg.length;
    if(heistmsg.indexOf('--early')> -1){
      sponsor_length = heistmsg.slice(0, heistmsg.indexOf('--early')).length
    }
    var sponsors = "None";
    if(heistmsg.length >0){
      sponsors = '';
      for(index=0;index<sponsor_length;index++){
          if (index === sponsor_length-2){
            if(heistmsg[index].includes('<@!') && heistmsg[index].includes('>')){
              sponsors = sponsors+heistmsg[index]+' and ';
            }else{
              sponsors = sponsors+'<@!'+heistmsg[index]+'>'+' and ';
            }
            
          }else if(index === sponsor_length-1){
            if(heistmsg[index].includes('<@!') && heistmsg[index].includes('>')){
              sponsors = sponsors+heistmsg[index];
            }else{
              sponsors = sponsors+'<@!'+heistmsg[index]+'>';
            }
          }else{
            if(heistmsg[index].includes('<@!') && heistmsg[index].includes('>')){
              sponsors = sponsors+heistmsg[index]+', ';
            }else{
              sponsors = sponsors+'<@!'+heistmsg[index]+'>'+', ';
            }
          }
      }
    }
    
    var early_msg = '';
    early_role_id.forEach(element=>{
      if(early_role_id.indexOf(element)>= early_role_id.length -1){
        early_msg = early_msg+"<@&"+element+">";
      }else{
        early_msg = early_msg+"<@&"+element+">"+', ';
      }
      
    });
    var hoster = "Hosted by: "+message.author.username;
    var req;
    if(requirement[0] == 'none'){
      req = 'none';
    }else{
      req = '<@&'+requirement[0]+'>';
    }
    var aboutheist = "  ◇ Sponsor by: "+sponsors+"\n  ◇ Amount: "+amount+"\n   ◇ Requirement: "+req+"\n    Go thank Donators in general  \n  Channel for "+early_msg+" will unlock first";
    if(!has_role){
      message.channel.send('You do not have Heist Manager Role');
      return true;
    }
    message.channel.send({embed: {
        color: 1075177,
        author: {
          name: '🔥 HEIST TIME 🔥',
          icon_url: 'https://res.cloudinary.com/dnwwugp5s/image/upload/v1605163427/IMG_20201028_163006.jpg'
        },
        thumbnail: {
            url: message.guild.iconURL(),
        },
        fields: [{
            name: 'About heist: ',
            value: aboutheist
          },
          {
            name: 'What you need to do:',
            value: '  ◇ Withdraw 2,000 coins in a Dank Memer channel \n   ◇ Turn Passive off, pls settings passive false\n    ◇ Type \`JOIN HEIST\` when this channel unlocks'
          }
        ],
        image: {
            url: 'https://media.tenor.com/images/7366ae69129776ba7660cd8e981460de/tenor.gif',
        },
        footer: {
          text: hoster
        }
      }
    });
    var dank_memer = '270904126974590976';
    message.channel.send('listening to heists in this channel for 1 minute');
    function no_heist(){
      if(heist_started == false){
        message.channel.send('No heist Found \nLooks like no one dares here to start heist!');
      }
    }
    setTimeout(no_heist, 60000);
    const filter = (m) => m.author.id.toString() == dank_memer || m.content.toLowerCase() === 'cancel';
    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000, errors: ['time']});
    collector.on('collect', m => {
      if(m.content.toLowerCase() === 'cancel'){
        message.channel.send('Heist Canceled');
        return true;
      }
      if(m.content.includes('how are we gonna rob nobody ya dumb dumb')){
      //if(m.content.includes('is starting a bank robbery. They\'re trying to break into') && m.content.includes('Join them by typing \`JOIN HEIST\` soon!') && !m.content.includes('Imagine')){
        heist_started = true;
        // open channel for early 30s and after it for non early
        if(isLong == true){
          if(early == true){
            open_channel_for_early()
            setTimeout(open_channel_for_non_early, 30000);
          }else{
            open_channel_for_non_early()
          }
          setTimeout(lock_channel_for_all, 240000);
        }else{
          if(early == true){
            open_channel_for_early()
            setTimeout(open_channel_for_non_early, 30000);
          }else{
            open_channel_for_non_early()
          }
          setTimeout(lock_channel_for_all, 90000);
        }
      }
    });
    function open_channel_for_early(){
      if(isLong == true){
        var footer = '*Locking in 4 minutes*';
      }else{
        var footer = '*Locking in 1 minute 30 seconds*';
      }
      var msg = ':unlock: Unlocked channel for '
      console.log(early_role_id)
      early_role_id.forEach(element=>{
        const role = message.channel.guild.roles.cache.get(element);
        message.channel.updateOverwrite(role, {SEND_MESSAGES: true, VIEW_CHANNEL: true });
        msg = msg+`<@&${role.id}> `
      });
      
      var embed = {embed:{color: '#2ecc71', description:msg, footer: {text: footer}}}
      message.channel.send(embed);
    }
    function open_channel_for_non_early(){
      //message.channel.overwritePermissions(message.guild.channels.cache.get(message.channel.id).permissionOverwrites);
      if(isLong == true){
        var footer = '*Locking in 3 minutes 30 seconds*';
      }else{
        var footer = '*Locking in 1 minute*';
      }
      var msg = ':unlock: Unlocked channel for '
      requirement.forEach(element=>{
      if(element != 'none'){
        const role = message.channel.guild.roles.cache.get(element);
        message.channel.updateOverwrite(role, {SEND_MESSAGES: true,VIEW_CHANNEL: true });
        msg = msg+`<@&${role.id}> `
      }else if(element == 'none'){
        const role = message.channel.guild.roles.everyone
        message.channel.updateOverwrite(role, {SEND_MESSAGES: true,VIEW_CHANNEL: true });
        msg = msg+`<@&${role.id}> `
      }
      })
      var embed = {embed:{color: '#2ecc71', description:msg,footer: {text: footer}}}
      message.channel.send(embed);
    }
    function lock_channel_for_all(){
      message.channel.overwritePermissions(message.guild.channels.cache.get(message.channel.id).permissionOverwrites);
      var msg = ':lock: Locked channel for '
      early_role_id.forEach(element=>{
        const role = message.channel.guild.roles.cache.get(element);
        message.channel.updateOverwrite(role, {SEND_MESSAGES: false,VIEW_CHANNEL: true  });
        msg = msg+`<@&${role.id}> `
      });
      if(requirement[0] != 'none'){
        requirement.forEach(element=>{
          const role = message.channel.guild.roles.cache.get(element);
          message.channel.updateOverwrite(role, {SEND_MESSAGES: false,VIEW_CHANNEL: true });
          msg = msg+`<@&${role.id}> `
         });
    }else if(requirement[0] == 'none'){
      const role = message.channel.guild.roles.everyone;
      message.channel.updateOverwrite(role, {SEND_MESSAGES: false,VIEW_CHANNEL: true });
      msg = msg+`<@&${role.id}> `
    }
    var embed = {embed:{color: '#2ecc71', description:msg}}
    message.channel.send(embed);
    }

}
module.exports.config = {
    name: "createheist",
    aliases: ['createheist', 'ch'],
    isEnabled: true,
    description: 'Creates a heist message and will automatically lock/unlock heist channel \n`--early`: This flag will unlock channel early for roles specified\n`--long`: put this flag if the heist amount is higher than 10 Millions',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: 'ch 100M none 783017883210350602 --early 824904439541792788 824987643309457448 --long',
    optionalArgs: '',
    cooldown: 0,
    syntax: 'amount <role> [Sponsors] [args]',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}