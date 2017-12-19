const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var sayttsembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('SayTTS Usage')
.setDescription('You must provide a message to say using TTS')
.addField(data.prefix + 'saytts <messagetts>',':x')
// removed 

const message2saytts = message.content.split(' ').slice(1).join(' ')
if(message2saytts < 1) return message.channel.send({embed: sayttsembed}).catch(console.error);
message.channel.send(message2saytts, {
tts: true
}).catch(console.error);
message.delete()
var sayttsmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Say TTS Command Used')
  .setDescription(message.author.username)
  .addField(message2saytts, '_')
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
  if(modlog) return modlog.send({embed: sayttsmlembed}).catch(console.error);
}
module.exports.help = {
  name: "saytts",
  info: "Send a TTS message through Sunset",
  usage: "saytts <message>"
}
