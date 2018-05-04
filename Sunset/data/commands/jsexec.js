const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require("fs")
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  if(message.author.id !== data.ownerid) return message.channel.send('**Owner-Only Commands**')   

  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var wronguserembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('**Owner Only Command**')
  .setDescription('*This command is exclusive to the owner of this bot*')
  // removed 
var jsexecmlerrembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('JSExec Command Used by Non-Owner')
  .setDescription(message.author.username)
  // removed 

var jsexecmlembed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle('JSExec Command Used by Owner')
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 



const execute = eval(message.content.split(' ').slice(1).join(' '))
const something2execute = message.content.split(' ').slice(1).join(' ')
var noevalembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('JS Exec Usage')
  .setDescription("Please provide something to evaluate")
  .addField(data.prefix + 'jsexec <evaluation>','<evaluation> = Something to evaluate.')
  // removed 
/*>jsexec var weather = require('weather-js');
 
// Options: 
// search:     location name or zipcode 
// degreeType: F or C 
 
weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);
 
  console.log(JSON.stringify(result, null, 2));
});*/

if (something2execute.length < 1) return message.channel.send({embed: noevalembed}).catch(console.error);


var jsembed = new Discord.RichEmbed()
 .setColor(colors.success)
 .setTitle("JS Execution")
 .setDescription(`:inbox_tray: **Input**\n${something2execute}\n\n:outbox_tray: **Output**\n${execute}`)
 .setFooter('NodeJS Execution')
// removed 
    message.channel.send({embed: jsembed}).catch(console.error);
    console.log(boxen('[JS Execution] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
    if(modlog) return modlog.send({embed: jsexecmlembed}).catch(console.error);
}
module.exports.help = {
  name: "jsexec",
  info: "Execute something is NodeJS",
  usage: "jsexec <execution>"
}
