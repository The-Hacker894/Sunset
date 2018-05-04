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

    fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, currency) {

    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) { 
        if (exists) {

            fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, data) { 
                fs.readFile(`./data/serverdata/${message.guild.id}/settings/lotterychance.txt`, function(err, ssldata) {
                    fs.readFile(`./data/serverdata/${message.guild.id}/settings/lotterypayout.txt`, function(err, sslpdata) {
                        fs.readFile(`./data/serverdata/${message.guild.id}/settings/lotterycost.txt`, function(err, sslcdata) {


                    
                
                var d = Math.random();
                const parsedData = parseFloat(data)
                const parsedLotteryPayout = parseFloat(ssldata)
                const parsedLotteryCost = parseFloat(sslcdata)
                const parsedLot = parseFloat(Math.floor(Math.random() * parsedLotteryPayout) + 100)
                const cost = parseFloat(Math.floor(Math.random() * parsedLotteryCost) + 100)
                var costtoohigh = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setTitle('Insufficient Funds')
                    .setDescription('The cost for a lottery ticket this time around is ' + currency + cost + '\nCome back with some more money and try again')
                if(parsedData < cost) return message.channel.send({embed: costtoohigh})
                if(parsedData === 'NaN') {
                    fs.unlink(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`)
                    var balerror = new Discord.RichEmbed()
                        .setColor(colors.critical)
                        .setDescription('Your balance had a error, so it was fixed')
                    return message.channel.send({embed: balerror})
                }
                fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, parsedData - cost , function(err) { });
            var lot = parseFloat(ssldata)

            if (d < lot) {
                
                fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, parsedData + parsedLot , function(err) { 
                    var lotterywin = new Discord.RichEmbed()
                        .setColor(colors.success)
                        .setTitle('You have won the lottery!')
                        .setDescription(`Lottery Amount: ${currency}${parsedLot}\nNew Balance: ${currency}${parsedData + parsedLot}\nCost of Ticket: ${currency}${cost}`)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                        message.channel.send({embed: lotterywin})
                })
            
            } else {
                var nowin = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setTitle('You have not won the lottery')
                    .setDescription('Use `lottery` to try again\nCost of Ticket: ' + currency + cost)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    message.channel.send({embed: nowin})
            }
            
            })
        });
        });
    });
        } else {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, '0' , function(err) { 
                var newbal = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription('No money was found; creating new bank file for ' + balMember)                               
                                console.log("The file was saved!");
                                message.channel.send({embed: newbal}).then(message => {
                                    message.channel.stopTyping()
                                })
            })
        }
    })
});
    } else {
        message.channel.send('This command is not available for Sunset LiteMode')
    }
});
        




}
module.exports.help = {
    name: "lottery",
    info: "Attempt to win the lottery",
    usage: "lottery"
}