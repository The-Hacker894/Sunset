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
  var helpembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
    .setTitle('Sunset Commands')
    .addField('**Information**','`help` `ping` `info` `usage` `uptime`')
    .addField('**Server Info**','`serversettings` `invite` `serverinfo` `avatar` `profile`')
    .addField('**Entertainment**','`tweet` `translate` `cleverbot` `emojify` `cowthink` `cowsay` `fliptext` `figlet` `say` `2ball` `8ball`')
    .addField('**More Entertainment**', '`timer` `urbandictionary` `dictionary` `google` `coinflip` `roll`')
    .addField('**Economy**', '`atm` `bal` `pay` `freemoney` `lottery` `rob` `clearmoney`')
    .addField('**Content Generation**', '`binary` `url` `base64` `qrcode` `lastqr` `createtxt` `lasttxt`')
    .addField('**Moderation**','`warn` `warnings` `rules` `channelsettings` `mute` `unmute` `ban` `unban` `kick` `purge` `mkchannel` `delchannel` `setnick`')
    .addField('**Other**','`randomcolor` `error-report`')
    .addField('**Owner Only Commands**','`jsexec` `flush` `settings` `setmoney`')

message.channel.send({embed: helpembed})
console.log(boxen('[Help] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var helpmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Help Command Used')
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
if(modlog) return modlog.send({embed: helpmlembed}).catch(console.error);
}
module.exports.help = {
  name: "help",
  info: "Get documentation on all of Sunset's commands",
  usage: "help"
}
