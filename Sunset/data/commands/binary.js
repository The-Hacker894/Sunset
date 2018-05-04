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
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
    var code = args[1]
    var text = message.content.split(code).slice(1).join(' ')
    var options = ['encode', 'decode', 'recover']
    var codeerror = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Binary Help')
        .setDescription('Please specify whether or not you want to `decode` `encode` or `recover` text.\n' +
                        '**Encode Text**\n' +
                        '`binary encode Whistle`\n' +
                        '**Decode Text**\n' +
                        '`binary decode 01010111011010000110100101110011011101000110110001100101`\n' +
                        '**Recovery Previous Content**\n' +
                        '`binary recover`')
    var texterror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Error')
        .setDescription('Please provide some text to `decode` or `encode`')
        var asciiToBin = (function () {
            var pad = '00000000';
        
            return function (str) {
                return str.replace(/./g, function (c) {
                    var bin = c.charCodeAt(0).toString(2);
                    return pad.substring(bin.length) + bin;
                });
            };
        }());
        
        var binToAscii = function (bin) {
            return bin.replace(/[01]{8}/g, function (v) {
                return String.fromCharCode(parseInt(v, 2));
            });
        };

        if(!code) return message.channel.send({embed: codeerror})
        const modlog = message.guild.channels.find('name', 'mod-log');
    

    if(options.some(opt => code.includes(options))) {
        message.channel.send({embed: codeerror}).then(message => {
            message.channel.stopTyping()
        })
        
    } else {
        if(code === 'encode') {
            if(!text) return message.channel.send({embed: texterror}).then(message => {
                message.channel.stopTyping()
            })
            fs.writeFile(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, asciiToBin(text), function(err) {
                if(err) {
                    message.channel.send('An exception occured while writing your encoded text to a text file. ' + err).then(message => {
                        message.channel.stopTyping()
                    })
                    return console.log(err);
                } else {
                    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, `binary_encode.txt`)).then(message => {
                        message.channel.stopTyping()
                    })
                }
            });
        }
        if(code === 'decode') {
            if(!text) return message.channel.send({embed: texterror}).then(message => {
                message.channel.stopTyping()
            })
            fs.writeFile(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, binToAscii(text), function(err) {
                if(err) {
                    message.channel.send('An exception occured while writing your decoded text to a text file. ' + err).then(message => {
                        message.channel.stopTyping()
                    })
                    return console.log(err);
                } else {
                    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, `binary_decode.txt`)).then(message => {
                        message.channel.stopTyping()
                    })
                }
            });
        }
        if(code === 'recover') {
            fs.exists(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, function(exists) {
                if (exists) {
                  fs.stat(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, function(err, stats) { 
                    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, `binary_recover.txt`)).then(message => {
                        message.channel.stopTyping()
                    });
                  });
                } else {
                  message.channel.send('You do not have any previous Binary Text Files').then(message => {
                      message.channel.stopTyping()
                  })
                }
              });
        }
        console.log(boxen('[Binary] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + code,  {padding: 1}))
        var binaryml = new Discord.RichEmbed()
            .setColor(colors.system)
            .setTitle('Binary Command Used')
            .setDescription('**Method:** ' + code + '\n**Text:** ' + text)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            if(modlog) return modlog.send({embed: binaryml})
        
    }
} else {
    var code = args[1]
    var text = message.content.split(code).slice(1).join(' ')
    var options = ['encode', 'decode', 'recover']
    
        var asciiToBin = (function () {
            var pad = '00000000';
        
            return function (str) {
                return str.replace(/./g, function (c) {
                    var bin = c.charCodeAt(0).toString(2);
                    return pad.substring(bin.length) + bin;
                });
            };
        }());
        
        var binToAscii = function (bin) {
            return bin.replace(/[01]{8}/g, function (v) {
                return String.fromCharCode(parseInt(v, 2));
            });
        };

        if(!code) return message.channel.send('Please specify whether or not you want to `decode` `encode` or `recover` text.\n' +
        '**Encode Text**\n' +
        '`binary encode Whistle`\n' +
        '**Decode Text**\n' +
        '`binary decode 01010111011010000110100101110011011101000110110001100101`\n' +
        '**Recovery Previous Content**\n' +
        '`binary recover`')
        const modlog = message.guild.channels.find('name', 'mod-log');
    

    if(options.some(opt => code.includes(options))) {
        message.channel.send({embed: codeerror}).then(message => {
            message.channel.stopTyping()
        })
        
    } else {
        if(code === 'encode') {
            if(!text) return message.channel.send('```' + boxen('Please provide some text to `decode` or `encode`', {padding: 1}) +'```').then(message => {
                message.channel.stopTyping()
            })
            fs.writeFile(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, asciiToBin(text), function(err) {
                if(err) {
                    message.channel.send('An exception occured while writing your encoded text to a text file. ' + err).then(message => {
                        message.channel.stopTyping()
                    })
                    return console.log(err);
                } else {
                    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, `binary_encode.txt`)).then(message => {
                        message.channel.stopTyping()
                    })
                }
            });
        }
        if(code === 'decode') {
            if(!text) return message.channel.send('```' + boxen('Please provide some text to `decode` or `encode`', {padding: 1}) +'```').then(message => {
                message.channel.stopTyping()
            })
            fs.writeFile(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, binToAscii(text), function(err) {
                if(err) {
                    message.channel.send('An exception occured while writing your decoded text to a text file. ' + err).then(message => {
                        message.channel.stopTyping()
                    })
                    return console.log(err);
                } else {
                    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, `binary_decode.txt`)).then(message => {
                        message.channel.stopTyping()
                    })
                }
            });
        }
        if(code === 'recover') {
            fs.exists(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, function(exists) {
                if (exists) {
                  fs.stat(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, function(err, stats) { 
                    message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/binary/${message.author.id}.txt`, `binary_recover.txt`)).then(message => {
                        message.channel.stopTyping()
                    });
                  });
                } else {
                  message.channel.send('You do not have any previous Binary Text Files').then(message => {
                      message.channel.stopTyping()
                  })
                }
              });
        }
    }


}
  });
}
module.exports.help = {
    name: "binary",
    info: "Encode and decode text in Binary",
    usage: "binary <encode|decode|recover> <text>"
}