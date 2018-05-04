const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
         message.guild.fetchWebhooks().then(webhooks => {
        /*     webhooks.forEach( (wb) => {
            message.channel.send(wb)
            }) */
            
            
    const modlog = message.guild.channels.find('name', 'mod-log');
    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var permboterrorsnembed = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Permission Error')
        .setDescription('I must have the permission `MANAGE_CHANNELS`')
    var permerrorsnembed = new Discord.RichEmbed()
        .setColor(colors.critical) 
        .setTitle('Permission Error')
        .setDescription('You must have the permission `MANAGE_CHANNELS`')
    var channelsettings = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Settings')
        .setDescription('Please note that at this time NSFW and Type cannot be changed by a bot')
        .addField('**Name**', '```' + message.channel.name + '```')
        .addField('**Topic**', '```' + message.channel.topic + '```')
        .addField('**Position**', '```' + message.channel.position + '```')
        .addField('**Category/Parent**', '```' + message.channel.parent.name + ' | ' + message.channel.parent.id +'```')
        .addField('**Type**', '```' + message.channel.type + '```')
        .addField('**NSFW**', '```' + message.channel.nsfw + '```')
        .addField('**WebHooks**', '```' + webhooks.size + '```')
        .setFooter('The WebHooks listed here may not all belong to this channel')
    var channelsettingsNoTopic = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Settings')
        .setDescription('Please note that at this time NSFW and Type cannot be changed by a bot')
        .addField('**Name**', '```' + message.channel.name + '```')
        .addField('**Topic**', '*No Topic Set*')
        .addField('**Position**', '```' + message.channel.position + '```')
        .addField('**Category/Parent**', '```' + message.channel.parent.name + ' | ' + message.channel.parent.id +'```')
        .addField('**Type**', '```' + message.channel.type + '```')
        .addField('**NSFW**', '```' + message.channel.nsfw + '```')
        .setFooter('The WebHooks listed here may not all belong to this channel')

    var channelsettingml =  new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Settings Command Used')
        .setDescription('**Name** \n ' + message.channel.name  + '\n **Topic** \n ' + message.channel.topic + '\n **Position** \n ' + message.channel.position)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingmlNoTopic =  new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Settings Command Used')
        .setDescription('**Name** \n ' + message.channel.name  + '\n **Topic** \n *No Topic Set* \n **Position** \n ' + message.channel.position)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingnameml =  new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Name Changed')
        .setDescription('**Name** \n ' + message.channel.name)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingtopicml =  new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Topic Changed')
        .setDescription('**Topic** \n ' + message.channel.topic)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingpositionml =  new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Position Changed')
        .setDescription('**Position** \n ' + message.channel.position)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingparentml = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Channel Parent Changed')
        .setDescription('**Parent**\n' + message.channel.parent.name)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var parenterror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Channel Parent Error')
        .setDescription('At this time you must use the Category/Parent ID to set the current channel\'s category/parent')
    
    if(!setting) {
        if(!message.channel.topic) {
            if(modlog) {
                modlog.send({embed: channelsettingmlNoTopic})
                message.channel.send({embed: channelsettingsNoTopic})
                return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.position, {padding: 1}))
            }
            if(!modlog) {
                message.channel.send({embed: channelsettingsNoTopic})
                return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.position, {padding: 1}))
            }
            
        }
        if(message.channel.topic === 'null') {
            if(modlog) {
                modlog.send({embed: channelsettingmlNoTopic})
                message.channel.send({embed: channelsettingsNoTopic})
                return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.position, {padding: 1}))
            }
            if(!modlog) {
                message.channel.send({embed: channelsettingsNoTopic})
                return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.position, {padding: 1}))
            }
        }
        if(modlog) {
            modlog.send({embed: channelsettingml})
            message.channel.send({embed: channelsettings})
            return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.topic + ' | ' + message.channel.position, {padding: 1}))
        }
        if(!modlog) {
            message.channel.send({embed: channelsettings})
            return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.topic + ' | ' + message.channel.position, {padding: 1}))
        }
    }
    if(setting.includes('name')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
        if(!option) return;
        message.channel.setName(option)
        message.channel.send('Channel Name changed to ' + option)
        console.log(boxen('[Channel Settings (Name)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name, {padding: 1}))
        if(modlog) return modlog.send({embed: channelsettingnameml})
        };
    if(setting.includes('parent')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send({embed: parenterror})
        message.channel.setParent(option).catch(console.error)
        message.channel.send('Channel Parent changed to ' + option)
        console.log(boxen('[Channel Settings (Parent)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name, {padding: 1}))
        if(modlog) return modlog.send({embed: channelsettingparentml})
    }
    if(setting.includes('topic')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
        if(!option) return;
        message.channel.setTopic(option)
        message.channel.send('Channel Topic changed to ' + option)
        console.log(boxen('[Channel Settings (Topic)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.topic, {padding: 1}))
        if(modlog) return modlog.send({embed: channelsettingtopicml})
        }
    if(setting.includes('position')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send('Please provide a positive integer.')
        message.channel.setPosition(option)
        message.channel.send('Channel Position changed to ' + option)
        console.log(boxen('[Channel Settings (Position)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.position, {padding: 1}))
        if(modlog) return modlog.send({embed: channelsettingpositionml})
            }
    if(settings.includes('webhooks')){
        var noWebHookPerms = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setTitle('Permission Error')
            .setDescription('`MANAGE_WEBHOOKS` permission required')
        var webHookInfo = new Discord.RichEmbed()
            .setColor(colors.system)
            .setTitle('ChannelSettings (WebHook Info)')
            .setDescription('**WebHooks:** `' + webhooks.size + '`\nUse `channelsettings webhooks delete` to delete all webhooks on this server')
            .setFooter('Please note that the webhooks listed here may not belong to this channel!')
        var noWebHooks = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setTitle('No WebHooks')
            .setDescription('There are no WebHooks on this server to delete')
        
            
        if(!message.member.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send({embed: noWebHookPerms}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send({embed: noWebHookPerms}).catch(console.error);
        if(!option) return message.channel.send({embed: webHookInfo})
        if(webhooks.size < 1) return message.channel.send({embed: noWebHooks})

        
        webhooks.forEach( (wb) => {
            wb.delete
            })
        message.channel.send('***Deleting WebHooks***')

    }
        });
        } else {
            /*

            LITEMODE

            */
           message.guild.fetchWebhooks().then(webhooks => {

            var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var channelsettings = 'Name ' + message.channel.name + '\n' +
                            'Topic ' + message.channel.topic + '\n' +
                            'Position ' + message.channel.position + '\n' +
                            'Category/Parent `' + message.channel.parent.name + ' | ' + message.channel.parent.id +'\n' +
                            'Type ' + message.channel.type + '\n' + 
                            'NSFW ' + message.channel.nsfw + '\n' +
                            'WebHooks ' + webhooks.size + '\n'
    var channelsettingsNoTopic = 'Name ' + message.channel.name + '\n' +
    'Topic No Topic\n' +
    'Position ' + message.channel.position + '\n' +
    'Category/Parent ' + message.channel.parent.name + ' | ' + message.channel.parent.id +'\n' +
    'Type ' + message.channel.type + '\n' + 
    'NSFW ' + message.channel.nsfw + '\n' +
    'WebHooks ' + webhooks.size + '\n'
   

    
    if(!setting) {
        if(!message.channel.topic) {
                message.channel.send('```' + channelsettingsNoTopic + '```')
                return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.position))
            
        }
        if(message.channel.topic === 'null') {
                message.channel.send('```' + channelsettingsNoTopic + '```')
                return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.position))
        }
            message.channel.send('```' + channelsettings + '```')
            return console.log(boxen('[Channel Settings] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name + ' | ' + message.channel.topic + ' | ' + message.channel.position))

    }
    if(setting.includes('name')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!option) return;
        message.channel.setName(option)
        message.channel.send('Channel Name changed to ' + option)
        console.log(boxen('[Channel Settings (Name)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name))
        };
    if(setting.includes('parent')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send('```' + 'At this time you must use the Category/Parent ID to set the current channel\'s category/parent' +'```')
        message.channel.setParent(option).catch(console.error)
        message.channel.send('Channel Parent changed to ' + option)
        console.log(boxen('[Channel Settings (Parent)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.name))
    }
    if(setting.includes('topic')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!option) return;
        message.channel.setTopic(option)
        message.channel.send('Channel Topic changed to ' + option)
        console.log(boxen('[Channel Settings (Topic)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.topic))
        }
    if(setting.includes('position')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('```'+ boxen('MANAGE_CHANNELS permission required') +'```').catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send('Please provide a positive integer.')
        message.channel.setPosition(option)
        message.channel.send('Channel Position changed to ' + option)
        console.log(boxen('[Channel Settings (Position)] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + message.channel.position))
            };
            if(settings.includes('webhooks')){
                    
                if(!message.member.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send('```' + boxen('MANAGE_WEBHOOKS permission required', {padding: 1}) +'```').catch(console.error);
                if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send('```' + boxen('MANAGE_WEBHOOKS permission required', {padding: 1}) +'```').catch(console.error);
                if(!option) return message.channel.send('**WebHooks:** `' + webhooks.size + '`\nUse `channelsettings webhooks delete` to delete all webhooks on this server\n\nPlease note that the webhooks listed here may not belong to this channel!')
                if(webhooks.size < 1) return message.channel.send('```' + boxen('There are no webhooks to delete.') + '```')
                webhooks.forEach( (wb) => {
                    
                    wb.delete
                    })
                message.channel.send('***Deleting WebHooks***')
        
            }
        });

        }
        
});
}
module.exports.help = {
    name: "channelsettings",
    info: "Change Channel Settings",
    usage: "channelsettings <setting> <option>"
}