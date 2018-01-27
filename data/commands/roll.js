const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
  const opts = ['**1**','**2**','**3**','**4**','**5**','**6**']

module.exports.run = (client, message, args, data) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')

  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
    const botChoice = opts[Number(body)];
var rollmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Roll Commad Used')
  .setDescription(message.author.username)
  .addField(botChoice, '_')
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
  var rolled = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription(':game_die: **|** ' + botChoice)
    .setAuthor(message.author.username ,message.author.avatarURL)
message.channel.send({embed: rolled})
console.log(boxen('[Roll] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + botChoice, {padding: 1}))
if(modlog) return modlog.send({embed: rollmlembed})
});
}
module.exports.help = {
  name: "roll",
  info: "Roll a die",
  usage: "roll"
}
