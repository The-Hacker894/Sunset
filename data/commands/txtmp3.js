const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const speak = require('simple-tts');
const talkedRecently = new Set();
const fs = require("fs")
// `./data/txttomp3/${message.author.id}.mp3`
module.exports.run = (client, message, args, data, game, announcement) => {
    if (talkedRecently.has(message.author.id))
    return;
  
  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 2150);
    const modlog = message.guild.channels.find('name', 'mod-log');
message.channel.startTyping()
var mp3text = message.content.split(' ').slice(1).join(' ')
if(mp3text.length < 1) return message.channel.send('Please provide text to transform into a MP3')
if(mp3text.includes('<@')) return message.channel.send('Please remove any and all user mentions from the message.')
if(mp3text.includes('<@&')) return message.channel.send('Please remove any and all role mentions from the message.')
if(mp3text.includes('<#')) return message.channel.send('Please remove any and all channel mentions from the message.')

// usage case 2 - creates the file /tmp/hello_world.mp3 in your OS (for caching or other purposes, the filename extension is automatically appended to the give filename) 
speak(mp3text, {format:'mp3', filename:`./data/txttomp3/${message.author.id}`});

 setTimeout(Timer, 1500);
function Timer() {
    message.channel.send(new Attachment(`./data/txttomp3/${message.author.id}.mp3`, `text.mp3`)).then(message => {
        message.channel.stopTyping()
    }); 
} 
    console.log(boxen('[Text MP3] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var qrcodemlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Text MP3 Command Used')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
if(modlog) return modlog.send({embed: qrcodemlembed})

}
module.exports.help = {
    name: "txtmp3",
    info: "Generate a MP3 File from text",
    usage: "txtmp3 <text>"
}