const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
    const modlog = message.guild.channels.find('name', 'mod-log');
    var setting = args[1]
    var option = message.content.split(setting).slice(1).join(' ')
    var permboterrorsnembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Permission Error')
        .setDescription('I must have the permission `MANAGE_CHANNELS`')
    var permerrorsnembed = new Discord.RichEmbed()
        .setColor(data.embedcolor) 
        .setTitle('Permission Error')
        .setDescription('You must have the permission `MANAGE_CHANNELS`')
    var channelsettings = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Settings')
        .setDescription('Please note that at this time NSFW and Type cannot be changed by a bot')
        .addField('**Name**', '```' + message.channel.name + '```')
        .addField('**Topic**', '```' + message.channel.topic + '```')
        .addField('**Position**', '```' + message.channel.position + '```')
        .addField('**Category/Parent**', '```' + message.channel.parent.name + ' | ' + message.channel.parent.id +'```')
        .addField('**Type**', '```' + message.channel.type + '```')
        .addField('**NSFW**', '```' + message.channel.nsfw + '```')
    var channelsettingsNoTopic = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Settings')
        .setDescription('Please note that at this time NSFW and Type cannot be changed by a bot')
        .addField('**Name**', '```' + message.channel.name + '```')
        .addField('**Topic**', '*No Topic Set*')
        .addField('**Position**', '```' + message.channel.position + '```')
        .addField('**Category/Parent**', '```' + message.channel.parent.name + ' | ' + message.channel.parent.id +'```')
        .addField('**Type**', '```' + message.channel.type + '```')
        .addField('**NSFW**', '```' + message.channel.nsfw + '```')
    var channelsettingml =  new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Settings Command Used')
        .setDescription('**Name** \n ' + message.channel.name  + '\n **Topic** \n ' + message.channel.topic + '\n **Position** \n ' + message.channel.position)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingmlNoTopic =  new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Settings Command Used')
        .setDescription('**Name** \n ' + message.channel.name  + '\n **Topic** \n *No Topic Set* \n **Position** \n ' + message.channel.position)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingnameml =  new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Name Changed')
        .setDescription('**Name** \n ' + message.channel.name)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingtopicml =  new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Topic Changed')
        .setDescription('**Topic** \n ' + message.channel.topic)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingpositionml =  new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Position Changed')
        .setDescription('**Position** \n ' + message.channel.position)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var channelsettingparentml = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Parent Changed')
        .setDescription('**Parent**\n' + message.channel.parent.name)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
    var parenterror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
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
            };

}
module.exports.help = {
    name: "channelsettings",
    info: "Change Channel Settings",
    usage: "channelsettings <setting> <option>"
}