const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement,colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
    const modlog = message.guild.channels.find('name', 'mod-log');

    fs.exists(`./data/serverdata/${message.guild.id}/settings/freemoneypayout.txt`, function(exists) {
        if (!exists) {
            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/freemoneypayout.txt`, '50', function(err) {
            });
        }
      });
    fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, currency) {
        fs.readFile(`./data/serverdata/${message.guild.id}/settings/freemoneypayout.txt`, function(err, ssfmpdata) {

        var pyt = parseFloat(ssfmpdata)
    const parsedmoney = parseFloat(Math.floor(Math.random() * pyt) + 1)

                    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
                        if (exists) {
                         fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, data) {
                            
                            
                            const parseddata = parseFloat(data)
                            const parsedall = parseFloat(parsedmoney + parseddata)
                            if(parseddata === 'NaN') {
                                fs.unlink(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`)
                                var balerror = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('Your balance had a error, so it was fixed')
                                return message.channel.send({embed: balerror})
                            }

                            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, parsedall, function(err) {
                                var randomfreemoney = new Discord.RichEmbed()
                                    .setColor(colors.success)
                                    .setTitle('Free Money')
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                                    .setDescription(`You have earned ${currency}${parsedmoney}\nYour new balance is ${currency}${parsedall}`)
                                    message.channel.send({embed: randomfreemoney}).then(message => {
                                        message.channel.stopTyping()
                                    })
                            }); 
                           });
                         } else {
                            const newparseddata = parseFloat(data)
                            const newparsedall = parseFloat(parsedmoney + newparseddata)
                            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, newparsedall, function(err) {
                                var randomfreemoney = new Discord.RichEmbed()
                                    .setColor(colors.system)
                                    .setTitle('Free Money')
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                                    .setDescription(`You have earned ${currency}${parsedmoney}\nYour new balance is ${currency}${newparsedall}`)
                                    message.channel.send({embed: randomfreemoney}).then(message => {
                                        message.channel.stopTyping()
                                    })
                            }); 
 
                         }
                     });
                    });
                });
            } else {
                //LiteMode
                message.channel.send('This command is not availble for Sunset LiteMode')
            }
        });
}
module.exports.help = {
    name: "freemoney",
    usage: "freemoney",
    info: "Get freemoney"
}