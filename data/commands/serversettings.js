const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
const options = ['invites', 'links', 'announcements']
module.exports.run = (client, message, args, data, announcement, colors) => {

    var commandlock = data.lock
    if (commandlock.includes('true')) {
        if (message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')
    }
    if (!fs.existsSync(`./data/serverdata/${message.guild.id}/litemode.txt`)) {
        fs.writeFileSync(`./data/serverdata/${message.guild.id}/litemode.txt`, 'false', function(err) {
        });
    };
    if (!fs.existsSync(`./data/serverdata/${message.guild.id}/settings/blockinvite.txt`)) {
        fs.writeFileSync(`./data/serverdata/${message.guild.id}/settings/blockinvite.txt`, 'false', function(err) {
        });
    };
    if (!fs.existsSync(`./data/serverdata/${message.guild.id}/settings/blocklinks.txt`)) {
        fs.writeFileSync(`./data/serverdata/${message.guild.id}/settings/blocklinks.txt`, 'false', function(err) {
        });
    };
    var sooc = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('Server Owner-Only Command')
                .setDescription('This command is locked to the server owner. If you think this is an error please contact <@270375857384587264>')

            if (message.author.id !== message.guild.owner.id) return message.channel.send({
                embed: sooc
            })
            
    fs.readFile(`./data/serverdata/${message.guild.id}/settings/blockinvite.txt`, function (err, blckinv) {
        fs.readFile(`./data/serverdata/${message.guild.id}/settings/blocklinks.txt`, function (err, blcklnk) {

    var option = args[1]
    var parameter = args[2]
    var eParameter = args[3]
    fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
        if (!litedata.includes('true')) {
            // Regular Sunset
            function mainHelp() {
                var noOption = new Discord.RichEmbed()
                    .setColor(colors.system)
                    .setTitle(client.user.username + ' Server Settings')
                    .setDescription('If you are looking for economy settings use `' + data.prefix + 'economysettings`')
                    .addField('Block Invites', '`' + data.prefix + 'serversettings invites <true|false>`', true)
                    .addField('Block Links', '`' + data.prefix + 'serversettings links <true|false>`', true)
                    .addField('Announcements', '`' + data.prefix + 'serversettings announcements <true|false>`', true)
                    .setAuthor(client.user.username, client.user.displayAvatarURL)
                    message.channel.send({embed: noOption})
            }
            if(!option) {
                return mainHelp()
            }
            if(options.some(opts => option.includes(opts))) {
                if(option.includes('invites')) {
                    if(!parameter) {
                        var noParam = new Discord.RichEmbed()
                            .setColor(colors.system)
                            .setTitle('Block Invites')
                            .setDescription('`' + blckinv + '`')
                            .setAuthor(message.guild.name, message.guild.iconURL)
                            return message.channel.send({embed: noParam})
                    } 
                    if(parameter.includes('true')) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/settings/blockinvite.txt`, 'true', function(err) {
                        if(err) return message.channel.send('An unexpected error occured: ' + err)
                        var successTrue = new Discord.RichEmbed()
                            .setColor(colors.success)
                            .setTitle('Now Blocking Invites')
                            .setDescription('Successfully set `Block Invites` to true.')
                            .setAuthor(message.guild.name, message.guild.iconURL)
                            return message.channel.send({embed: successTrue})
                    });
                    return;
                }
                if(parameter.includes('false')) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/settings/blockinvite.txt`, 'false', function(err) {
                    if(err) return message.channel.send('An unexpected error occured: ' + err)
                    var successFalse = new Discord.RichEmbed()
                        .setColor(colors.success)
                        .setTitle('Will Stop Blocking Invites')
                        .setDescription('Successfully set `Block Invites` to false.')
                        .setAuthor(message.guild.name, message.guild.iconURL)
                        return message.channel.send({embed: successFalse})
                    });
                    return;
                }
                var trueOrFalse = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setTitle('Error')
                    .setDescription('`' + data.prefix + 'serversettings invites` only allows for one parameter that either includes `true` or `false`.')
                    .setAuthor(message.guild.name, message.guild.iconURL)
                    return message.channel.send({embed: trueOrFalse})
                }
                if(option.includes('links')) {
                    function noParam() {
                        var noParam = new Discord.RichEmbed()
                            .setColor(colors.system)
                            .setTitle('Block Links')
                            .setDescription('`' + blcklnk + '`')
                            .setAuthor(message.guild.name, message.guild.iconURL)
                            message.channel.send({embed: noParam})
                    }
                    if(!parameter) {
                        return noParam()
                    }
                    if(parameter.includes('true')) {
                        fs.writeFile(`./data/serverdata/${message.guild.id}/settings/blocklinks.txt`, 'true', function(err) {
                            if(err) return message.channel.send('An unexpected error occurred: ' + err)
                            var successTrue = new Discord.RichEmbed()
                                .setColor(colors.success)
                                .setTitle('Now Blocking All Links')
                                .setDescription('Successfully set `Block Links` to `true`')
                                .setAuthor(message.guild.name, message.guild.iconURL)
                                return message.channel.send({embed: successTrue})
                        });
                        return;
                    }
                    if(parameter.includes('false')) {
                        fs.writeFile(`./data/serverdata/${message.guild.id}/settings/blocklinks.txt`, 'false', function(err) {
                            if(err) return message.channel.send('An unexpected error occured: ' + err)
                            var successFalse = new Discord.RichEmbed()
                                .setColor(colors.success)
                                .setTitle('Will Stop Blocking All Links')
                                .setDescription('Successfully set `Block Links` to `false`')
                                .setAuthor(message.guild.name, message.guild.iconURL)
                                return message.channel.send({embed: successFalse})
                        });
                        return
                    }
                    var trueOrFalse = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setTitle('Error')
                    .setDescription('`' + data.prefix + 'serversettings links` only allows for one parameter that either includes `true` or `false`.')
                    .setAuthor(message.guild.name, message.guild.iconURL)
                    return message.channel.send({embed: trueOrFalse})
                }
                if(option.includes('announcements')) {
                    if (!fs.existsSync(`./data/serverdata/${message.guild.id}/settings/serverannouncements.txt`)) {
                        fs.writeFileSync(`./data/serverdata/${message.guild.id}/settings/serverannouncements.txt`, 'true', function(err) {
                        });
                    };
                    fs.readFile(`./data/serverdata/${message.guild.id}/settings/serverannouncements.txt`, function (err, servann) {

                    function noParam() {
                        var noParam = new Discord.RichEmbed()
                            .setColor(colors.system)
                            .setTitle('Guild Announcements')
                            .setDescription('Disabling this will remove Ban, UnBan, Join, and Leave announcements.\n\n `' + servann + '`')
                            .setAuthor(message.guild.name, message.guild.iconURL)
                            message.channel.send({embed: noParam})
                    }
                    if(!parameter) {
                        return noParam()
                    }
                    if(parameter.includes('true')) {
                        fs.writeFile(`./data/serverdata/${message.guild.id}/settings/serverannouncements.txt`, 'true', function(err) {
                            if(err) return message.channel.send('An unexpected error occured: ' + err)
                            var successTrue = new Discord.RichEmbed()  
                                .setColor(colors.success)
                                .setTitle('Server Announcements Enabled!')
                                .setDescription('Sunset will now start sending server announcements.')
                                .setAuthor(message.guild.name, message.guild.iconURL)
                                return message.channel.send({embed: successTrue})
                        })
                        return;
                    }
                    if(parameter.includes('false')) {
                        fs.writeFile(`./data/serverdata/${message.guild.id}/settings/serverannouncements.txt`, 'false', function(err) {
                            if(err) return message.channel.send('An unexpected error occured: ' + err)
                            var successFalse = new Discord.RichEmbed()
                                .setColor(colors.success)
                                .setTitle('Server Announcements Disabled')
                                .setDescription('Sunset will now stop sending server announcements.')
                                .setAuthor(message.guild.name, message.guild.iconURL)
                                return message.channel.send({embed: successFalse})
                        });
                        return;
                    }
                });
                }
                

            } else {
                return mainHelp()

            }

        } else {
            //Sunset LiteMode

            function mainHelp() {
                var noOption = client.user.username + ' Server Settings\n' +
                    'If you are looking for economy settings use `' + data.prefix + 'economysettings`\n' +
                    'Block Invites: `' + data.prefix + 'serversettings invites <block|unblock>`\n'
                    message.channel.send(noOption)
            }
            if(!option) {
                return mainHelp()
            }
            if(options.some(opts => option.includes(opts))) {
                if(option.includes('invites')) {
                    if(!parameter) {
                        var noParam = 'Block Invites\n' +
                            '`' + blckinv + '`'
                            return message.channel.send(noParam)
                    }
                }

            } else {
                return mainHelp()

            }

        }
        });
    });
});
        }
        module.exports.help = {
            name: "serversettings",
            info: "Change how Sunset functions",
            usage: "serversettings <option> <parameter>"
        }