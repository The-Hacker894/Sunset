const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
  let total = 0;
client.guilds.map(g => total += g.memberCount)
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  var members = message.guild.memberCount
  var onlinemembers = message.guild.presences.filter(p=>p.status == 'online').size
  var idlemembers = message.guild.presences.filter(p=>p.status == 'idle').size
  var dndmembers = message.guild.presences.filter(p=>p.status == 'dnd').size
  var offlinemembers = members - onlinemembers - idlemembers - dndmembers
  var onlinemembervsmember = onlinemembers / members
  var idlemembervsmember = idlemembers / members
  var dndmembervsmember = dndmembers / members
  var offlinemembervsmember = offlinemembers / members
  var membervstotalmember = members / total
  // Math.round(1.005*100)/100
var serverinfembed = new Discord.RichEmbed()
.setColor(colors.success)
.setTitle('Server Info')
.addField('Server Name', message.guild.name + ' | ' + message.guild.id, true)
.addField('Server Region', message.guild.region, true)
.addField('Member Count', members, true)
.addField('Channel Count', message.guild.channels.size, true)
.addField('Role Count', message.guild.roles.size, true)
.addField('Online Member Count', '`' + onlinemembers + '` / ' + '`' + members + '` [`' + Math.round(onlinemembervsmember *100) + '%`]', true)
.addField('Idle Member Count', '`' + idlemembers + '` / ' + '`' + members + '` [`' + Math.round(idlemembervsmember *100) + '%`]' ,true)
.addField('Do Not Disturb Member Count', '`' + dndmembers + '` / ' + '`' + members + '` [`' + Math.round(dndmembervsmember *100) + '%`]',true )
.addField('Offline Member Count', '`' + offlinemembers + '` / `' + members + '` [`' + Math.round(offlinemembervsmember *100) + '%`]', true)
.setThumbnail(message.guild.iconURL)
// thanks to Felix for this
// removed 

message.channel.send({embed: serverinfembed}).catch(console.error);
console.log(boxen('[ServerInfo] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var serverinfmlembed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle('Server Info Command Used')
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
if(modlog) return modlog.send({embed: serverinfmlembed}).catch(console.error);
    } else {
      let total = 0;
client.guilds.map(g => total += g.memberCount)
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  var members = message.guild.memberCount
  var onlinemembers = message.guild.presences.filter(p=>p.status == 'online').size
  var idlemembers = message.guild.presences.filter(p=>p.status == 'idle').size
  var dndmembers = message.guild.presences.filter(p=>p.status == 'dnd').size
  var offlinemembers = members - onlinemembers - idlemembers - dndmembers
  var onlinemembervsmember = onlinemembers / members
  var idlemembervsmember = idlemembers / members
  var dndmembervsmember = dndmembers / members
  var offlinemembervsmember = offlinemembers / members
  var membervstotalmember = members / total
  // Math.round(1.005*100)/100
var serverinfembed = new Discord.RichEmbed()
.setColor(colors.system)
.setTitle('Server Info')
.addField('Server Name', message.guild.name + ' | ' + message.guild.id, true)
.addField('Server Region', message.guild.region, true)
.addField('Member Count', members, true)
.addField('Channel Count', message.guild.channels.size, true)
.addField('Role Count', message.guild.roles.size, true)
.addField('Online Member Count', '`' + onlinemembers + '` / ' + '`' + members + '` [`' + Math.round(onlinemembervsmember *100) + '%`]', true)
.addField('Idle Member Count', '`' + idlemembers + '` / ' + '`' + members + '` [`' + Math.round(idlemembervsmember *100) + '%`]' ,true)
.addField('Do Not Disturb Member Count', '`' + dndmembers + '` / ' + '`' + members + '` [`' + Math.round(dndmembervsmember *100) + '%`]',true )
.addField('Offline Member Count', '`' + offlinemembers + '` / `' + members + '` [`' + Math.round(offlinemembervsmember *100) + '%`]', true)
.setThumbnail(message.guild.iconURL)
// thanks to Felix for this
// removed 

message.channel.send({embed: serverinfembed}).catch(console.error);
    }
  });
}
module.exports.help = {
  name: "serverinfo",
  info: "Shows info on the current server",
  usage: "serverinfo"
}
