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
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
    message.channel.startTyping()
    const balMember = message.guild.member(message.mentions.users.first());
    const modlog = message.guild.channels.find('name', 'mod-log');

    const payamount = args[2]
    if(!balMember) return message.channel.send('You must provide a member to pay')
    if(!payamount) return message.channel.send('Please provide an amount to pay')

    fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, currency) {


    fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, data) {

        const newparseddata = parseFloat(data)
         const newparsedamount = parseFloat(payamount)
         const newparsedall = newparseddata + newparsedamount
         if(newparseddata === 'NaN') {
            fs.unlink(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`)
            var balerror = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setDescription('Your balance had a error, so it was fixed')
            return message.channel.send({embed: balerror})
        }

         if(newparsedamount > newparseddata) {
             var nofunds = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('Insufficient Funds')
                .setDescription('You do not have enough funds to complete the payment.')
                message.channel.send({embed: nofunds}).then(message => {
                    message.channel.stopTyping()
                })
        return;        
         } else {
            fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) {
                if (exists) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, newparseddata - newparsedamount, function(err) {
                        if(err) {
                            return console.log(err).then(message => {
                                message.channel.stopTyping()
                            })
                        }
                    
                        console.log("The file was saved!");
                    }); 
                    
                } else {
                    console.log('No money for ' + balMember.user.tag)
                }
                });
            

            fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) {
                if (exists) {
                 fs.readFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, 'utf8', function(err, newdata) {
                     if (err) {
                         return message.channel.send(err).then(message => {
                            message.channel.stopTyping()
                        })
                     }
                     const parseddata = parseFloat(newdata)
                     const parsedamount = parseFloat(payamount)
                     const parsedall = parseddata + parsedamount
                     const paymenttax = parseFloat(Math.floor(Math.random() * 5) + 1)
                     if(parseddata === 'NaN') {
                        fs.unlink(`./data/economy/${message.guild.id}/${balMember.id}.txt`)
                        var balerror = new Discord.RichEmbed()
                            .setColor(colors.critical)
                            .setDescription('Your balance had a error, so it was fixed')
                        return message.channel.send({embed: balerror})
                    }
                     fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, parsedall, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    
                        console.log("The file was saved!");
                    }); 
                    
                   });
                   var paymentsuccess = new Discord.RichEmbed()
                   .setColor(colors.success)
                   .setTitle('Payment Receipt')
                   .setAuthor(message.author.tag, message.author.displayAvatarURL)
                   .addField('Payment Source', message.author.tag, true)
                   .addField('Payment Target', balMember.user.tag, true)
                   .addField('Payment Amount', currency + parseFloat(payamount), true)
                   var paymentnotifiy = new Discord.RichEmbed()
                    .setColor(colors.success)
                    .setTitle('You have recieved a payment')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .addField('Payment Source', message.author.tag, true)
                   .addField('Payment Target', balMember.user.tag, true)
                   .addField('Payment Amount', currency + parseFloat(payamount), true)
                   .addField('Server', message.guild.name, true)
                   
               
               message.channel.send({embed: paymentsuccess}).then(message => {
                message.channel.stopTyping()
            })
               balMember.send({embed: paymentnotifiy}).then(message => {
                message.channel.stopTyping()
            })
                  
                 } else {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, '0', function(err) {
                        if(err) {
                            return console.log(err).then(message => {
                                message.channel.stopTyping()
                            })
                        }
                        var newbal = new Discord.RichEmbed()
                            .setColor(colors.critical)
                            .setDescription('No money was found; creating new bank file for ' + balMember)                               
                        console.log("The file was saved!");
                        message.channel.send({embed: newbal}).then(message => {
                            message.channel.stopTyping()
                        })
                    }); 

                 }
             });
         }
        });
           
    
   
});
} else {
         message.channel.send('This command is not available for Sunset LiteMode')
}
});

                    
                 }
module.exports.help = {
    name: "pay",
    usage: "pay <@user>",
    info: "Pay a user"
}