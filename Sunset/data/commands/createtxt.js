const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const writeFile = require("write")
const talkedRecently = new Set();
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
    const modlog = message.guild.channels.find('name', 'mod-log');
    if (talkedRecently.has(message.author.id))
    return;
  
  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 1650);

var text = message.content.split(' ').slice(1).join(' ')
if(text.length < 1) return message.channel.send('Please provide text to write')
writeFile(`./data/serverdata/${message.guild.id}/textfiles/${message.author.id}.txt`, text, function(err) {
    if (err) console.log(err);
  });
setTimeout(Timer, 1500);
function Timer() {
    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/textfiles/${message.author.id}.txt`, `textfile.txt`)).then(message => {
        message.channel.stopTyping()
    });
    console.log(boxen('[CreateTXT] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
    var lastqrmlembed = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('CreateTXT Command Used')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        if(modlog) return modlog.send({embed: lastqrmlembed})

}
    } else {
      
      var text = message.content.split(' ').slice(1).join(' ')
if(text.length < 1) return message.channel.send('Please provide text to write')
message.channel.startTyping()
writeFile(`./data/serverdata/${message.guild.id}/textfiles/${message.author.id}.txt`, text, function(err) {
    if (err) console.log(err);
  });
setTimeout(Timer, 1500);
function Timer() {
    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/textfiles/${message.author.id}.txt`, `textfile.txt`)).then(message => {
        message.channel.stopTyping()
    });
  }
    }
  });
}
module.exports.help = {
    name: "createtxt",
    info: "Creates a text file",
    usage: "createtxt <text>"
}