const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const writeFile = require("write")
const talkedRecently = new Set();
module.exports.run = (client, message, args, data, game, announcement) => {
    const modlog = message.guild.channels.find('name', 'mod-log');
    if (talkedRecently.has(message.author.id))
    return;
  
  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 1650);
message.channel.startTyping()
var text = message.content.split(' ').slice(1).join(' ')
if(text.length < 1) return message.channel.send('Please provide text to write')
writeFile(`./data/textfiles/${message.author.id}.txt`, text, function(err) {
    if (err) console.log(err);
  });
setTimeout(Timer, 1500);
function Timer() {
    message.channel.send(new Attachment(`./data/textfiles/${message.author.id}.txt`, `textfile.txt`)).then(message => {
        message.channel.stopTyping()
    });
    console.log(boxen('[CreateTXT] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
    var lastqrmlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('CreateTXT Command Used')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        if(modlog) return modlog.send({embed: lastqrmlembed})
}
}
module.exports.help = {
    name: "createtxt",
    info: "Creates a text file",
    usage: "createtxt <text>"
}