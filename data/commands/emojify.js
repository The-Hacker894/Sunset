const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
translate = require('moji-translate');
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
  let emsg = message.content.split(' ').slice(1).join(' ')
  var emojierrembed = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setTitle("Emoji Usage Error")
    .setDescription('You must provide something to emojify')
  var emojifyerror = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setTitle('Emojify Error')
    .setDescription('Cannot emojify ' + emsg)
  if(emsg.length < 1) return message.channel.send({embed: emojierrembed})
  if(translate.translate(emsg) === emsg) return message.channel.send({embed: emojifyerror})
  message.channel.send(translate.translate(emsg));
  console.log(boxen('[Emojify] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + emsg + ' | ' + translate.translate(emsg)))
  var emojimlembed = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle('Emoji Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
    if(modlog) return modlog.send({embed: emojimlembed}).catch(console.error);
    } else {
      let emsg = message.content.split(' ').slice(1).join(' ')

  if(emsg.length < 1) return message.channel.send('You must provide something to emojify')
  if(translate.translate(emsg) === emsg) return message.channel.send('Cannot emojify ' + emsg)
  message.channel.send(translate.translate(emsg));
    }
  });
}
module.exports.help = {
  name: "emojify",
  info: "Emojifies the given message *if possible*",
  usage: "emojify <message>"
}
