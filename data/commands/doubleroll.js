const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')

const rollopts = ['1', '2', '3', '4', '5', '6','1', '2', '3', '4', '5', '6','1', '2', '3', '4', '5', '6','1', '2', '3', '4', '5', '6','1', '2', '3', '4', '5', '6','1', '2', '3', '4', '5', '6']

module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
    const botChoice = rollopts[Number(body)];
    const secondBotChoice = rollopts[Number(body)];
    var finalChoice = botChoice + secondBotChoice


var doublerollmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Double Roll Command Used')
  .setDescription(`${botChoice} \n${secondBotChoice}`)
  .setAuthor(message.author.username ,message.author.avatarURL)
var doublerolled = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription(`:one: :game_die: **${botChoice}**\n:two: :game_die: **${secondBotChoice}**`)
  .setAuthor(message.author.username ,message.author.avatarURL)
message.channel.send({embed: doublerolled})
console.log(boxen('[Doubleroll] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + botChoice + ' | ' + secondBotChoice))
if(modlog) return modlog.send({embed: doublerollmlembed})
  });
}
module.exports.help = {
  name: "doubleroll",
  info: "Roll two dice",
  usage: "doubleroll"
}
