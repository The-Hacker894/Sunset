const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs');
module.exports.run = (client, message, args, data, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
      var pingmlembed = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Ping Command used')
        .setAuthor(message.author.username ,message.author.avatarURL)
      var pingstart = new Discord.RichEmbed()
        .setColor(colors.success)
        .setDescription('Pinging...')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
      message.channel.send({embed: pingstart}).then(sent => {
        var pinged = new Discord.RichEmbed()
          .setColor(colors.success)
          .setTitle('**Pong!**')
          .setDescription(`${sent.createdTimestamp - message.createdTimestamp}ms`)
//`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`
        sent.edit({embed: pinged})
        console.log(boxen('[Ping] ' + sent.createdTimestamp - message.createdTimestamp + 'ms | ' + message.guild.name + ' | ' + message.author.tag , {padding: 1}))
        message.delete()
      })
      if(modlog) return modlog.send({embed: pingmlembed})
    } else {
      message.channel.send('Pinging...').then(sent => {
      sent.edit(`**Pong!**\n${sent.createdTimestamp - message.createdTimestamp}ms`)
      });
    }
  });
}

module.exports.help = {
  name: "ping",
  info: "Check the ping between the Discord API and yourself",
  usage: "ping"
}
