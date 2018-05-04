const figlet = require('figlet');
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const webdict = require('webdict');
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
  let fmsg = message.content.split(' ').slice(1).join(' ')
  var figletembed = new Discord.RichEmbed()
    .setColor(colors.critical)
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
      .setColor(colors.system)
      .setTitle('Figlet Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      // removed 
      if(modlog) return modlog.send({embed: figletmlembed}).catch(console.error);
    });
  } else {
    let fmsg = message.content.split(' ').slice(1).join(' ')

  if(fmsg.length < 1) return message.channel.send('```' + boxen("You must provide something to *figletize*", {padding: 1}) + '```')
    figlet(fmsg, function(err, data) {
      if (err) {
        message.channel.send('An unexpected error occured.')
        return;
    }
    message.channel.send('```' + data + '```')
  });
  }
});
}
module.exports.help = {
  name: "figlet",
  info: "*Figletizes* a your message",
  usage: "figlet <message>"
}
