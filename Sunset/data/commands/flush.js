const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Command**`).catch(console.error);
  let flushmessage = message.content.split(' ').slice(1).join(' ')
  var flushinfoembed = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle("Flush Info")
    .setDescription('This command is used to reload certain things')
    .addField('Game',data.prefix + 'flush game')
    .addField('Activity', data.prefix + 'flush activity')
    .addField('Session', data.prefix + 'flush session')
    .addField('Process', data.prefix + 'flush process')
  if(flushmessage.length < 1) return message.channel.send({embed: flushinfoembed})
  if(flushmessage === `game`) {
    var flushgamesuccessembed = new Discord.RichEmbed()
      .setColor(colors.system)
      .setTitle('Flushed Game')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
    client.user.setGame(game.game + ' | ' + data.prefix + 'help', { type: game.activity })
      message.channel.send({embed: flushgamesuccessembed})
  }
  if(flushmessage === `activity`) {
    var flushgamesuccessembed = new Discord.RichEmbed()
      .setColor(colors.success)
      .setTitle('Flushed Activity')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
    client.user.setGame(game.game + ' | ' + data.prefix + 'help', { type: game.activity })
      message.channel.send({embed: flushgamesuccessembed})
  }
  if(flushmessage === `session`) {
    var flushannouncementsuccessembed = new Discord.RichEmbed()
      .setColor(colors.success)
      .setTitle('Flushing Session')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      message.channel.send({embed: flushannouncementsuccessembed})
        client.destroy()
        client.login(data.token)
  }
  if(flushmessage === `process`) {
    var flushprocesssuccessembed = new Discord.RichEmbed()
      .setColor(colors.success)
      .setTitle('Flushing Process')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      message.channel.send({embed: flushprocesssuccessembed})
        process.exit(0);
  }
}
module.exports.help = {
  name: "flush",
  info: "Reload parts of Sunset",
  usage: "flush <item>"
}
