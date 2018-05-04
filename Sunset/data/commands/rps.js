const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
    const fs = require('fs')
    const opts = ['rock', 'paper', 'scissors'];
    const wins = {'scissors': 'paper', 'paper': 'rock', 'rock': 'scissors'};

module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  
  console.log('start')

  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {



var rpsitemlengtherrorembed = new Discord.RichEmbed()
  .setTitle('RPS Usage')
  .setColor(colors.critical)
  .setDescription('Please provide an item to *through*')
  .addField(data.prefix + 'rps <rock|paper|scissors>','<rock|paper|scissors> = Rock, Paper, or Scissors')

  if (!args[1] || wins[args[1]] == null) return message.channel.send({embed: rpsitemlengtherrorembed})
  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
    console.log('request')

          const botChoice = opts[Number(body)];


    var rpschosen = new Discord.RichEmbed()
    .setColor(colors.success)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**`)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
  var rpsiwon = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**\n\nI won :tada:`) //\nMoney Loss: ${losstax}
    .setAuthor(message.author.username, message.author.displayAvatarURL)
  var rpswetied = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**\n\nWe tied :checkered_flag:`) //\nMoney Payout: ${parsedmoney}
    .setAuthor(message.author.username, message.author.displayAvatarURL)
  var rpsyouwon = new Discord.RichEmbed()
    .setColor(colors.success)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**\n\nYou won :flag_white:`) //\nMoney Payout: ${parsedmoney}
    .setAuthor(message.author.username, message.author.displayAvatarURL)

  message.channel.send({embed: rpschosen}).then(message => {
    console.log('rpschosen')

    if(wins[botChoice] == args[1]){
      message.edit({embed: rpsiwon})

    }else if(botChoice == args[1]){
      message.edit({embed: rpswetied})
    }else{
      message.edit({embed: rpsyouwon})

    }

      });
    });
  } else {
    // LiteMode

  if (!args[1] || wins[args[1]] == null) return message.channel.send('Please provide an item to *through*')
  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
    console.log('request')

          const botChoice = opts[Number(body)];

  message.channel.send(`I choose **${botChoice.toUpperCase()}**`).then(message => {
    console.log('rpschosen')

    if(wins[botChoice] == args[1]){
      message.edit(`I choose **${botChoice.toUpperCase()}**\n\nI won :tada:`)

    }else if(botChoice == args[1]){
      message.edit(`I choose **${botChoice.toUpperCase()}**\n\nWe tied :checkered_flag:`)
    }else{
      message.edit(`I choose **${botChoice.toUpperCase()}**\n\nYou won :flag_white:`)

    }

      });
    });
  }
});
}
module.exports.help = {
  name: "rps",
  info: "Play RPS with Sunset",
  usage: "rps <rock|paper|scissors>"
}
