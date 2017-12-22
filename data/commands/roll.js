const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
function rollyodice() {
  var rand = ['**1**','**2**','**3**','**4**','**5**','**6**']

return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = (client, message, args) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var rollmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Roll Commad Used')
  .setDescription(message.author.username)
  .addField(rollyodice(), '_')
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
message.channel.send(':game_die: **|** ' + rollyodice())
console.log(boxen('[Roll] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rollyodice(), {padding: 1}))
if(modlog) return modlog.send({embed: rollmlembed})
}
module.exports.help = {
  name: "roll",
  info: "Roll a die",
  usage: "roll"
}
