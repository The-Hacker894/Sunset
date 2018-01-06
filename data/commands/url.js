const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen')

const googl = require('goo.gl')
module.exports.run = (client, message, args, data, game, announcement) => {
    var option = args[1]
    var userurl = args[2]
    var optionaloptions = ['shorten', 'expand']
    const modlog = message.guild.channels.find('name', 'mod-log');
    
    var longurlerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Error')
        .setDescription('You must provide a `goo.gl` URL to expand')
        if(!option) return message.channel.send({embed: optionerror})
        if(optionaloptions.some(viableoptions => option.includes(viableoptions))) {

            if(option === 'shorten') {
                if(!userurl) return message.channel.send('```' + boxen('You must specify whether or not you would like to shorten or expand a goo.gl URL', {padding: 1}) +'```')
            googl.setKey(data.googlAPIKey);

            googl.getKey();
            
            googl.shorten(userurl)
                .then(function (shortUrl) {
                    message.channel.send(shortUrl)
                })

            }
       if(option.includes('expand')) {
                if(!userurl) return message.channel.send('```' + boxen('You must provide a URL to shorten or expand', {padding: 1}) +'```')
                if(!userurl.includes('goo.gl')) return message.channel.send('```' + boxen('You must provide a `goo.gl` URL to expand', {padding: 1}) +'```')
                googl.setKey(data.googlAPIKey);
    
                googl.getKey();
                
                googl.expand(userurl)
                    .then(function (longUrl) {
                        message.channel.send(longUrl)
                    })
                }
            
        } else { 
            
            message.channel.send('```' + boxen('You must specify whether or not you would like to shorten or expand a goo.gl URL', {padding: 1}) +'```')
                

        }
        console.log(boxen('[URL] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + option + ' | ' + userurl))

}
module.exports.help = {
    name: "url",
    info: "Shorten and expand goo.gl urls",
    usage: "url <shorten|expand> <url>"
}