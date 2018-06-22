const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
const moment = require('moment')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var suprt = message.content.split(' ').slice(1).join(' ')

    if (!fs.existsSync(`./data/serverdata/${message.guild.id}/litemode.txt`)) {
        fs.writeFileSync(`./data/serverdata/${message.guild.id}/litemode.txt`, 'false', function(err) {
        });
      };
      fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
        if (!litedata.includes('true')) {

    var noSupport = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Support')
        .setDescription('Use this command to submit a bug report, suggestion, or just a pat on the back for all the hard TheHacker put into this bot.\n**Usage**: `' + data.prefix +'support <message>`')
        .addField('**Support Links**', '[Sunset Website](https://www.hacker-hub.com/sunset/)\n' + 
                '[Sunset Wiki (WIP)](https://www.hacker-hub.com/sunset/wiki/)')
        .setAuthor(client.user.username, client.user.displayAavatarURL)
    if(suprt.length < 1) return message.channel.send({embed: noSupport})

    var DM = client.users.get('270375857384587264')
            var support = new Discord.RichEmbed()
                .setColor(colors.success)
                .setTitle('Support')
                .setDescription('Some Support came in from ' + message.member.user.username + ' in the server ' + message.guild.name + ': ' + suprt)
                .addField('Guild ID', message.guild.id)
                .addField('Guild Name', message.guild.name)
                .addField('Author Name', message.member.user.username)
                .addField('Author Discriminator', message.member.user.tag)
                .addField('Author ID', message.author.id)
                .setFooter(`This form was made at ${moment().format()}`)
                var sent = new Discord.RichEmbed()
                .setColor(colors.success)
                .setTitle('Support Sent')
                .setDescription(':heavy_check_mark: Support sent successfully!')
                message.channel.send({embed: sent}).then( () => {
                       DM.send({embed: support})
                })
                return;
    

        } else {
            //Sunset LiteMode

            var noSupport = 'Use this command to submit a bug report, suggestion, or just a pat on the back for all the hard TheHacker put into this bot.\n**Usage**: `' + data.prefix +'support <message>`\n\n' +
                            '**Support Links**\n' +
                            '**https://www.hacker-hub.com/sunset/**\n' + 
                            '**https://www.hacker-hub.com/sunset/wiki/**'
    if(suprt.length < 1) return message.channel.send(noSupport)

    var DM = client.users.get('270375857384587264')
            var support = new Discord.RichEmbed()
                .setColor(colors.success)
                .setTitle('Support')
                .setDescription('Some Support came in from ' + message.user.username + ' in the server ' + message.guild.name + ': ' + suprt)
                .addField('Guild ID', message.guild.id)
                .addField('Guild Name', message.guild.name)
                .addField('Author Name', message.member.user.username)
                .addField('Author Discriminator', message.member.user.tag)
                .addField('Author ID', message.author.id)
                .setFooter(`This form was made at ${moment().format()}`)
                message.channel.send(':heavy_check_mark: Support sent!').then( () => {
                    DM.send({embed: support})
                })
                return;

        }
    })

}
module.exports.help = {
    name: "support",
    info: "Send some support to the developer, TheHacker",
    usage: "support <message>"
}