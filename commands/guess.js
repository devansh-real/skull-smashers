module.exports.run = async (bot, message, args, cmd) =>{
    guess_number = Math.floor(Math.random() * 20);
    console.log(guess_number)
    const filter = (m) => message.author.id == m.author.id;
    var previous_guess = 'null';
    var total_tries = 0;
    message.channel.send(`You have to guess number between \`1-20\`.\nYou have ${4-total_tries} tries`);
    const collector = message.channel.createMessageCollector(filter, {time: 60000, errors: ['time']});
    collector.on('collect', m => {
      if(m.content.toLowerCase().startsWith('hint')){
          if(previous_guess == 'null'){
              message.channel.send('You have to guess something before requesting for hint');
          }else{
              if(previous_guess>guess_number){
                message.channel.send(`Your number \`${previous_guess}\` was very high. \nYou have \`${4-total_tries}\` tries left`);
              }else{
                message.channel.send(`Your number \`${previous_guess}\` was very Low. \nYou have \`${4-total_tries}\` tries left`);
              }
          }
      }else if(isNaN(m.content)){
        message.channel.send('This is not a number');
        if(total_tries == 4){
            message.reply('You was Not able to guess the number right! \nBetter luck next time');
            return
        }
      }else{
        if(Number(m.content) == guess_number){
        message.reply('Congrats you guessed the number right!');
        return
        }else{
            previous_guess = Number(m.content);
            total_tries += 1;
            if(total_tries == 4){
                message.reply('You was Not able to guess the number right! \nBetter luck next time');
                return
            }else{
                message.channel.send(`${previous_guess} was not the Number. \nYou have \`${4-total_tries}\` tries left. \n You can type \`hint\` to get hint`);
            }
        }
      }
    });
}
module.exports.config = {
    name: "guess",
    aliases: ['guess'],
    isEnabled: true,
    description: 'You have a good guess? Try me! I will choose a number randomly from 1 to 20 and u have to guess it!',
    requiredPerms: ['SEND_MESSAGE'],
    exampleUssage: '',
    optionalArgs: '',
    cooldown: 30,
    syntax: 'guess',
    category: ':video_game: Games :video_game:',
    guildOnly: true
}