const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const writeFile = require("write")
const fs = require('fs')
const talkedRecently = new Set();
const modes = ['write', 'recover']
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 

  var option = args[1]
var text = message.content.split(/\s+/g).slice(2).join(" ");

  if (!fs.existsSync(`./data/serverdata/${message.guild.id}/litemode.txt`)) {
    fs.writeFileSync(`./data/serverdata/${message.guild.id}/litemode.txt`, 'false', function(err) {
    });
  };
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
    const modlog = message.guild.channels.find('name', 'mod-log');
    if (talkedRecently.has(message.author.id))
    return;
  
    var noArgs = new Discord.RichEmbed()
      .setColor(colors.system)
      .setTitle('TXT')
      .setDescription('**Write a Text File**\n' +
                      '`' + data.prefix + 'txt write <text>`\n' +
                      '**Recover Last Text File**\n' +
                      '`' + data.prefix + 'txt recover`')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    var noValidMode = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('TXT Error')
        .setDescription('Mode provided is not valid.\n**Example**\n`txt recover`\n`txt write <text`')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    if(!option) return message.channel.send({embed: noArgs})

    if(modes.some(mde => option.includes(mde))) {

  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 1650);


if(option.includes('write')) {
    if(text.length < 1) return message.channel.send('Please provide text to write')

writeFile(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, text, function(err) {
    if (err) console.log(err);
  });
setTimeout(Timer, 1500);
function Timer() {
    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, `textfile.txt`)).then(message => {
        message.channel.stopTyping()
    });
    console.log(boxen('[txt] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
    var lastqrmlembed = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('txt Command Used')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        if(modlog) return modlog.send({embed: lastqrmlembed})
    return;
} 
return;  
} 
if(option.includes('recover')) {
    message.channel.startTyping()
    fs.exists(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(exists) {
        if (exists) {
          fs.stat(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(err, stats) { 
            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, `textfile.txt`)).then(message => {
                message.channel.stopTyping()
            });
          });
        } else {
          message.channel.send('You do not have any previous Text Files').then(message => {
              message.channel.stopTyping()
          })
        }
      });
      return;
}
return;
// TODO: Make embed
    } else return message.channel.send({embed: noValidMode})

    } else {
        //LiteMode
        if (talkedRecently.has(message.author.id))
        return;
      
        var noArgs = '**Write a Text File**\n' +
                          '`' + data.prefix + 'txt write <text>`\n' +
                          '**Recover Last Text File**\n' +
                          '`' + data.prefix + 'txt recover`'
        var noValidMode = 'Mode provided is not valid.\n**Example**\n`txt recover`\n`txt write <text`'

        if(!option) return message.channel.send('```'+ boxen(noArgs, {padding: 1}) +'```')
    
        if(modes.some(mde => option.includes(mde))) {
    
      // Adds the user to the set so that they can't talk for 2.5 seconds
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after 2.5 seconds
        talkedRecently.delete(message.author.id);
      }, 1650);
    
    
    if(option.includes('write')) {
        if(text.length < 1) return message.channel.send('Please provide text to write')
    
    writeFile(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, text, function(err) {
        if (err) console.log(err);
      });
    setTimeout(Timer, 1500);
    function Timer() {
        message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, `textfile.txt`)).then(message => {
            message.channel.stopTyping()
        });
    
        return;
    } 
    return;  
    } 
    if(option.includes('recover')) {
        message.channel.startTyping()
        fs.exists(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(exists) {
            if (exists) {
              fs.stat(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, function(err, stats) { 
                message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/text/${message.author.id}.txt`, `textfile.txt`)).then(message => {
                    message.channel.stopTyping()
                });
              });
            } else {
              message.channel.send('You do not have any previous Text Files').then(message => {
                  message.channel.stopTyping()
              })
            }
          });
          return;
    }
    return;
    // TODO: Make embed
        } else return message.channel.send('```' + boxen(noValidMode, {padding: 1}) +'```')
    
    }
  });

}
module.exports.help = {
    name: "txt",
    info: "Creates a text file",
    usage: "txt <mode> <text>"
}