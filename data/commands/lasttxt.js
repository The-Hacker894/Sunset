const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const RichEmbed = require("discord.js").RichEmbed;
const boxen = require("boxen")
const writeFile = require("write")
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement) => {
    message.channel.startTyping()
    

    fs.exists(`./data/qrcode/${message.author.id}.png`, function(exists) {
        if (exists) {
          fs.stat(`./data/textfiles/${message.author.id}.txt`, function(err, stats) { 
            message.channel.send(new Attachment(`./data/textfiles/${message.author.id}.txt`, `textfile.txt`)).then(message => {
                message.channel.stopTyping()
            });
          });
        } else {
          message.channel.send('You do not have any previous Text Files').then(message => {
              message.channel.stopTyping()
          })
        }
      });
}
module.exports.help = {
    name: "lasttxt",
    info: "Loads the last text file created",
    usage: "lasttxt"
}