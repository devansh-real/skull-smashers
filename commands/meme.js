const Discord = require('discord.js');
const got = require('got');

module.exports.run = async (bot, message, args) => {
    let fetchurl = '';
    const embed = new Discord.MessageEmbed();
    if (args[0] == 'f'){
        fetchurl = 'https://www.reddit.com/r/memes/random/.json';
    }else{
        fetchurl = 'https://www.reddit.com/r/IndianDankMemes/random/.json';
    }
    got(fetchurl).then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`)
        embed.setColor('RANDOM')
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
        message.channel.send(embed)
    }).catch(console.error);
}

module.exports.config = {
    name: "meme",
    aliases: []
}