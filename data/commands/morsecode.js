const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const Attachment = require("discord.js").Attachment
const boxen = require('boxen');
const morse = require('morse');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
    if (commandlock.includes('true')) {
        if (message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')
    }
    fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
        if (!litedata.includes('true')) {

            var code = args[1]
            var text = message.content.split(code).slice(1).join(' ')

            var options = ['encode', 'decode', 'recover']
            var codeerror = new Discord.RichEmbed()
                .setColor(colors.system)
                .setTitle('MorseCode Help')
                .setDescription('Please specify whether or not you want to `decode` `encode` or `recover` text.\n' +
                    '**Encode Text**\n' +
                    '`morsecode encode TheHacker is a Freelancer`\n' +
                    '**Decode Text**\n' +
                    '`morsecode decode - .... . .... .- -.-. -.- . .-. / .. ... / .- / ..-. .-. . . .-.. .- -. -.-. . .-.`\n' +
                    '**Recovery Previous Content**\n' +
                    '`morsecode recover`')
            var texterror = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('Error')
                .setDescription('Please provide some text to `decode` or `encode`')
            const modlog = message.guild.channels.find('name', 'mod-log');

            if (!code) return message.channel.send({
                embed: codeerror
            })


            if (options.some(opt => code.includes(options))) {
                message.channel.send({
                    embed: codeerror
                }).then(message => {
                    message.channel.stopTyping()
                })

            } else {
                if (code === 'encode') {
                    if (!text) return message.channel.send({
                        embed: texterror
                    }).then(message => {
                        message.channel.stopTyping()
                    })
                    fs.writeFile(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, morse.encode(text), function (err) {
                        if (err) {
                            message.channel.send('An exception occured while writing your encoded text to a text file. ' + err).then(message => {
                                message.channel.stopTyping()
                            })
                            return console.log(err);
                        } else {
                            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, `morsecode_encode.txt`)).then(message => {
                                message.channel.stopTyping()
                            })
                        }
                    });
                }
                if (code === 'decode') {
                    if (!text) return message.channel.send({
                        embed: texterror
                    }).then(message => {
                        message.channel.stopTyping()
                    })
                    fs.writeFile(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, morse.decode(text), function (err) {
                        if (err) {
                            message.channel.send('An exception occured while writing your decoded text to a text file. ' + err).then(message => {
                                message.channel.stopTyping()
                            })
                            return console.log(err);
                        } else {
                            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, `morsecode_decode.txt`)).then(message => {
                                message.channel.stopTyping()
                            })
                        }
                    });
                }
                if (code === 'recover') {
                    fs.exists(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, function (exists) {
                        if (exists) {
                            fs.stat(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, function (err, stats) {
                                message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, `morsecode_recover.txt`)).then(message => {
                                    message.channel.stopTyping()
                                });
                            });
                        } else {
                            message.channel.send('You do not have any previous Morse Code Text Files').then(message => {
                                message.channel.stopTyping()
                            })
                        }
                    });
                }
                console.log(boxen('[Morse Code] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + code, {
                    padding: 1
                }))
                var morsecodeml = new Discord.RichEmbed()
                    .setColor(colors.system)
                    .setTitle('Morse Code Command Used')
                    .setDescription('**Method:** ' + code + '\n**Text:** ' + text)
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                if (modlog) return modlog.send({
                    embed: morsecodeml
                })
            }
        } else {
            // LiteMode
            var code = args[1]
            var text = message.content.split(code).slice(1).join(' ')

            var options = ['encode', 'decode', 'recover']
            var codeerror = 'Please specify whether or not you want to `decode` `encode` or `recover` text.\n' +
                    '**Encode Text**\n' +
                    '`morsecode encode TheHacker is a Freelancer`\n' +
                    '**Decode Text**\n' +
                    '`morsecode decode - .... . .... .- -.-. -.- . .-. / .. ... / .- / ..-. .-. . . .-.. .- -. -.-. . .-.`\n' +
                    '**Recovery Previous Content**\n' +
                    '`morsecode recover`'
            var texterror = 'Please provide some text to `decode` or `encode`'

            if (!code) return message.channel.send(codeerror)


            if (options.some(opt => code.includes(options))) {
                message.channel.send(codeerror).then(message => {
                    message.channel.stopTyping()
                })

            } else {
                if (code === 'encode') {
                    if (!text) return message.channel.send(texterror).then(message => {
                        message.channel.stopTyping()
                    })
                    fs.writeFile(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, morse.encode(text), function (err) {
                        if (err) {
                            message.channel.send('An exception occured while writing your encoded text to a text file. ' + err).then(message => {
                                message.channel.stopTyping()
                            })
                            return console.log(err);
                        } else {
                            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, `morsecode_encode.txt`)).then(message => {
                                message.channel.stopTyping()
                            })
                        }
                    });
                }
                if (code === 'decode') {
                    if (!text) return message.channel.send(texterror).then(message => {
                        message.channel.stopTyping()
                    })
                    fs.writeFile(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, morse.decode(text), function (err) {
                        if (err) {
                            message.channel.send('An exception occured while writing your decoded text to a text file. ' + err).then(message => {
                                message.channel.stopTyping()
                            })
                            return console.log(err);
                        } else {
                            message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, `morsecode_decode.txt`)).then(message => {
                                message.channel.stopTyping()
                            })
                        }
                    });
                }
                if (code === 'recover') {
                    fs.exists(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, function (exists) {
                        if (exists) {
                            fs.stat(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, function (err, stats) {
                                message.channel.send(new Attachment(`./data/serverdata/${message.guild.id}/morsecode/${message.author.id}.txt`, `morsecode_recover.txt`)).then(message => {
                                    message.channel.stopTyping()
                                });
                            });
                        } else {
                            message.channel.send('You do not have any previous Morse Code Text Files').then(message => {
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
    name: "morsecode",
    info: "Encode and decode text in Morse Code",
    usage: "morsecode <encode|decode|recover> <text>"
}