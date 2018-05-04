
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const options = ['enable', 'disable']
const fs = require("fs")
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    if(message.guild.owner.id !== message.author.id) return message.channel.send('***You can only use this command if you are the owner of the server!***')
    fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
        const guild = message.guild
        var option = message.content.split(' ').slice(1).join(' ')
        var noOption = new Discord.RichEmbed()
            .setColor(colors.system)
            .setTitle('Sunset Lite Mode')
            .setDescription('**Enable Lite Mode**\n' +
                            '`litemode enable`\n' +
                            '**Disable Lite Mode**\n' +
                            '`litemode disable`\n' /*+
                            '**LsiteMode Compatible Commands**\n' +
    '`litemode commands`'*/)
         //   .addField('LiteMode Enabled', litedata)
        if(option.length < 1) return message.channel.send({embed: noOption})
        if(options.some(opt => option.includes(opt))) {

            if(option.includes('enable')) {
            fs.writeFile(`./data/serverdata/${guild.id}/litemode.txt`, 'true', function(err) {
                var enabled = new Discord.RichEmbed()
                    .setColor(colors.success)
                    .setTitle('Sunset Lite Mode Enabled')
                    return message.channel.send({embed: enabled})
            }); 
            } else if(option.includes('disable')) {
                fs.writeFile(`./data/serverdata/${guild.id}/litemode.txt`, 'false', function(err) {
                    var disabled = new Discord.RichEmbed()
                        .setColor(colors.success)
                        .setTitle('Sunset Lite Mode Disabled')
                        return message.channel.send({embed: disabled})
                }); 
            }

   
    } else {
        // If option provided is not enable or disable
       return message.channel.send({embed: noOption})
    }
    });
}
module.exports.help = {
    name: "litemode",
    info: "Enable Sunset LiteMode for your server",
    usage: "litemode <enable|disable>"
}