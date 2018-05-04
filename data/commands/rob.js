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
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
    if (!fs.existsSync(`./data/serverdata/economy/${message.guild.id}/`)) {
        fs.mkdirSync(`./data/serverdata/economy/${message.guild.id}/`);
        }

    fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, currency) {
    
    const balMember = message.guild.member(message.mentions.users.first());
    var nouserob = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('Please provide a user to rob')
    if(!balMember) return message.channel.send({embed: nouserob})
    if(balMember.id === message.author.id) return message.channel.send('You cannot rob yourself')

    
    
    fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) { 
        if (exists) {

            fs.readFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, 'utf8', function(err, data) { 
                fs.readFile(`./data/serverdata/${message.guild.id}/settings/robpayout.txt`, function(err, robdata) {
                var d = Math.random();
                const parsedData = parseFloat(data)
                const parsedRob = parseFloat(Math.floor(Math.random() * 2) + 1)
                const rob = parseFloat(robdata)
                const robPercentage = parseFloat(robdata * 100) 
                const robAmount = parsedData / robPercentage
                const halfPData = Number((parsedData - robAmount).toFixed(2));
                

                var nomoneytorob = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setTitle('Failed Rob Attempt')
                    .setDescription(`You attempted to rob ${balMember.user.tag} but they have no money for you to take`)

              //  if(halfPData < 1) return message.channel.send({embed: nomoneytorob})
                
                
                if(parsedData < 1) return message.channel.send({embed: nomoneytorob})
                if(data.includes('NaN')) {
                    fs.unlink(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`)
                    var balerror = new Discord.RichEmbed()
                        .setColor(colors.critical)
                        .setDescription('Your balance had a error, so it was fixed')
                    return message.channel.send({embed: balerror})
                }
                
                if(parsedRob === 2) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, parsedData - halfPData, function(err) { 
                        var successfulrob = new Discord.RichEmbed()
                            .setColor(colors.success)
                            .setTitle('Successful Rob')
                            .setDescription(`You have successfully robbed ${balMember.user.tag} and received ${currency}${halfPData} from it`)
                            message.channel.send({embed: successfulrob})
                            fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) { 
                                if (exists) {
                        
                                    fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, newdata) { 
                                        const newparsedData = parseFloat(newdata)
                                        fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, newparsedData + halfPData, function(err) {     
                                        });
                                    });
                                    } else {
                                        fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, newerdata) { 
                                            const newerparsedData = parseFloat(newerdata)
                                            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, newerparsedData + halfPData, function(err) {     
                                            });
                                        });
                                    }
                                });
                    });
                } else {
                    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) { 
                        if (exists) {
                            fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, data) { 
                                const parsedFRData = parseFloat(data)
                                const parsedFine = parseFloat(Math.floor(Math.random() * 750) + 50)
                                if(parsedFRData === 'NaN') {
                                    fs.unlink(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`)
                                    var balerror = new Discord.RichEmbed()
                                        .setColor(colors.critical)
                                        .setDescription(balMember.user.tag + '\'s balance had a error, so it was fixed')
                                    return message.channel.send({embed: balerror})
                                }
                                fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, parsedFRData - parsedFine, function(err) { 
                                    var failedrob = new Discord.RichEmbed()
                                        .setColor(colors.critical)
                                        .setTitle('Failed Robbery Attempt')
                                        .setDescription(`You have failed to rob ${balMember.user.tag} and were fined ${currency}${parsedFine}`)
                                        message.channel.send({embed: failedrob})
                                });
                            });
                        }
                    });
                }
                
            
            })
        });
        } else {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, '0' , function(err) { 
                var newbal = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setDescription('No money was found; creating new bank file for ' + balMember.user.tag)                               
            console.log("The file was saved!");
            message.channel.send({embed: newbal}).then(message => {
                message.channel.stopTyping()
            })
            })
        }
    })
    });

} else {
    message.channel.send('This command is not availble for Sunset LiteMode')
}
  });




}
module.exports.help = {
    name: "rob",
    info: "Attempt to rob a user",
    usage: "rob <@user>"
}