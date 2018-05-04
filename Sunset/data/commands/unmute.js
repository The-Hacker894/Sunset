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
const modlog = message.guild.channels.find('name', 'mod-log');

if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You must have the `MANAGE_CHANNELS` permission')
if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have the `MANAGE_CHANNELS` permission')

if(muteMember.length < 1) return message.channel.send('Please provide a member to mute')
if(!muteMember) return message.channel.send('That user does not exist')

if(!muteRole) {
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
            message.channel.send('An error occured while attempting make the mute role ' + err)
        })
}
    var unmutedmember = new Discord.RichEmbed()
        .setColor(colors.success)
        .setTitle('UnMuted')
        .setDescription('Unmuted ' + muteMember)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var unmuteerror = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(muteMember + ' is not muted.')
        if(!muteMember.roles.has(muteRole.id)) {
            return message.channel.send({embed: unmuteerror})
        }

muteMember.removeRole(muteRole)
    .then(() => {
        message.channel.send({embed: unmutedmember})
        muteMember.send({embed: unmutedmember})
    })
    .catch(err => {
    message.channel.send('An error occured: ' + err)
})
    } else {
        // LiteMode
        
        message.channel.send('This command is not available for Sunset LiteMode')

    }   
});


}
module.exports.help = {
    name: "unmute",
    info: "Unmute an already muted member",
    usage: "unmute <@user>"
}