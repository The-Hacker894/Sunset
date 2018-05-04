const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  var helpembed = new Discord.RichEmbed()
  .setColor(colors.system)
    .setTitle('Sunset Commands')
    .addField('**Information**','`litemode` `help` `ping` `info`')
    .addField('**Server Info**','`inspect` `serversettings` `invite` `serverinfo` `avatar` `profile`')
    .addField('**Entertainment**','`translate` `cleverbot` `emojify` `cowthink` `cowsay` `fliptext` `figlet` `say` `2ball` `8ball`')
    .addField('**More Entertainment**', '`copycat` `timer` `urban` `dictionary` `google` `coinflip` `roll`')
    .addField('**Economy**', '`atm` `bal` `pay` `freemoney` `lottery` `rob` `clearmoney`')
    .addField('**Content Generation**', '`morsecode` `binary` `url` `base64` `qrcode` `lastqr` `createtxt` `lasttxt`')
    .addField('**Moderation**','`warn` `warnings` `rules` `channelsettings` `mute` `unmute` `ban` `unban` `kick` `purge` `mkchannel` `delchannel` `setnick`')
    .addField('**Other**','`randomcolor` `error-report`')
    .addField('**Owner Only Commands**','`jsexec` `flush` `settings` `setmoney`')

message.channel.send({embed: helpembed})
console.log(boxen('[Help] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var helpmlembed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle('Help Command Used')
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
if(modlog) return modlog.send({embed: helpmlembed}).catch(console.error);
    } else {
      var helpembed = new Discord.RichEmbed()
  .setColor(colors.system)
    .setTitle('Sunset LiteMode Commands')
    .addField('**Information**','`litemode` `help` `ping` `info` `profile` `serverinfo` `invite`')
    .addField('**Moderation**','`setnick` `softban` `ban` `kick` `unban` `purge` `mkchannel` `delchannel` `channelsettings`')
    .addField('**Entertainment**','`copycat` `math` `cleverbot` `2ball` `8ball` `cowsay` `cowthink` `dictionary` `emojify` `figlet` `fliptext` `google` `reverse` `roll` `rps` `say` `timer` `urban` `randomcolor`')
    .addField('**File Generation**', '`morsecode` `binary` `url` `base64` `qrcode` `lastqr` `createtxt` `lasttxt`')
    .addField('**Owner-Only**', '`flush` `settings`')

message.channel.send({embed: helpembed})
    }
  });
}
module.exports.help = {
  name: "help",
  info: "Get documentation on all of Sunset's commands",
  usage: "help"
}
