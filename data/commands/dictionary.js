
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const webdict = require('webdict');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
const dictsearch = message.content.split(' ').slice(1).join(' ')
const modlog = message.guild.channels.find('name', 'mod-log');
const announcements = message.guild.channels.find('name', 'announcements')
webdict('dictionary', dictsearch).then(resp => {
  
    var dicterrorembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Dictionary Error')
      .setDescription('**No Dictionary Entry for ' + dictsearch + '**')
      .addField(data.prefix + 'dictionary <word>','<word> = Word from the English Dictionary')
    var dictlengthembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Dictionary Length Error')
      .setDescription('You must provide a word to search for')
      .addField(data.prefix + 'dictionary <word>','<word> = Word from the English Dictionary')
    if(!resp.definition) return message.channel.send({embed: dicterrorembed})
    if(dictsearch.length < 1) return message.channel.send({embed: dictlengthembed})
    var dictembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Dictionary Definition')
      .setDescription('**Word:** ' + dictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setThumbnail('https://i.imgur.com/yVw1L69.jpg')
    message.channel.send({embed: dictembed})
    console.log(boxen('[Dictionary] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + dictsearch))
    var dictmlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Dictionary Command Used')
      .setDescription('**Word:** ' + dictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)

    if(modlog) return modlog.channel.send({embed: dictmlembed})
  });
}
module.exports.help = {
  name: "dictionary",
  info: "Search the definition of a word",
  usage: "dictionary <word>"
}
