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
const channelname = message.content.split(' ').slice(1).join(' ')
const channelinvite = message.guild.channels.find('name', channelname)
var channelnameerrembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle("Channel Name Error")
  .setDescription('Please provide a **valid** channel name')
if(channelname.length < 1) return message.channel.send({embed: channelnameerrembed})
if(!channelinvite) return message.channel.send({embed: channelnameerrembed})
if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send("**I do not have permissions to do that**")
channelinvite.createInvite().then(invite =>
      message.channel.send(invite.url).then( () => {
        console.log(boxen('[Channel Invite] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + channelname + ' | ' + invite.url, {padding: 1})) .then(message => {
        })
      })
  );
}
module.exports.help = {
  name: "invite",
  info: "Creates an invite for the given channel",
  usage: "invite <channelname>"
}
