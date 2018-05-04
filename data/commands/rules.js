const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  
    console.log('Beginning')
    var ruleset = args[1]
    var rulestoset = message.content.split(ruleset).slice(1).join(' ')
    if(!ruleset) {
        console.log('if no ruleset')
        fs.exists(`./data/serverdata/${message.guild.id}/rule/${message.guild.id}.txt`, function(exists) {
            if (exists) {
                console.log('if exists')
                fs.readFile(`./data/serverdata/${message.guild.id}/rule/${message.guild.id}.txt`, 'utf8', function(err, data) {
                    console.log('read file')
                    if (err) {
                        return console.log(err)
                    }
                    var ruled = new Discord.RichEmbed()
                        .setColor(colors.system)
                        .setDescription(data)
                        .setAuthor(message.guild.name, message.guild.iconURL)
                    message.channel.send({embed: ruled})
                    console.log('send data')
                  });
            } else {
                message.channel.send("You do not have any rules set for this server. You can use `rules set <rules>` to set your server rules.")
                console.log('no file')
            }
        });
        }
        
    if(ruleset === 'set') {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('MANAGE_GUILD permission required').catch(console.error);

        console.log('if ruleset equal set')
        if(!rulestoset) return;
        console.log('if no rulestoset')
        fs.writeFile(`./data/serverdata/${message.guild.id}/rule/${message.guild.id}.txt`, rulestoset, function(err) {
            console.log('write file')
            if(err) {
                return console.log(err);
            }
        
            message.channel.send('Rules have been set!')
            console.log('file written')
        }); 
        }

    
}
module.exports.help = {
    name: "rules",
    info: "View the rules of your server, if there are any",
    usage: "rules set <rules>"
}