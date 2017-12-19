const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data) => {
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
        .addField('**Name**', '```' + message.channel.name + '```')
        .addField('**Topic**', '```' + message.channel.topic + '```')
        .addField('**Position**', '```' + message.channel.position + '```')
    var channelsettingsNoTopic = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Channel Settings')
        .addField('**Name**', '```' + message.channel.name + '```')
        .addField('**Topic**', '*No Topic Set*')
        .addField('**Position**', '```' + message.channel.position + '```')
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
    
    if(!setting) {
        if(!message.channel.topic) {
            if(modlog) {
                modlog.send({embed: channelsettingmlNoTopic})
                return message.channel.send({embed: channelsettingsNoTopic})
            }
            if(!modlog) {
                return message.channel.send({embed: channelsettingsNoTopic})
            }
            
        }
        if(message.channel.topic === 'null') {
            if(modlog) {
                modlog.send({embed: channelsettingmlNoTopic})
                return message.channel.send({embed: channelsettingsNoTopic})
            }
            if(!modlog) {
                return message.channel.send({embed: channelsettingsNoTopic})
            }
        }
        if(modlog) {
            modlog.send({embed: channelsettingmlNoTopic})
            return message.channel.send({embed: channelsettingsNoTopic})
        }
        if(!modlog) {
            return message.channel.send({embed: channelsettingsNoTopic})
        }
    }
    if(setting.includes('name')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
        if(!option) return;
        message.channel.setName(option)
        message.channel.send('Channel Name changed to ' + option)
        if(modlog) return modlog.send({embed: channelsettingnameml})
        };
    if(setting.includes('topic')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
        if(!option) return;
        message.channel.setTopic(option)
        message.channel.send('Channel Topic changed to ' + option)
        if(modlog) return modlog.send({embed: channelsettingtopicml})
        }
    if(setting.includes('position')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
        if(!option) return;
        if(isNaN(option)) return message.channel.send('Please provide a positive integer.')
        message.channel.setPosition(option)
        message.channel.send('Channel Position changed to ' + option)
        if(modlog) return modlog.send({embed: channelsettingpositionml})
            };

}
module.exports.help = {
    name: "channelsettings",
    info: "Change Channel Settings",
    usage: "channelsettings <setting> <option>"
}