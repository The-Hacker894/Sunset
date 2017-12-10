const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
function coinflipping() {
var rand = ['Heads!', 'Tails!', 'Heads!', 'Tails!','Heads!', 'Tails!','Heads!', 'Tails!',]
return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var coinflipmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('CoinFlip Command Used')
  .setDescription(message.author.username)
  .addField(coinflipping(), "_")
  .setAuthor(message.author.username ,message.author.avatarURL)
  .setFooter(embedfooter)
  message.channel.send('We have, ' + coinflipping());
  if(modlog) return modlog.send({embed: coinflipmlembed}).catch(console.error);
}
module.exports.help = {
  name: "coinflip",
  info: "Flip a coin!",
  usage: "coinflip"
}
