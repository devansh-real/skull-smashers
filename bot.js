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
       }else if (message.content.toLowerCase().startsWith(createheist)) {
           
	       var heistmsg = message.content.toLowerCase().substring(6).split(' ');
	        var amount = heistmsg[0];
           if (amount.includes('k')){
               amount = amount.replace('k','K');
           }else if(amount.includes('m')){
               amount = amount.replace('m',' Million');
           }
           heistmsg.shift();
           var sponsors = "";
           for(index=0;index<heistmsg.length;index++){
               if (index === heistmsg.length-2){
                   sponsors = sponsors+heistmsg[index]+' and ';
               }else if(index === heistmsg.length-1){
                   sponsors = sponsors+heistmsg[index];
                        }else{
                   sponsors = sponsors+heistmsg[index]+', ';
               }
           }
           var hoster = "Hosted by: "+message.author;
           var aboutheist = "  ◇ Sponsor by: "+sponsors+"\n  ◇ Amount: "+amount+"\n   ◇ Requirements: 0\n    Go thank Donators in #general  ";
           message.channel.send({embed: {
                color: 1075177,
                author: {
                  name: '🔥 HEIST TIME 🔥',
                  icon_url: 'https://res.cloudinary.com/dnwwugp5s/image/upload/v1605163427/IMG_20201028_163006.jpg'
                },
                thumbnail: {
                    url: 'https://res.cloudinary.com/dnwwugp5s/image/upload/v1605163427/IMG_20201028_163006.jpg',
                },
                fields: [{
                    name: 'About heist: ',
                    value: aboutheist
                  },
                  {
                    name: 'What you need to do:',
                    value: '  ◇ Withdraw 1,000 coins in a Dank Memer channel \n   ◇ Turn Passive off, pls settings passive false\n    ◇ Type JOIN HEIST when this channel unlocks'
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

       
       }

    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);
