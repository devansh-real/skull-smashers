const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require("axios");
const cheerio = require("cheerio");
const mainUrl = `https://reddit.com/r/dankmemes`;

var prefix = "ss ";
var memelink = "jjj";
function memelnk(linkhere){
    memelink = linkhere;
}
//memes
const randNo = (limit) => {
    const thatNo = Math.floor(Math.random() * limit);
    return thatNo;
};
const dealWithData = (html) => {
    const $ = cheerio.load(html);
    const urlMeme = $("._2_tDEnGMLxpM6uOa2kaDB3.ImageBox-image.media-element._1XWObl-3b9tPy64oaG6fax");
    const indexValue = randNo(urlMeme.length);
    
   var lol = (`Source is:${urlMeme[indexValue].attribs.src}`);
    memelnk(lol);
};
axios
    .get(mainUrl)
    .then((response) => {
        dealWithData(response.data);
    })
    .catch((err) => {
        console.log(err);
    });




//meme ends
client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {
    var msg = prefix+'ping';
    var msg = prefix+'test';
    if (message.content.toLowerCase() === msg) {

       message.channel.send('pong');

       }
    
    if (message.content.toLowerCase() === msg) {

       message.channel.send(memelink);

       }
    

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
