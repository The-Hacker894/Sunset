const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen')
const tinyurl = require('tinyurl')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {

    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
    var option = args[1]
    var userurl = args[2]
    var optionaloptions = ['shorten', 'expand']
    const modlog = message.guild.channels.find('name', 'mod-log');

    var optionerror = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('URL Help')
        .setDescription('**Shorten URL**\n' +
                        '`url shorten https://hacker-hub.github.io/`\n' +
                        '**Expand URL**\n' + 
                        '*Coming Soon :tm:*')
    
    var userurlerror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Error')
        .setDescription('You must provide a URL to shorten')

        if(!option) return message.channel.send({embed: optionerror})
        if(optionaloptions.some(viableoptions => option.includes(viableoptions))) {

            if(option.includes ('shorten')) {
                if(!userurl) return message.channel.send({embed: userurlerror})

                tinyurl.shorten(userurl, function(res) {
                    message.channel.send(res) 
                });
                return;

            }
       if(option.includes('expand')) {

                    var googleNoMore = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setTitle('Cannot Expand Shortened URLs')
                    .setDescription('Sadly, Google is starting to end support for the `goo.gl` URL Shortening service and transitioning to the FireBase Dynamic Link API\n' +
                                    '**What\'s going to replace it?**\n' +
                                    'At this time, the Dynamic Link API is only for Android and iOS apps and manual URL creation. This means that for Sunset, which is programmed in NodeJS, cannot shorten or expand URLs with Google\n' +
                                    '**What\'s going to happen to Sunset and Sunset Lite?**\n' +  
                                    'For now, we have defaulted to the TinyURL API, but it can only shorten URLs not expand them.')
                    message.channel.send({embed: googleNoMore})
                    return;
                }
            
        } else { 
            
            message.channel.send({embed: optionerror})
                

        }
        console.log(boxen('[URL] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option + ' | ' + userurl))
    } else {
        var option = args[1]
    var userurl = args[2]
    var optionaloptions = ['shorten', 'expand']

    var optionerror = '**Shorten URL**\n' +
                        '`url shorten https://hacker-hub.github.io/`\n' +
                        '**Expand URL**\n' + 
                        '*Coming Soon :tm:*'
    
    var userurlerror = 'You must provide a URL to shorten'

        if(!option) return message.channel.send(optionerror)
        if(optionaloptions.some(viableoptions => option.includes(viableoptions))) {

            if(option.includes ('shorten')) {
                if(!userurl) return message.channel.send('```' + boxen(userurlerror, {padding: 1}) + '```')

                tinyurl.shorten(userurl, function(res) {
                    message.channel.send(res) 
                });
                return;

            }
       if(option.includes('expand')) {

                    var googleNoMore = 'Sadly, Google is starting to end support for the `goo.gl` URL Shortening service and transitioning to the FireBase Dynamic Link API\n' +
                                    '**What\'s going to replace it?**\n' +
                                    'At this time, the Dynamic Link API is only for Android and iOS apps and manual URL creation. This means that for Sunset, which is programmed in NodeJS, cannot shorten or expand URLs with Google\n' +
                                    '**What\'s going to happen to Sunset and Sunset Lite?**\n' +  
                                    'For now, we have defaulted to the TinyURL API, but it can only shorten URLs not expand them.'
                    message.channel.send(googleNoMore)
                    return;
                }
            
        } else { 
            
            message.channel.send(optionerror)
                

        }
    }
});

}
module.exports.help = {
    name: "url",
    info: "Shorten and expand goo.gl urls",
    usage: "url <shorten|expand> <url>"
}