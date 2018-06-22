const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const qr = require("qr-image")
const fs = require('fs')
const mode = ['encode', 'recover']
const talkedRecently = new Set();
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  if (!fs.existsSync(`./data/serverdata/${message.guild.id}/litemode.txt`)) {
    fs.writeFileSync(`./data/serverdata/${message.guild.id}/litemode.txt`, 'false', function(err) {
    });
};
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

    var option = args[1]
var qrtext = message.content.split(' ').slice(2).join(' ')

var noMode = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('Error')
  .setDescription('Invalid Mode Provided\n**Examples**\n`qrcode encode <text>`\n`qrcode recover`')
  .setAuthor(message.author.username, message.author.displayAvatarURL)
var noData = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('Error')
  .setDescription('No Text Provided.')
  .setAuthor(message.author.username, message.author.displayAvatarURL)

if(!option) return message.channel.send({embed: noMode})

if(mode.some(mde => option.includes(mde))) {


if(option.includes('encode')) {
    if(qrtext.length < 1) return message.channel.send({embed: noData})

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
return;
}
if(option.includes('recover')) {
    fs.exists(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`, function(exists) {
        if (exists) {
          fs.stat(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`, function(err, stats) { 
            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/qrcode/${message.author.id}.png`, `qrcode.png`)).then(message => {
                message.channel.stopTyping()
            });
          });
        } else {
          message.channel.send('You do not have any previous QR Codes').then(message => {
              message.channel.stopTyping()
          })
        }
      });
    console.log(boxen('[LastQR] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
    var lastqrmlembed = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Last QR Command Used')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        if(modlog) return modlog.send({embed: lastqrmlembed})
        return;
}
return;

} else return message.channel.send({embed: noMode})
    } else {
        // LiteMode
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