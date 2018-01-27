const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement) => {
    var warnMember = message.guild.member(message.mentions.users.first());
    var messagecontent = message.content.split(' ').slice(1).join(' ')
    var warnReason = message.content.split(/\s+/g).slice(2).join(" ");
    const modlog = message.guild.channels.find('name', 'mod-log');
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You must have the `KICK_MEMBERS` permission')

    var warninfo = `{\nMemberID: ${warnMember.id}` +
                    `\nMember Tag: ${message.mentions.users.first().tag}` +
                    `\nModerator: ${message.author.tag}` +
                    `\nWarn Reason: ${warnReason}` +
                    `\nDate: ${moment().format('MMMM Do YYYY, h:mm:ss a')}` +
                    `\nGuild Name: ${message.guild.name}` +
                    `\n}`
                    var warned = new Discord.RichEmbed()
                        .setColor(data.embedcolor)
                        .setTitle('Warned User')
                        .setDescription(`Member Tag: ${message.mentions.users.first().tag}\nModerator: ${message.author.tag}\nWarn Reason: ${warnReason}\nGuild Name: ${message.guild.name}\nDate: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                        .setFooter('You can use `warnings <@user> clear` to clear all warnings for a user.')
                    var warneduser = new Discord.RichEmbed()
                        .setColor(data.embedcolor)
                        .setTitle('You have been Warned')
                        .setDescription(`Moderator: ${message.author.tag}\nWarn Reason: ${warnReason}\nGuild Name: ${message.guild.name}`)
                        .setAuthor(message.author.username, message.author.displayAvatarURL)
                    var warnml = new Discord.RichEmbed()
                    .setColor(data.embedcolor)
                    .setTitle('Warn Command Used')
                    .setDescription(`Member Tag: ${message.mentions.users.first().tag}\nModerator: ${message.author.tag}\nWarn Reason: ${warnReason}\nGuild Name: ${message.guild.name}\nDate: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setFooter('You can use `warnings <@user> clear` to clear all warnings for a user.')

                    if (!fs.existsSync(`./data/warns/${message.guild.id}`)){
                        fs.mkdirSync(`./data/warns/${message.guild.id}`);
                    }

    fs.appendFile(`./data/warns/${message.guild.id}/${warnMember.id}.txt`, `\n${warninfo}`, (err) => {  
        if (err) message.channel.send(err)
       message.channel.send({embed: warned});
       warnMember.send({embed: warneduser})
       if(modlog) return modlog.send({embed: warnml})
    });


}
module.exports.help = {
    name: "warn",
    usage: "warn <@user> <reason>"
}