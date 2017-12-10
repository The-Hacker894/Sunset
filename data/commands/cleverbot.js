const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
const cleverbot = require("cleverbot.io")
const clever = new cleverbot('MzNwGnyfgL1iW54C','uZBfESqRedUjuajf0DJ78jD5LWEK5JWe');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  message.channel.startTyping()
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
const clevermessage = message.content.split(' ').slice(1).join(' ')
if(clevermessage.length < 1) return message.channel.send("Please provide a message.")
clever.setNick("Sunset")
clever.create(function (err, session) {
  clever.ask(clevermessage, function (err, response) {
    message.channel.send(message.author.toString() + ', ' + response);
    message.channel.stopTyping()
    var cleverbotmlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('CleverBot Command Used')
    .setDescription('**Message:** ' + clevermessage + '\n **Reply:** ' + response)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    if(modlog) return modlog.send({embed: cleverbotmlembed})
  });
});
}
module.exports.help = {
  name: "cleverbot",
  info: "Cleverbot.io at its finest",
  usage: "cleverbot <message>"
}
