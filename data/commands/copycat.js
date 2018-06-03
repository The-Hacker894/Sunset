const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
const moment = require('moment')
module.exports.run = (client, message, args, data, game, announcement,colors) => {
    var commandlock = data.lock
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 

    if (!fs.existsSync(`./data/serverdata/${message.guild.id}/litemode.txt`)) {
        fs.writeFileSync(`./data/serverdata/${message.guild.id}/litemode.txt`, 'false', function(err) {
        });
    };
    fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
        if (!litedata.includes('true')) {
            message.channel.startTyping()
    var ccmsg = message.content.split(' ').slice(1).join(' ')
    var noMessage = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Help')
        .setDescription('**Create & Send CopyCat**\n' +
                        '`copycat TheHacker is so awesome`\n' +
                        '**Erase All WebHooks**\n' +
                        '`channelsettings webhooks delete`')
    var noPerms = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Permission Error')
        .setDescription('`MANAGE_WEBHOOKS` permission required!')
    if(ccmsg.length < 1) return message.channel.send({embed: noMessage}).then(msg => {
        msg.channel.stopTyping()
    })
    if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send({embed: noPerms}).then(msg => {
        msg.channel.stopTyping()
    })


    message.channel.createWebhook(message.author.username, message.author.displayAvatarURL)
    .then(webhook => webhook.edit(message.author.username, message.author.displayAvatarURL)
    .then(wb => wb.send(ccmsg)).then(wb => {
        setTimeout(function(){
            wb.delete()
            var wbDeleted = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('WebHook Deleted')
                .setDescription('Member: ' + message.author.tag + '\nTime: ' + moment().format())
            message.channel.send({embed: wbDeleted})
        }, 180000);
        }))
    message.channel.stopTyping()
        } else {
            message.channel.startTyping()
            var ccmsg = message.content.split(' ').slice(1).join(' ')
    var noMessage = 'No message was provided for the copycat'
    var noPerms = '`MANAGE_WEBHOOKS` permission required!'
    if(ccmsg.length < 1) return message.channel.send(noMessage).then(msg => {
        msg.channel.stopTyping()
    })
    if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send(noPerms).then(msg => {
        msg.channel.stopTyping()
    })


    message.channel.createWebhook(message.author.username, message.author.displayAvatarURL)
    .then(webhook => webhook.edit(message.author.username, message.author.displayAvatarURL)
    .then(wb => wb.send(ccmsg)).then(wb => {
        setTimeout(function(){
            wb.delete()
            var wbDeleted = 'WebHook Deleted\n\n Member: ' + message.author.tag + '\nTime: ' + moment().format()
            message.channel.send(wbDeleted)
        }, 180000);
        }))
        
    .catch(console.error)
    message.channel.stopTyping()
        }
    });

}
module.exports.help = {
    name: "copycat",
    info: "Make a copycat of yourself",
    usage: "copycat <message>"
}
