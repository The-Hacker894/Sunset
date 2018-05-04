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
var channelname = message.content.split(' ').slice(1).join(' ')
var inviteChannel = channelname.substr(2).slice(0, -1);
    var IIchannel = client.channels.find("id", inviteChannel)
    var inviteChannelExists = client.channels.exists("id", inviteChannel)
var channelnameerrembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle("Channel Name Error")
  .setDescription('Please provide a **valid** channel name')
var noChannel = new Discord.RichEmbed()
      .setColor(colors.critical)
      .setTitle('Channel Doesn\'t Exist')
      .setDescription('That channel does not exist')
if(channelname.length < 1) return message.channel.send({embed: channelnameerrembed})
if(!inviteChannelExists) return message.channel.send({embed: noChannel})
if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send("**I do not have permissions to do that**")
IIchannel.createInvite().then(invite =>
      message.channel.send(invite.url).then( () => {
        console.log(boxen('[Channel Invite] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + channelname + ' | ' + invite.url, {padding: 1})) .then(message => {
        })
      })
  );
} else {
  //LiteMode

  var channelname = message.content.split(' ').slice(1).join(' ')
var inviteChannel = channelname.substr(2).slice(0, -1);
    var IIchannel = client.channels.find("id", inviteChannel)
    var inviteChannelExists = client.channels.exists("id", inviteChannel)

if(channelname.length < 1) return message.channel.send('Please provide a **valid** channel name')
if(!inviteChannelExists) return message.channel.send('That channel does not exist')

if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send("**I do not have permissions to do that**")
IIchannel.createInvite().then(invite =>
      message.channel.send(invite.url)
      
  );
}
  });
}
module.exports.help = {
  name: "invite",
  info: "Creates an invite for the given channel",
  usage: "invite <channel>"
}
