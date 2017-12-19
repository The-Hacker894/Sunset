
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
const ms = require('ms')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement) => {
    const modlog = message.guild.channels.find('name', 'mod-log');
    var commandlock = data.lock
    if(commandlock.includes('true')) {       
      if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
    } 
    var commandlock = data.lock
    if(commandlock.includes('true')) {
        if(message.author.id !== `lawl`) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')
    } 
    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var settingembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Settings Command Used')
        .setDescription('**Announcement** \n' + announcement.announce + '\n **Color** \n' + data.embedcolor + '\n **Command Lock** \n ' + data.lock + '\n **Game** \n' + game.game + '\n **Status** \n' + client.user.presence.status)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var settingcolor = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Setting Color Command Used')
        .setDescription('**Color** \n ' + data.embedcolor)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settingannouncement = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Setting Announcement Command Used')
        .setDescription('**Announcement** \n ' + announcement.announce)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settinglock = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Setting Command Lock Command Used')
        .setDescription('**Command Lock** \n ' + data.lock)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settinggame = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Setting Game Command Used')
        .setDescription('**Game** \n ' + game.game)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settingpresence = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Setting Presence Command Used')
        .setDescription('**Status** \n ' + client.user.presence.status)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    //var option = args[2].split(' ').slice(1).join(' ')
    var setembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Settings')
        .addField('Announcement', '```' + announcement.announce + '```')
        .addField('Color', '```' + data.embedcolor + '```')
        .addField('Command Lock', '```' + data.lock + '```')
        .addField('Game', '```' + game.game + '```')
        .addField('Status', '```' + client.user.presence.status + '```')
    if(!setting) {
        if(modlog) {
            modlog.send({embed: settingembed})
            return message.channel.send({embed: setembed})
        }
        if(!modlog) {
            return message.channel.send({embed: setembed})
        }
    }
    if(setting.includes('announcement')) {
       // if(!option) return;
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        announcement.announce = option;
      
      fs.writeFileSync("./data/brain/announcement.json", JSON.stringify(announcement), (err) => console.error);
      message.channel.send('Set announcement to `' + option + '`')
      if(modlog) return modlog.send({embed: settingannouncement})
    }
    if(setting.includes('color')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        data.embedcolor = option
        fs.writeFileSync("./data/brain/data.json", JSON.stringify(data), (err) => console.error);
        message.channel.send('Set embed color to `' + data.embedcolor + '`')
        if(modlog) return modlog.send({embed: settingcolor})
    }
    if(setting.includes('game')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        
        game.game = option
        
        fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)
              message.delete()
              message.channel.send('Set Game Status to `' + game.game + ' | ' + data.prefix + 'help`').catch(console.error);
              client.user.setGame(game.game + ' | ' + data.prefix + 'help')
              if(modlog) return modlog.send({embed: settinggame})

    }
    if(setting.includes('lock')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        if(!option === 'false') {
            if(!option === 'true') {
                message.channel.send('Please set the lock to `true` or `false`')
            }
        }

        data.lock = option

        fs.writeFile("./data/brain/data.json", JSON.stringify(data), (err) => console.error)
        message.delete()
        message.channel.send('Set Command Lock to `' + data.lock + '`').catch(console.error);
        if(modlog) return modlog.send({embed: settinglock})
    } 
    if(setting.includes('status')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        if(!option.includes('online')) {
            if(!option.includes('idle')) {
                if(!option.includes('dnd')) {
                    if(!option.includes('invisible')) return message.channel.send('The status must be `online`, `idle`, `dnd`, or `invisible`')
                }
            }
        }

        client.user.setStatus(option).catch(console.error)
        message.channel.send('Status changed to `' + option + '`')
        if(modlog) return modlog.send({embed: settingstatus})

    }
}
module.exports.help = {
    name: "settings",
    info: "Change Sunset's settings",
    usage: "settings <setting> <option>"
}