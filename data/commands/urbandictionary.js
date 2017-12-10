const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
const momenttime = moment().format('h:mm:ss a')
const webdict = require('webdict');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
const ubdictsearch = message.content.split(' ').slice(1).join(' ')
  webdict('urbandictionary', ubdictsearch).then(resp => {
    message.channel.startTyping()
      var ubdicterrorembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
        .setTitle('Urban Dictionary Error')
        .setDescription('**No Dictionary Entry for ' + ubdictsearch + '**')
        .addField(data.prefix + 'urbandictionary <word>','<word> = Word from the English Dictionary')
      var ubdictlengthembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Urban Dictionary Length Error')
        .setDescription('You must provide a word to search for')
        .addField(data.prefix + 'urbandictionary <word>','<word> = Word from the English Dictionary')
      if(!resp.definition) return message.channel.send({embed: ubdicterrorembed})
      if(ubdictsearch.length < 1) return message.channel.send({embed: ubdictlengthembed})
      var ubdictembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Urban Dictionary Definition')
        .setDescription('**Word:** ' + ubdictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setFooter(embedfooter)
        .setThumbnail('https://i.imgur.com/x7kfvJ5.png')
      message.channel.send({embed: ubdictembed})
      var ubdictmlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Urban Dictionary Command Used')
        .setDescription('**Word:** ' + ubdictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setFooter(embedfooter)
        message.channel.stopTyping()
      if(modlog) return modlog.channel.send({embed: ubdictmlembed})
    });

  }
module.exports.help = {
  name: "urbandictionary",
  info: "Get the Urban Dictionary Definition of a word",
  usage: "urbandictionary <word>"
}
