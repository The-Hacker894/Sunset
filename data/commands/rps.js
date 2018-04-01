const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
    const fs = require('fs')


module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  console.log('start')
  if (!fs.existsSync(`./data/economy/${message.guild.id}`)){
    fs.mkdirSync(`./data/economy/${message.guild.id}`);
}
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')

const opts = ['rock', 'paper', 'scissors'];
const wins = {'scissors': 'paper', 'paper': 'rock', 'rock': 'scissors'};

var rpsitemlengtherrorembed = new Discord.RichEmbed()
  .setTitle('RPS Usage')
  .setColor(data.embedcolor)
  .setDescription('Please provide an item to *through*')
  .addField(data.prefix + 'rps <rock|paper|scissors>','<rock|paper|scissors> = Rock, Paper, or Scissors')

  // Credits to https://github.com/LouieK22/rps-bot/blob/master/app.js

  if (!args[1] || wins[args[1]] == null) return message.channel.send({embed: rpsitemlengtherrorembed})
  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
    console.log('request')
    
   /* fs.exists(`./data/economy/${message.guild.id}/${message.author.id}.txt`, function(exists) {
      console.log('fs.exists')
      if (exists) {
        console.log('if exists')
        fs.readFile(`./data/economy/${message.guild.id}/${message.author.id}.txt`, 'utf8', function(err, data) {
          console.log('readfile') */
          const botChoice = opts[Number(body)];
    /*const parsedmoney = parseFloat(Math.floor(Math.random() * 100) + 1)
    const parsedData = parseFloat(data)
    const losstax = parseFloat(Math.floor(Math.random() * 100) + 1)*/

    var rpschosen = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**`)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
  var rpsiwon = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**\n\nI won :tada:`) //\nMoney Loss: ${losstax}
    .setAuthor(message.author.username, message.author.displayAvatarURL)
  var rpswetied = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**\n\nWe tied :checkered_flag:`) //\nMoney Payout: ${parsedmoney}
    .setAuthor(message.author.username, message.author.displayAvatarURL)
  var rpsyouwon = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('RPS')
    .setDescription(`I choose **${botChoice.toUpperCase()}**\n\nYou won :flag_white:`) //\nMoney Payout: ${parsedmoney}
    .setAuthor(message.author.username, message.author.displayAvatarURL)

  message.channel.send({embed: rpschosen}).then(message => {
    console.log('rpschosen')

    if(wins[botChoice] == args[1]){
      message.edit({embed: rpsiwon})

  /*    fs.writeFile(`./data/economy/${message.guild.id}/${message.author.id}.txt`, parsedData - losstax, function(err) {
        console.log('writing loss')
        if(err) {
          message.channel.send(err)
        }
      }); */
    }else if(botChoice == args[1]){
      message.edit({embed: rpswetied})
    /*  fs.writeFile(`./data/economy/${message.guild.id}/${message.author.id}.txt`, parsedData + parsedmoney, function(err) {
        console.log('writing tie')
        if(err) {
          message.channel.send(err)
        }
      }); */
    }else{
      message.edit({embed: rpsyouwon})
    /*  fs.writeFile(`./data/economy/${message.guild.id}/${message.author.id}.txt`, parsedData + parsedmoney, function(err) {
        console.log('righting win')
        if(err) {
          message.channel.send(err)
        }
      
    });*/
    }
  /*});  
  

        }); 
    /* } else {
        fs.writeFile(`./data/economy/${message.guild.id}/${message.author.id}.txt`, '0', function(err) {
          if(err) {
            message.channel.send(err)
          }
          var noaccount = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setTitle('No Bank Account Found')
            .setDescription('No Bank Account Found\nCreating new file\nTry using this command again.')
            message.channel.send({embed: noaccount})
      });
     } */
      });
    });
}
module.exports.help = {
  name: "rps",
  info: "Play RPS with Sunset",
  usage: "rps <rock|paper|scissors>"
}
