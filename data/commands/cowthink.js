const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const cowsay = require('cowsay');
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
  let ctmsg = message.content.split(' ').slice(1).join(' ')
  var cowsayerrembed = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setTitle("Cowthink Usage Error")
    .setDescription('You must provide something for the cow to think')
  if(ctmsg.length < 1) return message.channel.send({embed: cowsayerrembed})
    message.channel.send('```' + cowsay.think({text: ctmsg, e: "oO", T: "U"}) + '```')
    console.log(boxen('[Cowthink] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + ctmsg))
    var cowthinkmlembed = new Discord.RichEmbed()
      .setColor(colors.system)
      .setTitle('Cowthink Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      // removed 
      if(modlog) return modlog.send({embed: cowthinkmlembed}).catch(console.error);
    } else {
      let ctmsg = message.content.split(' ').slice(1).join(' ')
      if(ctmsg.length < 1) return message.channel.send('You must provide something for the cow to think.')
      message.channel.send('```' + cowsay.think({text: ctmsg, e: "oO", T: "U"}) + '```')
    } 
  });
}
module.exports.help = {
  name: "cowthink",
  info: "Cow thinks what message says",
  usage: "cowthink <message>"
}
