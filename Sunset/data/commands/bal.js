const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
        fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
            if(!litedata.includes('true')) {
    message.channel.startTyping()
    var balMember = message.guild.member(message.mentions.users.first());
    const modlog = message.guild.channels.find('name', 'mod-log');

    fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, currency) {


    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
        if (!exists) {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, '0', function(err) {
            });
        }
    });
    fs.exists(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, function(exists) {
        if (!exists) {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, '0', function(err) {
            });
        }
    });


                    
                if(!balMember) {
                    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
                        if (exists) {
                         fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, data) {
                            fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, 'utf8', function(err, atmdata) {

                             if (err) {
                                 return message.channel.send(err).then(message => {
                                     message.channel.stopTyping()
                                 })
                             }
                             const parsedData = parseFloat(data)
                             const atmparsedData = parseFloat(atmdata)
                             if(parsedData === 'NaN') {
                                fs.unlink(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`)
                                var balerror = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('Your balance had a error, so it was fixed')
                                return message.channel.send({embed: balerror})
                            }
                            if(atmparsedData === 'NaN') {
                                fs.unlink(`./data/serverdata/economy/${message.guild.id}/atm/${message.author.id}.txt`)
                                var atmmbalerror = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('Your ATM Balance had a error, so it was fixed')
                                return message.channel.send({embed: atmmbalerror})
                            }
                            if(parsedData > 9999999999999) {
                                fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 9999999999999 , function(err) {
                                });
                            }
                             var balance = new Discord.RichEmbed()
                                .setColor(colors.system)
                                .addField('Balance', `${currency}${parsedData}`, true)
                                .addField('ATM Balance', `${currency}${atmparsedData}`, true)
                                .addField('Net Worth', `${currency}${parsedData + atmparsedData}`, true)
                                .setFooter('Use atm dep <amount> to deposit your money to your ATM')
                                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                             message.channel.send({embed: balance}).then(message => {
                                message.channel.stopTyping()
                            })
                             console.log('send data')
                           });
                        });
                         } else {
                            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, '0', function(err) {
                                fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, '0', function(err) {
                                if(err) {
                                    return console.log(err).then(message => {
                                        message.channel.stopTyping()
                                    })
                                }
                                var newbal = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('No money was found; creating new bank file for ' + message.author.toString())                               
                                console.log("The file was saved!");
                                message.channel.send({embed: newbal}).then(message => {
                                    message.channel.stopTyping()
                                })
                            }); 
                        });
 
                         }
                     });
                } else {
                    
                    fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) {
                        if (!exists) {
                            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, '0', function(err) {
                            });
                        }
                    });
                    fs.exists(`./data/economy/${message.guild.id}/atm/${balMember.id}.txt`, function(exists) {
                        if (!exists) {
                            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`, '0', function(err) {
                            });
                        }
                    });
                    fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) {
                        if (exists) {
                         fs.readFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, 'utf8', function(err, data) {
                            fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`, 'utf8', function(err, balatmdata) {
                             if (err) {
                                 return message.channel.send(err).then(message => {
                                    message.channel.stopTyping()
                                })
                             }
                             const newparsedData = parseFloat(data)
                             const newparsedATM = parseFloat(balatmdata)
                             if(newparsedData > 9999999999999) {
                                fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, 9999999999999 , function(err) {
                                });
                            }
                             if(data.includes('NaN')) {
                                fs.unlink(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`)
                                var balerror = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('Your Balance had a error, so it was fixed')
                                return message.channel.send({embed: balerror})
                            }
                            if(balatmdata.includes('NaN')) {
                                fs.unlink(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`)
                                var atmerror = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('Your ATM Balance had a error, so it was fixed')
                                return message.channel.send({embed: atmbalerror})
                            }
                             var balance = new Discord.RichEmbed()
                                .setColor(colors.system)
                                .setAuthor(balMember.user.tag, balMember.user.displayAvatarURL)
                                .addField('User', balMember.user.tag, true)
                                .addField('Balance', `${currency}${newparsedData}`, true)
                                .addField('ATM: ', `${currency}${newparsedATM}`, true)
                             message.channel.send({embed: balance}).then(message => {
                                message.channel.stopTyping()
                            })
                             console.log('send data')
                           });
                        });
                         } else {
                            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, '0', function(err) {
                                if(err) {
                                    return console.log(err)
                                }
                                var newbal = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('No money was found; creating new bank file for ' + balMember.user.tag)                               
                                console.log("The file was saved!");
                                message.channel.send({embed: newbal}).then(message => {
                                    message.channel.stopTyping()
                                })
                            }); 
 
                         }
                     });
                    }
                });
            } else {
                message.channel.send('```' + boxen('This command is not available with LiteMode', {padding: 1}) + '```')
            }
        });
                 }



module.exports.help = {
    name: "bal",
    usage: "bal <@user>",
    info: "Check your balance or the mentioned member's balance"
}