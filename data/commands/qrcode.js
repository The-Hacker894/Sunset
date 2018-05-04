const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const qr = require("qr-image")
const fs = require('fs')

const talkedRecently = new Set();
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
    if (talkedRecently.has(message.author.id))
    return;
  
  // Adds the user to the set so that they can't talk for 2.5 seconds
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after 2.5 seconds
    talkedRecently.delete(message.author.id);
  }, 1150);
    const modlog = message.guild.channels.find('name', 'mod-log');
var qrtext = message.content.split(' ').slice(1).join(' ')
if(qrtext.length < 1) return message.channel.send('Please provide text to transform into a QR Code')
var qr_svg = qr.image(qrtext, { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`))
var svg_string = qr.imageSync(qrtext, { type: 'png' });
setTimeout(Timer, 1000);
function Timer() {
    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`, `qrcode.png`)).then(message => {
        message.channel.stopTyping()
    });
}
    console.log(boxen('[QRCode] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
var qrcodemlembed = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle('QR Code Command Used')
    .setAuthor(message.author.username, message.author.displayAvatarURL)
if(modlog) return modlog.send({embed: qrcodemlembed})

    } else {
    var qrtext = message.content.split(' ').slice(1).join(' ')
    if(qrtext.length < 1) return message.channel.send('Please provide text to transform into a QR Code')
    var qr_svg = qr.image(qrtext, { type: 'png' });
    qr_svg.pipe(require('fs').createWriteStream(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`))
    var svg_string = qr.imageSync(qrtext, { type: 'png' });
    setTimeout(Timer, 1000);
    function Timer() {
    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`, `qrcode.png`)).then(message => {
        message.channel.stopTyping()
    });
}
    }
});

}
module.exports.help = {
    name: "qrcode",
    info: "Generate a QR Code",
    usage: "qrcode <text>"
}