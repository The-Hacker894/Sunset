
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
    const modlog = message.guild.channels.find('name', 'mod-log');

    var newstatus = client.user.presence.status.toUpperCase()

    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var settingembed = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Settings Command Used')
        .setDescription('**Announcement** \n' + announcement.announce + '\n **Command Lock** \n ' + data.lock + '\n **Game** \n' + game.game + '\n **Status** \n' + client.user.presence.status)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
 
        var settingannouncement = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Setting Announcement Command Used')
        .setDescription('**Announcement** \n ' + announcement.announce)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settinglock = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Setting Command Lock Command Used')
        .setDescription('**Command Lock** \n ' + data.lock)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settinggame = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Setting Game Command Used')
        .setDescription('**Game** \n ' + game.game)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settingpresence = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Setting Presence Command Used')
        .setDescription('**Status** \n ' + newstatus)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var settingactivity = new Discord.RichEmbed()
            .setColor(colors.system)
            .setTitle('Setting Activity Command Used')
            .setDescription('**Activity**\n' + client.user.activity)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
    //var option = args[2].split(' ').slice(1).join(' ')
    var setembed = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Settings')
        .addField('Announcement', '```' + announcement.announce + '```')
        .addField('Command Lock', '```' + data.lock + '```')
        .addField('Game', '```' + game.game + '```')
        .addField('Activity', '```' + game.activity + '```')
        .addField('Status', '```' + newstatus + '```')
    if(!setting) {
        if(modlog) {
            modlog.send({embed: settingembed})
            console.log(boxen('[Settings] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
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
      console.log(boxen('[Settings Announcement] ' + message.guild.name + ' | ' + message.author.name + ' | ' + option, {padding: 1}))
      if(modlog) return modlog.send({embed: settingannouncement})
    }

    if(setting.includes('game')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        
        game.game = option
        
        fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)
              message.delete()
              message.channel.send('Set Game Status to `' + game.game + ' | ' + data.prefix + 'help`').catch(console.error);
        
            if(game.activity.includes('PLAYING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'PLAYING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settinggame})
            }
            if(game.activity.includes('STREAMING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'STREAMING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settinggame})
            }
            if(game.activity.includes('LISTENING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'LISTENING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settinggame})
            }
            if(game.activity.includes('WATCHING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'WATCHING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settinggame})
            }

    }
    if(setting.includes('activity')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        var validacts = ['PLAYING', 'WATCHING', 'STREAMING', 'LISTENING']
        if(validacts.some(activities => option.includes(activities))) {
            var newoption = option.toUpperCase()
            if(newoption.includes('PLAYING')) {

                game.activity = 'PLAYING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'PLAYING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settingactivity})
            }
            if(newoption.includes('WATCHING')) {

                game.activity = 'WATCHING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'WATCHING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settingactivity})
            }
            if(newoption.includes('STREAMING')) {

                game.activity = 'STREAMING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'STREAMING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settingactivity})
            }
            if(newoption.includes('LISTENING')) {

                game.activity = 'LISTENING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'LISTENING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
              if(modlog) return modlog.send({embed: settingactivity})
            }
        

        } else {
            message.channel.send('Valid Activities\n`PLAYING` `LISTENING` `WATCHING` `STREAMING`')
        }
              
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
        console.log(boxen('[Settings Command Lock] ' + message.guild.name + ' | ' + message.author.name + ' | ' + option, {padding: 1}))
        if(modlog) return modlog.send({embed: settinglock})
    } 
    if(setting.includes('status')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        var statusoptions = ['online', 'idle', 'dnd', 'invisible']
        if(statusoptions.some(terms => option.includes(terms))) {
            client.user.setStatus(option).catch(console.error)
            message.channel.send('Status changed to `' + option + '`')
            console.log(boxen('[Settings Status] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            if(modlog) return modlog.send({embed: settingstatus})
        } else {
            message.channel.send('The status must be `online`, `idle`, `dnd`, or `invisible`')
        }
    }
} else {
    // LiteMode

    var newstatus = client.user.presence.status.toUpperCase()

    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var settingembed = '**Announcement** \n' + announcement.announce + '\n **Command Lock** \n ' + data.lock + '\n **Game** \n' + game.game + '\n **Status** \n' + client.user.presence.status

        var settingannouncement = '**Announcement** \n ' + announcement.announce
        var settinglock = '**Command Lock** \n ' + data.lock
        var settinggame = '**Game** \n ' + game.game
        var settingpresence = '**Status** \n ' + newstatus
        var settingactivity = '**Activity**\n' + client.user.activity
    var setembed = 'Announcement ' + announcement.announce + '\n'
        + 'Command Lock ' + data.lock + '\n' +
         'Game '  + game.game + '\n' +
         'Activity ' + game.activity + '\n' +
         'Status ' + newstatus
    if(!setting) return message.channel.send('```' + boxen(setembed, {padding: 1}) + '```')
    if(setting.includes('announcement')) {
       // if(!option) return;
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        announcement.announce = option;
      
      fs.writeFileSync("./data/brain/announcement.json", JSON.stringify(announcement), (err) => console.error);
      message.channel.send('Set announcement to `' + option + '`')
      console.log(boxen('[Settings Announcement] ' + message.guild.name + ' | ' + message.author.name + ' | ' + option, {padding: 1}))
    }
    if(setting.includes('game')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        
        game.game = option
        
        fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)
              message.delete()
              message.channel.send('Set Game Status to `' + game.game + ' | ' + data.prefix + 'help`').catch(console.error);
        
            if(game.activity.includes('PLAYING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'PLAYING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }
            if(game.activity.includes('STREAMING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'STREAMING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }
            if(game.activity.includes('LISTENING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'LISTENING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }
            if(game.activity.includes('WATCHING')) {
                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'WATCHING' })
                console.log(boxen('[Settings Game] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }

    }
    if(setting.includes('activity')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        var validacts = ['PLAYING', 'WATCHING', 'STREAMING', 'LISTENING']
        if(validacts.some(activities => option.includes(activities))) {
            var newoption = option.toUpperCase()
            if(newoption.includes('PLAYING')) {

                game.activity = 'PLAYING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'PLAYING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }
            if(newoption.includes('WATCHING')) {

                game.activity = 'WATCHING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'WATCHING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }
            if(newoption.includes('STREAMING')) {

                game.activity = 'STREAMING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'STREAMING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }
            if(newoption.includes('LISTENING')) {

                game.activity = 'LISTENING'
                fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)

                client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'LISTENING' })
                message.delete()
              message.channel.send('Set Activity to `' + game.activity + '`').catch(console.error);
              
              console.log(boxen('[Settings Activity] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
            }
        

        } else {
            message.channel.send('Valid Activities\n`PLAYING` `LISTENING` `WATCHING` `STREAMING`')
        }
              
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
        console.log(boxen('[Settings Command Lock] ' + message.guild.name + ' | ' + message.author.name + ' | ' + option, {padding: 1}))
    } 
    if(setting.includes('status')) {
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Setting**`).catch(console.error);
        if(!option) return;
        var statusoptions = ['online', 'idle', 'dnd', 'invisible']
        if(statusoptions.some(terms => option.includes(terms))) {
            client.user.setStatus(option).catch(console.error)
            message.channel.send('Status changed to `' + option + '`')
            console.log(boxen('[Settings Status] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option, {padding: 1}))
        } else {
            message.channel.send('The status must be `online`, `idle`, `dnd`, or `invisible`')
        }
    }

}
  });
}
module.exports.help = {
    name: "settings",
    info: "Change Sunset's settings",
    usage: "settings <setting> <option>"
}