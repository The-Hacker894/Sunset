const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement) => {
    message.channel.startTyping()
    var balMember = message.guild.member(message.mentions.users.first());
    var balaction = args[2]
    var balother = args[3]
    var action = args[1]
    var other = args[2]
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
    // Start of code for when there is no message member
if(!balMember) {
    if(!action) {
        fs.exists(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, function(exists) {
            if (exists) {
             fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, 'utf8', function(err, data) {
                fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, newdata) {
                 var parsedATM = parseFloat(data)
                 var parsedBAL = parseFloat(newdata)
                 var parsedNW = parseFloat(parsedBAL + parsedATM)
                 if(parsedBAL > 9999999999999) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 9999999999999 , function(err) {
                    });
                }
                var atm = new Discord.RichEmbed()
                    .setColor(data.embedcolor)
                    .addField('Balance', `${currency}${parsedBAL}`, true)
                    .addField('ATM Balance', `${currency}${parsedATM}`, true)
                    .addField('Net Worth', `${currency}${parsedNW}`, true)
                    .setFooter('Use atm dep <amount> to deposit your money to your ATM')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    message.channel.send({embed: atm}).then(message => {
                        message.channel.stopTyping()
                    })
             });
            });
             } else {
             fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, '0', function(err) {
                if(err) {
                    return console.log(err).then(message => {
                        message.channel.stopTyping()
                    })
                }
                var newbal = new Discord.RichEmbed()
                    .setColor(data.embedcolor)
                    .setDescription('No money was found; creating new bank file for ' + message.author.tag)                               
                console.log("The file was saved!");
                message.channel.send({embed: newbal}).then(message => {
                    message.channel.stopTyping()
                })
            }); 
        }
            });
            return;
    }
    if(action.includes('dep')) {
        var nodepprov = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setDescription('No Money to Deposit Provided')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        
            
        if(!other) return message.channel.send({embed: nodepprov})
        fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, 'utf8', function(err, depATMdata) {
            fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, depdata) {
                var newparsedATM = parseFloat(depATMdata)
                 var newparsedBAL = parseFloat(depdata)
                 var parsedDEP = parseFloat(other)

                 var notenoughmoney = new Discord.RichEmbed()
                .setColor(data.embedcolor)
                .setDescription('You do not have the sufficient funds to deposit ' + currency + parsedDEP + '\nBalance: ' + currency + newparsedBAL + '\nATM: ' + currency + newparsedATM)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)

                 if(parsedDEP > newparsedBAL) return message.channel.send({embed: notenoughmoney})
                 fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, newparsedATM + parsedDEP, function(err) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, newparsedBAL - parsedDEP, function(err) {
                        var depositsuccess = new Discord.RichEmbed()
                            .setColor(data.embedcolor)
                            .setTitle('Successfully Depositing Money')
                            .setDescription(`Successfully deposited ${currency}${parsedDEP}\nNew Balance: ${currency}${newparsedBAL - parsedDEP}\nNew ATM: ${currency}${parsedDEP + newparsedATM}`)
                            message.channel.send({embed: depositsuccess})
                    })
                 })
                 

            });
        });
        return;
    }
    if(action.includes('deposit')) {
        var dnodepprov = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setDescription('No Money to Deposit Provided')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        
            
        if(!other) return message.channel.send({embed: dnodepprov})
        fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, 'utf8', function(err, depositATMdata) {
            fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, depositdata) {
                var newparseddATM = parseFloat(depositATMdata)
                 var newparseddBAL = parseFloat(depositdata)
                 var parsedDEPOSIT = parseFloat(other)

                 var dnotenoughmoney = new Discord.RichEmbed()
                .setColor(data.embedcolor)
                .setDescription('You do not have the sufficient funds to deposit '+ currency + parsedDEPOSIT + '\nBalance: '+ currency + newparseddBAL + '\nATM: ' + currency + newparseddATM)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)

                 if(parsedDEPOSIT > newparseddBAL) return message.channel.send({embed: dnotenoughmoney})
                 fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, newparseddATM + parsedDEPOSIT, function(err) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, newparseddBAL - parsedDEPOSIT, function(err) {
                        var ddepositsuccess = new Discord.RichEmbed()
                            .setColor(data.embedcolor)
                            .setTitle('Successfully Depositing Money')
                            .setDescription(`Successfully deposited ${currency}${parsedDEPOSIT}\nNew Balance: ${currency}${newparseddBAL - parsedDEPOSIT}\nNew ATM: ${currency}${parsedDEPOSIT + newparseddATM}`)
                            message.channel.send({embed: ddepositsuccess})
                    })
                 })
                 

            });
        });
        return;
    }
    if(action.includes('withdrawal')) {
        var nowithprov = new Discord.RichEmbed()    
            .setColor(data.embedcolor)
            .setDescription('No Withdrawal Provided')
        if(!other) return message.channel.send({embed: nowithprov})
        fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, 'utf8', function(err, withATMdata) {
            fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, withdata) {

                var parsedWithData = parseFloat(withdata)
                var parsedWithATMData = parseFloat(withATMdata)
                var parsedWITH = parseFloat(other)

                var notenoughmoneyWITH = new Discord.RichEmbed()
                    .setColor(data.embedcolor)
                    .setDescription(`You do not have ${currency}${parsedWITH}.`)
                    .addField('ATM Balance', `${currency}${parsedWithData}`)
                    .addField('Balance: ', `${currency}${parsedWithATMData}`)
                if(parsedWITH > parsedWithATMData) return message.channel.send({embed: notenoughmoneyWITH})

                fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, parsedWithATMData - parsedWITH, function(err) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, parsedWithData + parsedWITH, function(err) {
                        var withdrawalsuccess = new Discord.RichEmbed()
                            .setColor(data.embedcolor)
                            .setTitle('Successfully Withdrawn Money')
                            .setDescription(`Successfully withdrawn ${currency}${parsedWITH}\nNew Balance: ${currency}${parsedWithData + parsedWITH}\nNew ATM: ${currency}${parsedWithATMData - parsedWITH}`)
                            message.channel.send({embed: withdrawalsuccess})
                    })
                 })


            });
        });
        return;
            
    }
} else {
// End of code if there is no message member
fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) {
    if (!exists) {
        fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, '0', function(err) {
        });
    }
});
fs.exists(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`, function(exists) {
    if (!exists) {
        fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`, '0', function(err) {
        });
    }
});
// Beginning of file read
fs.exists(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`, function(exists) {
    if (exists) {
     fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`, 'utf8', function(err, baldata) {
        fs.readFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, 'utf8', function(err, balnewdata) {
         var balparsedATM = parseFloat(baldata)
         var balparsedBAL = parseFloat(balnewdata)
         if(balparsedBAL > 9999999999999) {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, 9999999999999 , function(err) {
            });
        }
        var atm = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .addField('Balance', `${currency}${balparsedBAL}`, true)
            .addField('ATM Balance', `${currency}${balparsedATM}`, true)
            .addField('Net Worth', `${currency}${balparsedBAL + balparsedATM}`, true)
            .setFooter('Use atm dep <amount> to deposit your money to your ATM')
            .setAuthor(balMember.user.tag, balMember.user.displayAvatarURL)
            message.channel.send({embed: atm}).then(message => {
                message.channel.stopTyping()
            })
     });
    });
     } else {
     fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${balMember.id}.txt`, '0', function(err) {
        if(err) {
            return console.log(err).then(message => {
                message.channel.stopTyping()
            })
        }
        var balnewbal = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setDescription('No money was found; creating new bank file for ' + balMember.user.tag)                               
        console.log("The file was saved!");
        message.channel.send({embed: balnewbal}).then(message => {
            message.channel.stopTyping()
        })
    }); 
}
    });
    return;


}

    });
}
module.exports.help = {
    name: "atm",
    usage: "atm <action> <other>",
    info: "Interact with the ATM"
}