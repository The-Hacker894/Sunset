const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen')

const googl = require('goo.gl')
module.exports.run = (client, message, args, data, game, announcement) => {

    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
    var option = args[1]
    var userurl = args[2]
    var optionaloptions = ['shorten', 'expand']
    const modlog = message.guild.channels.find('name', 'mod-log');

    var optionerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Error')
        .setDescription('You must specify whether you would like to `shorten` or `expand` a URL.')
    
    var userurlerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Error')
        .setDescription('You must provide a URL to `shorten` or `expand`.')
    
    var longurlerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Error')
        .setDescription('You must provide a `goo.gl` URL to expand')
        if(!option) return message.channel.send({embed: optionerror})
        if(optionaloptions.some(viableoptions => option.includes(viableoptions))) {

            if(option.includes ('shorten')) {
                if(!userurl) return message.channel.send({embed: userurlerror})
            googl.setKey(data.googlAPIKey);

            googl.getKey();
            
            googl.shorten(userurl)
                .then(function (shortUrl) {
                    message.channel.send(shortUrl)
                })
                return;

            }
       if(option.includes('expand')) {
                if(!userurl) return message.channel.send({embed: userurlerror})
                if(!userurl.includes('goo.gl')) return message.channel.send({embed: longurlerror})
                googl.setKey(data.googlAPIKey);
    
                googl.getKey();
                
                googl.expand(userurl)
                    .then(function (longUrl) {
                        message.channel.send(longUrl)
                    })
                    return;
                }
            
        } else { 
            
            message.channel.send({embed: longurlerror})
                

        }
        console.log(boxen('[URL] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option + ' | ' + userurl))

}
module.exports.help = {
    name: "url",
    info: "Shorten and expand goo.gl urls",
    usage: "url <shorten|expand> <url>"
}