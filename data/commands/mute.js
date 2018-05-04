const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const ms = require('ms')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {

    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
var messagecontent = message.content.split(' ').slice(1).join(' ')
var muteMember = message.guild.member(message.mentions.users.first());
const muteRole = message.guild.roles.find('name', 'Muted by SUNSET')
const muteRoleExists = message.guild.roles.exists('name', 'Muted by SUNSET')
const modlog = message.guild.channels.find('name', 'mod-log');

 var mutetime = message.content.split(/\s+/g).slice(2).join(" ");

 if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You must have the `MANAGE_CHANNELS` permission')
 if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have the `MANAGE_CHANNELS` permission')
 if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You must have the `MANAGE_ROLES` permission')
 if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have the `MANAGE_ROLES` permission')

 var msMuteTime = ms(mutetime)
    if(!muteMember) return message.channel.send('Please provide a member to mute')
    

    if(!muteRoleExists) {
        message.guild.createRole({
            name: 'Muted by SUNSET',
            color: 'ORANGE',
            SEND_MESSAGES: false,
            SEND_TTS_MESSAGES: false,
          })
            .then(role => {
                var createdrole = new Discord.RichEmbed()
                .setColor(colors.success)
                .setTitle('Created Role')
                .setDescription(`Created role ${role}`)
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                message.channel.send({embed: createdrole})
            })
            .catch(err => {
                message.channel.send('An error occured: ' + err)
            })
    }
   /* muteRole.setPermissions(['SEND_MESSAGES', 'SEND_TTS_MESSAGES']).catch(err => {
        message.channel.send('An error occured: ' + err)
    }) */
    message.guild.channels.forEach((channel, id) => {
        channel.overwritePermissions(muteRole, {
            SEND_MESSAGES: false,
            SEND_TTS_MESSAGES: false
        }).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
    })
    var muteerror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription(muteMember + ' is already muted!')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var muteself = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('You cannot mute yourself')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var highestrolemember = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription(`You cannot mute ${muteMember} because they have the same role or a higher role than you.`) 
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var highestroleclient = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription(`I cannot mute ${muteMember} because they have the same role or a higher role than me.`)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
       /* console.log(message.member.highestRole.position + '||||||||         1')
        console.log(muteMember.highestRole.position + '||||||||         2')
        console.log(message.guild.me.highestRole.position + '||||||||         3') */


    if(muteMember.roles.has(muteRoleExists.id)) {
        return message.channel.send({embed: muteerror}).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
    }
    if(muteMember.id === message.author.id) {
        return message.channel.send({embed: muteself}).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
    }
    if(muteMember.highestRole.position >= message.member.highestRole.position) {
        return message.channel.send({embed: highestrolemember}).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
    }
    if(message.guild.me.highestRole.position <= muteMember.highestRole.position) {
        return message.channel.send({embed: highestroleclient}).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
    }
    if(!mutetime) {
        muteMember.addRole(muteRole).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
        var muteduser = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Muted User')
        .setDescription('Muted ' + muteMember + ' indefinitely.')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    return message.channel.send({embed: muteduser});
    }

    muteMember.addRole(muteRole).catch(err => {
        message.channel.send('An error occured: ' + err)
    })

    setTimeout(Timer, msMuteTime)
    var mutedone = new Discord.RichEmbed()
        .setColor(colors.success)
        .setTitle('Mute Done')
        .setDescription('Mute for ' + muteMember + ' is done')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    function Timer() {
        muteMember.removeRole(muteRole).catch(err => {
            message.channel.send('An error occured: ' + err)
            muteMember.send({embed: muteddone})
        })
        message.channel.send({embed: mutedone})
        if(modlog) {
            modlog.send({embed: mutedone})
        }
    }
    var muteduser = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Muted User')
        .setDescription('Muted ' + muteMember + ' for ' + mutetime)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    message.channel.send({embed: muteduser})
    muteMember.send({embed: muteduser})
    var mutedml = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Mute Command Used')
        .setDescription('Muted ' + muteMember)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    if(modlog) return modlog.send({embed: mutedml})
    
    
    } else {
        // LiteMode

        message.channel.send('This command is not available for Sunset LiteMode')
    }
});
}
module.exports.help = {
    name: "mute",
    info: "Mute the mentioned user",
    usage: "mute <@user> <time>"
}