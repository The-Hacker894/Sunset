const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
function rollyodice() {
  var rand = ['**1**','**2**','**3**','**4**','**5**','**6**']

return rand[Math.floor(Math.random()*rand.length)];
}
function rollyodoubledice() {
var rand = ['**2**','**3**','**4**','**5**','**6**','**7**','**8**','**9**','**10**','**11**','**12**']
return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var doublerollmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Double Roll Command Used')
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
  .addField(rollyodoubledice(), '_')
message.channel.send(':game_die: :game_die: **|** ' + rollyodoubledice())
console.log(boxen('[Doubleroll] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rollyodice() + ' | ' + rollyodoubledice()))
if(modlog) return modlog.send({embed: doublerollmlembed})
}
module.exports.help = {
  name: "doubleroll",
  info: "Roll two dice",
  usage: "doubleroll"
}
