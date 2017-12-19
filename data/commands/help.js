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
  var helpembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
    .setTitle('Commands')
    .addField('**Information**','`help` `disclaimer` `ping` `info` `usage` `announcement` `uptime` `avatar` `profile` `whois`')
    .addField('**Server Info**','`invite` `serverinfo` `membercount`')
    .addField('**Entertainment**','`cleverbot` `emojify` `cowthink` `cowsay` `fliptext` `figlet` `say` `2ball` `8ball`')
    .addField('**More Entertainment**', '`timer` `urbandictionary` `dictionary` `youtube` `google` `vote` `coinflip` `roll` `doubleroll`')
    .addField('**Moderation**','`lockdown` `channelsettings` `ban` `unban` `kick` `purge` `mkchannel` `mkvoicechannel` `channeldelete` `mod-logcreate` `announcementscreate` `setnick`')
    .addField('**Other**','`randomcolor` `error-report` `importthis`')
    .addField('**WIP**','`warn`')
    .addField('**Owner Only Commands**','`jsexec` `flush` `settings`')
    // removed 
message.channel.send({embed: helpembed})
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
