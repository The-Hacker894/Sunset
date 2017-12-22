const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  const votereason = message.content.split(' ').slice(1).join(' ')
  var voteembed = new Discord.RichEmbed()
    .setTitle('Vote')
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setColor(data.embedcolor)
    .setDescription(votereason)
    .addField('Instructions', ':a: = Yes | :b: = No')
    .setFooter('Poll setup at ' + embedfooter)
    message.delete()
    message.channel.send({embed: voteembed}).then(function (message) {
        message.react('🅰')
        message.react('🅱')

      });
      console.log(boxen('[Vote] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + votereason))
      var votemlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Vote Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .addField(votereason, "-")
        // removed 
      if(modlog) return modlog.send({embed: votemlembed}).catch(console.error);
}
module.exports.help = {
  name: "vote",
  info: "Setup a voting poll",
  usage: "vote <info>"
}
