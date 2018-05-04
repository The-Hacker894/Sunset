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

    if(message.author.id !== data.ownerid) return;

    var balMember = message.guild.member(message.mentions.users.first());
    const modlog = message.guild.channels.find('name', 'mod-log');
    const payment = args[2]

    var nomemberprov = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('Please provide a member to set money amount')

    if(!balMember) return message.channel.send({embed: nomemberprov})

    fs.exists(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, function(exists) {
        if (exists) {
         fs.readFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, 'utf8', function(err, data) {
            const parsedPayment = parseFloat(payment)
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, parsedPayment, function(err,data) {
                var success = new Discord.RichEmbed()
               .setColor(colors.success)
                    .setTitle('Successfully Set Money!')
                    .setDescription(`User: ${balMember.user.tag}\nAmount: ${currency}${parsedPayment}`)
                    message.channel.send({embed: success})
            })
         });
         } else {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${balMember.id}.txt`, '0', function(err,data) {
                message.channel.send('Created Bank File')
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
    name: "setmoney",
    info: "Set the amount for the mentioned user",
    usage: "setmoney <@user>"
}