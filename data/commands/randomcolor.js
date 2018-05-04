const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const convert = require('color-convert');
const fs = require('fs')

module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
let color = ((1 << 24) * Math.random() | 0).toString(16);
var rhembed = new Discord.RichEmbed()
    .setTitle('Random Color')
    .setDescription(`**Hex** #${color} \n **RGB** ${convert.hex.rgb(color)} \n **LAB** ${convert.hex.lab(color)} \n **CMYK** ${convert.hex.cmyk(color)}`)
    .setColor(`#${color}`);
message.channel.send({embed: rhembed});
console.log(boxen('[Random Color] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + color, {padding: 1}))
var rhmlembed = new Discord.RichEmbed()
  .setColor(`#${color}`)
  .setTitle('Random Color Command Used')
  .setAuthor(message.author.username, message.author.displayAvatarURL)
if(modlog) return modlog.send({embed: rhmlembed}).catch(console.error);
    } else {
      let color = ((1 << 24) * Math.random() | 0).toString(16);

message.channel.send(`**Hex** #${color} \n **RGB** ${convert.hex.rgb(color)} \n **LAB** ${convert.hex.lab(color)} \n **CMYK** ${convert.hex.cmyk(color)}`);
    }
  });
}
module.exports.help = {
  name: "randomcolor",
  info: "Get a random color",
  usage: "randomhex"
}
