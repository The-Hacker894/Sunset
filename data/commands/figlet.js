const figlet = require('figlet');
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const webdict = require('webdict');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  const fmsg = message.content.split(' ').slice(1).join(' ')
  var figletembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle("Figlet Usage")
    .setDescription("You must provide something to *figletize*")
  if(fmsg.length < 1) return message.channel.send({embed: figletembed})
    figlet(fmsg, function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    message.channel.send('```' + data + '```')
    console.log(boxen('[Figlet] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + fmsg))
    var figletmlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Figlet Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      // removed 
      if(modlog) return modlog.send({embed: figletmlembed}).catch(console.error);
    });
}
module.exports.help = {
  name: "figlet",
  info: "*Figletizes* a your message",
  usage: "figlet <message>"
}
