const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen')
const ms = require('ms')
module.exports.run = (client, message, args, data, game, announcement) => {
    var commandlock = data.lock
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 
    const modlog = message.guild.channels.find('name', 'mod-log');
    var time = message.content.split(' ').slice(1).join(' ')
    if(time.length < 1) return message.channel.send('Please provide time to set.')
    if(time < 1) return message.channel.send('Please provide time to set.')
    var lockdownmlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Lockdown Started')
        .setDescription(time)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var lockdowndonemlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Lockdown Done')
        .setDescription(time)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var lockdownstopped = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setTitle('Lockdown Stopped')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
        var mstime = ms(time)
        if(time === 'unlock') {
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: true
            }).catch(console.error)
            if(modlog) return modlog.send({embed: lockdownstopped})
            if(!modlog) return;
        }
        if(ms(time) > 43200 * 1000) return message.channel.send('Please provide something less than 12 hours (720 minutes; 43200 seconds; ' + 43200 * 1000 + ' milliseconds)') 
         if(isNaN(mstime)) return message.channel.send('Please provide a positive integer.')
        if(ms(time) < 1) return message.channels.send('Cannot set a timer for ' + time)
            if(!message.content.includes('second')) {
            if(!message.content.includes('minute')) {
                if(!message.content.includes('hour')) return message.channel.send(`***Clarification needed*** \n **Suggestions** \n ${time} seconds \n ${time} minutes \n ${time} hours`)
        }
        }
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You must have the `MANAGE_CHANNELS` permission')
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have the `MANAGE_CHANNELS` permission')
    
    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    }).catch(console.error)

    message.channel.send(`***Lockdown for ${mstime} seconds started***`)
    console.log(boxen('[Lockdown Started] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + mstime, {padding: 1}))
    if(modlog) {
        modlog.send({embed: lockdownmlembed})
    }

    setTimeout(Timer, ms(time) * 1000)
    function Timer() {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true
        });
        message.channel.send('***Lockdown Done***')
        console.log(boxen('[Lockdown Done] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + time, {padding: 1}))
        if(modlog) {
            modlog.send({embed: lockdowndonemlembed})
        }
    }
}
module.exports.help = {
    name: "lockdown",
    info: "Locks the channel down",
    usage: "lockdown <time>"
}