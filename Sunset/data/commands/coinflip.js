const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')

function coinflipping() {
var rand = ['Heads!', 'Tails!', 'Heads!', 'Tails!','Heads!', 'Tails!','Heads!', 'Tails!',]
return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var coinflipmlembed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle('CoinFlip Command Used')
  .setDescription(message.author.username)
  .addField(coinflipping(), "_")
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
  message.channel.send('We have, ' + coinflipping());
  console.log(boxen('[Coinflip] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + coinflipping(), {padding: 1}))
  if(modlog) return modlog.send({embed: coinflipmlembed}).catch(console.error);
    } else {
      message.channel.send('We have, ' + coinflipping())
    }
  });
}
module.exports.help = {
  name: "coinflip",
  info: "Flip a coin!",
  usage: "coinflip"
}
