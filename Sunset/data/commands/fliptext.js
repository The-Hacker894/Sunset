const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const flip = require('flip-text');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  let flipmsg = message.content.split(' ').slice(1).join(' ')
  var fliperrembed = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setTitle("Flip Usage Error")
    .setDescription('You must provide some text to flip')
  if(flipmsg.length < 1) return message.channel.send({embed: fliperrembed})
  message.channel.send('`' + flip(flipmsg) + '`')
  console.log(boxen('[Fliptext] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + flip(flipmsg) + ' | ' + flipmsg))
  var fliptextmlembed = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle('Fliptext Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
    if(modlog) return modlog.send({embed: fliptextmlembed}).catch(console.error);
    } else {
      // LiteMode
      let flipmsg = message.content.split(' ').slice(1).join(' ')

  if(flipmsg.length < 1) return message.channel.send('```' + boxen('You must provide some text to flip', {padding: 1}) +'```')
  message.channel.send('`' + flip(flipmsg) + '`')
    }
  });
}
module.exports.help = {
  name: "fliptext",
  info: "Flips the given text",
  usage: "fliptext <message>"
}
