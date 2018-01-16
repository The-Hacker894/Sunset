const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const cowsay = require('cowsay');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  let csmsg = message.content.split(' ').slice(1).join(' ')
  var cowsayerrembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle("Cowsay Usage Error")
    .setDescription('You must provide something for the cow to say')
  if(csmsg.length < 1) return message.channel.send({embed: cowsayerrembed})
    message.channel.send('```' + cowsay.say({text: csmsg, e: "oO", T: "U"}) + '```')
    console.log(boxen('[Cowsay] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + csmsg, {padding: 1}))
    var cowsaymlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Cowsay Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      // removed 
      if(modlog) return modlog.send({embed: cowsaymlembed}).catch(console.error);
}
module.exports.help = {
  name: "cowsay",
  info: "Cows says what message says",
  usage: "cowsay <message>"
}
