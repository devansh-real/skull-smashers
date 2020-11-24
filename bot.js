const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

client.on('ready', () => {

    console.log('I am ready!');

});




client.on('message', message => {

    var ping1 = prefix+'ping';

    var about = prefix+'about';

    var ping = Date.now() - message.createdTimestamp + "ms";

    if (message.content.toLowerCase() === ping1) {

       message.channel.send('pong, `'+ping+'`');

       }else if (message.content.toLowerCase() === about) {
       message.channel.send('Hello! I am created by D.V.\nMy birthday is on 23 Nov 2020'); 
       
       }else if (message.content.toLowerCase().startsWith(prefix+'ch')){
           var heistmsg = message.content.toLowerCase().substring(6).split(' ');
           const usermentions = heistmsg.remove(0).toString();
           message.delete();
           const embed = new Discord.RichEmbed()
                  .setAuthor("🔥 HEIST TIME 🔥", "https://res.cloudinary.com/dnwwugp5s/image/upload/v1605163427/IMG_20201028_163006.jpg")
                  .setColor(0x0d3dff)
                  .addField("About Heist:", "  ◇ Sponsor by: <@!771980491913297960> and <@!702598450725781584>\n  ◇ Amount: 250k\n   ◇ Requirements: 0\n    Go thank Donators in #general  ", true)
                  .addField("What you need to do:", "  ◇ Withdraw 1,000 coins in a Dank Memer channel \n   ◇ Turn Passive off, pls settings passive false\n    ◇ Type JOIN HEIST when this channel unlocks")
                  .setThumbnail("https://res.cloudinary.com/dnwwugp5s/image/upload/v1605163427/IMG_20201028_163006.jpg")
                  .setFooter("Footer", "https://media.tenor.com/images/7366ae69129776ba7660cd8e981460de/tenor.gif");
           message.channel.send(embed);
           
       }

    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
