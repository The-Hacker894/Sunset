const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
      var pingmlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Ping Command used')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      message.channel.send('Pinging...').then(sent => {
        sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)
        message.delete()
      })
      if(modlog) return modlog.send({embed: pingmlembed})
}

module.exports.help = {
  name: "ping",
  info: "Check the ping between the Discord API and yourself",
  usage: "ping"
}
