const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
module.exports.run = (client, message, args, data, announcement, colors) => {


    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
    var warnMember = message.guild.member(message.mentions.users.first());
    var messagecontent = message.content.split(' ').slice(1).join(' ')
    var warnReason = message.content.split(/\s+/g).slice(2).join(" ");

    if(!warnMember) {
        var noargs = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription('Please provide a member to check warnings for')
            return message.channel.send({embed: noargs});
    }

    

                    if(warnReason === 'clear') {
                        fs.exists(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, function(exists) {
                            if (exists) {
                                fs.unlink(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, function(err) {
                                 if (err) {
                                     return message.channel.send(err)
                                 }
                                 var warnscleared = new Discord.RichEmbed()
                                    .setColor(colors.success)
                                    .setTitle('Cleared Warns')
                                    .setDescription(`Warns cleared for ${warnMember.user.tag}`)
                                    .setAuthor(warnMember.user.tag, warnMember.user.displayAvatarURL)
                                var warnsclearedDM = new Discord.RichEmbed()
                                 .setColor(colors.success)
                                 .setTitle(`Cleared Warns [${message.guild.name}]`)
                                 .setDescription(`Your warns have been cleared on ${message.guild.name}`)
                                 .setFooter(`Warns cleared by ${message.author.tag}`)

                                 message.channel.send({embed: warnscleared})
                                 warnMember.send({embed: warnsclearedDM})
                                 console.log('send data')
                               });
                             } else {
                                 var otherwarnerror = new Discord.RichEmbed()
                                    .setColor(colors.critical)
                                    .setDescription(`${warnMember.user.tag} has no warns on this guild.`)
                                .setAuthor(warnMember.user.tag, warnMember.user.displayAvatarURL)
                                 return message.channel.send({embed: otherwarnerror})
     
                             }
                         });
                    } else {
                    fs.exists(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, function(exists) {
                       if (exists) {
                        fs.readFile(`./data/serverdata/${message.guild.id}/warns/${warnMember.id}.txt`, 'utf8', function(err, data) {
                            if (err) {
                                return message.channel.send(err)
                            }
                            var warndata = new Discord.RichEmbed()
                                .setColor(colors.system)
                                .setTitle(`Warnings ${warnMember.user.tag}`)
                                .setDescription(data)
                            message.channel.send({embed: warndata})
                            console.log('send data')
                          });
                        } else {
                            var warnerror = new Discord.RichEmbed()
                                .setColor(colors.critical)
                                .setDescription(`${warnMember.user.tag} has no warns on this guild.`)
                                .setAuthor(warnMember.user.tag, warnMember.user.displayAvatarURL)
                            message.channel.send({embed: warnerror})

                        }
                    });
                }
            } else {
                    // Lite Mode
                    message.channel.send('This command is not available for Sunset LiteMode')
            }
        });


}
module.exports.help = {
    name: "warnings",
    usage: "warnings <@user>"
}