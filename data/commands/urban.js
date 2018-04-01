const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const webdict = require('webdict');
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
const urbandictsearch = message.content.split(' ').slice(1).join(' ')
webdict('urbandictionary', urbandictsearch).then(resp => {
    var urbandicterrorembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Urban Dictionary Error')
      .setDescription('**No Dictionary Entry for ' + urbandictsearch + '**')
      .addField(data.prefix + 'urban <word>','<word> = Word from the English Dictionary')
    var urbandictlengthembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Urban Dictionary Length Error')
      .setDescription('You must provide a word to search for')
      .addField(data.prefix + 'urban <word>','<word> = Word from the English Dictionary')
      var nsfwtermserrorembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('NSFW Terms')
      .setDescription('The Urban Dictionary Definition of *' + urbandictsearch + '* are apart of the *NSFW Terms*. Please try again in a channel marked `NSFW`')
    var urbandictembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
      .setTitle('Urban Dictionary Definition')
      .setDescription('**Word:** ' + urbandictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      // removed 
      .setThumbnail('https://i.imgur.com/x7kfvJ5.png')
var nsfwterms = data.nsfwterms
      var defcheck = resp.definition
    if(!resp.definition) return message.channel.send({embed: urbandicterrorembed}).then(message => {
      message.channel.stopTyping()
    })
    if(urbandictsearch.length < 1) return message.channel.send({embed: urbandictlengthembed}).then(message => {
      message.channel.stopTyping()
    })
    if(message.channel.nsfw) {
      console.log(boxen('[Urban] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + urbandictsearch, {padding: 1}))
      if(resp.definition.length > 2048) return message.channel.send('Definition too long for Discord. :(')
      message.channel.send({embed: urbandictembed}).then(message => {
        message.channel.stopTyping()
      })
      if(modlog) return modlog.send({embed: urbandictmlembed})
    } else {
      if(nsfwterms.some(terms => defcheck.includes(terms))) {
        message.channel.send({embed: nsfwtermserrorembed})
        if(modlog) return modlog.send({embed: nsfwtermserrorembed})
      } else {
        if(nsfwterms.some(terms => urbandictsearch.includes(terms))) {
          message.channel.send({embed: nsfwtermserrorembed})
          if(modlog) return modlog.send({embed: nsfwtermserrorembed})
        } else {
          console.log(boxen('[Urban] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + urbandictsearch, {padding: 1}))
        if(resp.definition.length > 2048) return message.channel.send('Definition too long for Discord. :(')
        message.channel.send({embed: urbandictembed}).then(message => {
          message.channel.stopTyping()
        })
        if(modlog) return modlog.send({embed: urbandictmlembed})
        }
        
      }
    }
    var urbandictmlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Urban Dictionary Command Used')
      .setDescription('**Word:** ' + urbandictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      // removed 
    if(modlog) return modlog.channel.send({embed: urbandictmlembed})
    })
  
}
module.exports.help = {
  name: "urban",
  info: "Get the Urban Dictionary Definition of a word",
  usage: "urban <word>"
}
