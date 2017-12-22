const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const pusage = require('pidusage')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  pusage.stat(process.pid, function (err, stat) {
    const cpuusage = parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2)
    const memusage = parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2)
    var pusageembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Usage')
      .setDescription('\n CPU: ' + cpuusage + '% \n Memory: ' + memusage + 'MB')
    message.channel.send({embed: pusageembed}).then( () => {
      pusage.unmonitor(process.pid)
    })
    console.log(boxen('[Usage] ' + message.guild.name + ' | ' + message.author.tag + ' | CPU: ' + cpuusage + '% Memory: ' + memusage + 'MB', {padding: 1}))
    var pusagemlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Usage Command Used')
      .setDescription('CPU: ' + cpuusage + '% \n Memory: ' + memusage + 'MB')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      if(modlog) return modlog.send({embed: pusagemlembed}).catch(console.error);
  });
}
module.exports.help = {
  name: "usage",
  info: "Gets the CPU and Memory Usage of Sunset",
  usage: "usage"
}
