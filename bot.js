const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "ss ";

client.on('ready', () => {

    console.log('I am ready!');

});

client.on('message', message => {

    var ping1 = prefix+'ping';

    var about = prefix+'about';

    

    var createheist = prefix+'ch';

    var ping = Date.now() - message.createdTimestamp + "ms";

    if (message.content.toLowerCase() === ping1) {

       message.channel.send('pong, `'+ping+'`');

       }else if (message.content.toLowerCase() === about) {

       message.channel.send('Hello! I am created by D.V.\nMy birthday is on 23 Nov 2020'); 


       

       }else if (message.content.toLowerCase().startsWith(createheist){

           var heistmsg = message.content.toLowerCase().substring(6).split(' ');
           if(heistmsg.length >= 2){
               var amount = heistmsg[0].toLowerCase();
               if (amount.includes('k')){
                  amount = amount.replace('k','K');
               }else if(amount.includes('m')){
                   amount = amount.replace('m','Million');
               }
               const usermentions = heistmsg.remove(0).toString();
               var hoster = "Hosted by: "+message.author;
               var aboutheist = "  ◇ Sponsor by: "+usermentions+"\n  ◇ Amount: "+amount+"\n   ◇ Requirements: 0\n    Go thank Donators in #general  ";
               message.channel.send({embed: {
 color: 3447003,
    author: {
      icon_url: "https://res.cloudinary.com/dnwwugp5s/image/upload/v1605163427/IMG_20201028_163006.jpg"
    },
    title: "🔥 HEIST TIME 🔥",
    description: "<@&773107906748612618>",
    thumbnail: {
		url: 'https://res.cloudinary.com/dnwwugp5s/image/upload/v1605163427/IMG_20201028_163006.jpg',
	},
    fields: [{
        name: "About Heist:",
        value: aboutheist
      },
      {
        name: "What you need to do:",
        value: "  ◇ Withdraw 1,000 coins in a Dank Memer channel \n   ◇ Turn Passive off, pls settings passive false\n    ◇ Type JOIN HEIST when this channel unlocks"
      }
    ],
    image: {
		url: 'https://media.tenor.com/images/7366ae69129776ba7660cd8e981460de/tenor.gif',
	},
    footer: {
      icon_url: client.user.avatarURL,
      text: hoster
    }
}});
           }

           

       }

    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
