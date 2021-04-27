module.exports.run = async (client, message, args, prefix) =>{
    function firstLettercapitalize(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
           separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
           separateWord[i].substring(1);
        }
        return separateWord.join(' ');
     }
    var isItemFound = false;
    if(typeof client.itemValue['blob'] == 'undefined'){
        message.channel.send('Bot is still loading!')
    }
    if(typeof args[0] != 'undefined'){
        const item = args.join(' ').toLowerCase();
        for(key in client.itemValue){
            if(key.toLowerCase().includes(item)){
                isItemFound = true;
                const itemInfo = client.itemValue[key];
                key = firstLettercapitalize(key);
                const embed =  {embed:{
                    color: '#f1c40f',
                    title: key,
                    description: `${key} sells for \`${itemInfo['price']}\` in market.`,
                    thumbnail: {
                        url: itemInfo['image']
                    },
                    footer:{
                        text: `Thanks for using me!`
                    }
                }}
                message.channel.send(embed);
                return;
            }
            
        }
        if(isItemFound == false){
            message.reply('That item dont even exists!')
        }
    }else{
        message.reply('You need to specify a item')
    }
}
module.exports.config = {
    name: "value",
    aliases: ['value', 'tradevalue', 'tv'],
    isEnabled: true,
    description: 'Tells you the Trade value of Dank memer Items',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 15,
    syntax: 'value <item>',
    category: '<:blobDoctor:834683691329519656> Utility <:blobDoctor:834683691329519656>',
    guildOnly: true
}