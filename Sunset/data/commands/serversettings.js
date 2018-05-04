const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement, colors) => {

    var commandlock = data.lock
    if (commandlock.includes('true')) {
        if (message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')
    }
    fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
        if (!litedata.includes('true')) {

            var option = args[1]
            var other = message.content.split(option).slice(1).join(' ')
            const modlog = message.guild.channels.find('name', 'mod-log');

            var sooc = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('Server Owner-Only Command')
                .setDescription('This command is locked to the server owner. If you think this is an error please contact <@270375857384587264>')

            if (message.author.id !== message.guild.owner.id) return message.channel.send({
                embed: sooc
            })
            fs.exists(`./data/serverdata/${message.guild.id}/settings/${message.guild.id}.txt`, function (exists) {
                if (!exists) {
                    fs.writeFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, '$', function (err) {});
                }
            });

            fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function (err, sscdata) {
                fs.readFile(`./data/serverdata/${message.guild.id}/settings/lotterychance.txt`, function (err, ssldata) {
                    fs.readFile(`./data/serverdata/${message.guild.id}/settings/freemoneypayout.txt`, function (err, ssfmpdata) {
                        fs.readFile(`./data/serverdata/${message.guild.id}/settings/robpayout.txt`, function (err, rpdata) {
                            fs.readFile(`./data/serverdata/${message.guild.id}/settings/lotterypayout.txt`, function (err, sslpdata) {
                                fs.readFile(`./data/serverdata/${message.guild.id}/settings/lotterycost.txt`, function (err, sslcdata) {
                                    fs.readFile(`./data/serverdata/${message.guild.id}/settings/2ballcost.txt`, function (err, ss2bcdata) {
                                        fs.readFile(`./data/serverdata/${message.guild.id}/settings/2ballpayout.txt`, function (err, ss2bpdata) {
                                            fs.readFile(`./data/serverdata/${message.guild.id}/settings/8ballpayout.txt`, function (err, ss8bpdata) {
                                                fs.readFile(`./data/serverdata/${message.guild.id}/settings/8ballcost.txt`, function (err, ss8bpdata) {





                                                    const lot = parseFloat(ssldata)
                                                    const lottery = parseFloat(lot * 100)
                                                    const fmp = parseFloat(ssfmpdata)
                                                    const robPayout = parseFloat(rpdata)
                                                    const rpp = parseFloat(robPayout * 100)
                                                    const lotterypayout = parseFloat(sslpdata)
                                                    const lotterycost = parseFloat(sslcdata)
                                                    const twoballcost = parseFloat(ss2bcdata)
                                                    const twoballpayout = parseFloat(ss2bpdata)
                                                    const eightballcost = parseFloat(ss8bpdata)
                                                    const eightballpayout = parseFloat(ss8bpdata)
                                                    var serversetting = new Discord.RichEmbed()
                                                        .setColor(colors.system)
                                                        .setTitle('Server Settings')
                                                        .addField('***Currency***', '`' + sscdata + '`', true)
                                                        .addField('***Lottery***', '`' + lottery + '%`', true)
                                                        .addField('***LotteryPay***', '`' + sscdata + lotterypayout + '`', true)
                                                        .addField('***LotteryCost***', '`' + sscdata + lotterycost + '`', true)
                                                        .addField('***2BallPay***', '`' + sscdata + twoballpayout + '`', true)
                                                        .addField('***2BallCost***', '`' + sscdata + twoballcost + '`', true)
                                                        .addField('***8BallPay***', '`' + sscdata + eightballpayout + '`', true)
                                                        .addField('***8BallCost***', '`' + sscdata + eightballcost + '`', true)
                                                        .addField('***FreeMoney***', '`' + sscdata + fmp + '`', true)
                                                        .addField('***Rob Percentage Payout (Rob)***', '`' + rpp + '%`', true)
                                                        .setFooter('New ServerSettings will be added in time')
                                                        .setAuthor(message.guild.name, message.guild.iconURL)



                                                    if (!option) {
                                                        return message.channel.send({
                                                            embed: serversetting
                                                        });
                                                    }

                                                    if (option.includes('currency')) {

                                                        if (!other) {
                                                            fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function (err, currencydata) {
                                                                var currency = new Discord.RichEmbed()
                                                                    .setColor(colors.system)
                                                                    .setTitle(`${message.guild.name} Currency`)
                                                                    .setDescription(`${currencydata}`)
                                                                    .setAuthor(message.guild.name, message.guild.iconURL)
                                                                message.channel.send({
                                                                    embed: currency
                                                                })
                                                            })
                                                            return;
                                                        } else {
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, other, function (err) {
                                                                var currencyset = new Discord.RichEmbed()
                                                                    .setColor(colors.success)
                                                                    .setTitle('Currency Successfully Changed')
                                                                    .setDescription('The new currency is `' + other + '`')
                                                                    .setAuthor(message.guild.name, message.guild.iconURL)
                                                                message.channel.send({
                                                                    embed: currencyset
                                                                })
                                                            });
                                                        }
                                                    }
                                                    if (option.includes('lottery')) {
                                                        if (!other) {
                                                            var newssl = parseFloat(ssldata)
                                                            var parsedLot = parseFloat(newssl * 100)
                                                            var lotteryembed = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle(`${message.guild.name} Lottery Chance`)
                                                                .setDescription(`${parsedLot}%`)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            message.channel.send({
                                                                embed: lotteryembed
                                                            })
                                                            return;
                                                        } else {
                                                            var chance = parseFloat(other)
                                                            var parsedChance = parseFloat(chance / 100)
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/lotterychance.txt`, parsedChance, function (err) {

                                                                var lotteryset = new Discord.RichEmbed()
                                                                    .setColor(colors.success)
                                                                    .setTitle('Lottery Chance Successfully Changed')
                                                                    .setDescription('The new chance of winning the lottery is `' + parsedChance * 100 + '%`')
                                                                    .setAuthor(message.guild.name, message.guild.iconURL)
                                                                message.channel.send({
                                                                    embed: lotteryset
                                                                })
                                                            });
                                                        }
                                                    }
                                                    if (option.includes('freemoney')) {
                                                        if (!other) {
                                                            var freemoney = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('Free Money Payout')
                                                                .setDescription(`Between ${currency}1 - ${currency}${fmp}`)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            message.channel.send({
                                                                embed: freemoney
                                                            })
                                                            return;
                                                        } else {
                                                            var payout = parseFloat(other)
                                                            var payouttoolow = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('Payout Too Low')
                                                                .setDescription('The payout you have set is lower than ' + sscdata + '1, therefore cannot be set.')
                                                            if (payout < 1) {
                                                                message.channel.send({
                                                                    embed: payouttoolow
                                                                })
                                                                return;
                                                            } else {
                                                                fs.writeFile(`./data/serverdata/${message.guild.id}/settings/freemoneypayout.txt`, payout, function (err) {
                                                                    var successpayout = new Discord.RichEmbed()
                                                                        .setColor(colors.success)
                                                                        .setTitle('Successfully Set Payout')
                                                                        .setDescription('Successfully set the payout of `freemoney` to ' + sscdata + payout)
                                                                        .setAuthor(message.guild.name, message.guild.iconURL)
                                                                    message.channel.send({
                                                                        embed: successpayout
                                                                    })
                                                                });
                                                                return;
                                                            }

                                                        }
                                                    }
                                                    if (option.includes('rob')) {
                                                        if (!other) {
                                                            var rob = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('Rob Percentage Payout')
                                                                .setDescription('`' + rpp + '%`')
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            message.channel.send({
                                                                embed: rob
                                                            })
                                                        } else {
                                                            var newrobpayout = parseFloat(other)
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/robpayout.txt`, newrobpayout, function (err) {
                                                                var successrob = new Discord.RichEmbed()
                                                                    .setColor(colors.success)
                                                                    .setTitle('Rob Percentage Payout Changed')
                                                                    .setDescription(`Successfully changed the percentage of money received from a successfuly rob attemp to ${newrobpayout * 100}%`)
                                                                    .setAuthor(message.guild.name, message.guild.iconURL)
                                                                message.channel.send({
                                                                    embed: successrob
                                                                })
                                                            });
                                                        }
                                                    }
                                                    if (option.includes('lotterypay')) {
                                                        if (!other) {
                                                            var lotterpayembed = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('Lottery Payout')
                                                                .setDescription(sscdata + lotterypayout)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            return message.channel.send({
                                                                embed: lotterpayembed
                                                            })
                                                        } else {
                                                            var newlotterypayout = parseFloat(other)
                                                            var payouttoolow = new Discord.RichEmbed()
                                                                .setColor(colors.critical)
                                                                .setTitle('Payout Too Low')
                                                                .setDescription('You must set the Lottery Payout above ' + sscdata + '100')
                                                            if (newlotterypayout < 100) return message.channel.send({
                                                                embed: payouttoolow
                                                            })
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/lotterypayout.txt`, newlotterypayout, function (err) {
                                                                var successlp = new Discord.RichEmbed()
                                                                    .setColor(colors.system)
                                                                    .setTitle('Lottery Payout Changed')
                                                                    .setDescription(`Successfully changed the lottery payout to ${sscdata}${newlotterypayout}`)
                                                                return message.channel.send({
                                                                    embed: newlotterypayout
                                                                })
                                                            });
                                                        }
                                                    }
                                                    if (option.includes('lotterycost')) {
                                                        if (!other) {
                                                            var lotterycostembed = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('Lottery Cost')
                                                                .setDescription(sscdata + lotterycost)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            return message.channel.send({
                                                                embed: lotterycostembed
                                                            })
                                                        } else {
                                                            var newlotterycost = parseFloat(other)
                                                            var costtoolow = new Discord.RichEmbed()
                                                                .setColor(colors.critical)
                                                                .setTitle('Cost Too Low')
                                                                .setDescription('You must set the Lottery Ticket Cost above ' + sscdata + '100')
                                                            if (newlotterycost < 100) return message.channel.send({
                                                                embed: costtoolow
                                                            })
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/lotterycost.txt`, newlotterycost, function (err) {
                                                                var successlc = new Discord.RichEmbed()
                                                                    .setColor(colors.success)
                                                                    .setTitle('Lottery Ticket Cost Changed')
                                                                    .setDescription(`Successfully changed the lottery ticket cost to ${sscdata}${newlotterypayout}`)
                                                                return message.channel.send({
                                                                    embed: successlc
                                                                })
                                                            });


                                                        }
                                                    }
                                                    if (option.includes('2ballpay')) {
                                                        if (!other) {
                                                            var twoballpayembed = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('2Ball Pay')
                                                                .setDescription(sscdata + twoballpayout)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            return message.channel.send({
                                                                embed: twoballpayembed
                                                            })
                                                        } else {
                                                            var newtwoballpayout = parseFloat(other)
                                                            var payouttoolow = new Discord.RichEmbed()
                                                                .setColor(colors.critical)
                                                                .setTitle('Payout Too Low')
                                                                .setDescription('You must set the 2Ball Payout above ' + sscdata + '5')
                                                            if (newtwoballpayout < 5) return message.channel.send({
                                                                embed: costtoolow
                                                            })
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/2ballpayout.txt`, newtwoballpayout, function (err) {
                                                                var success2bp = new Discord.RichEmbed()
                                                                    .setColor(colors.system)
                                                                    .setTitle('2Ball Payout Changed')
                                                                    .setDescription(`Successfully changed the 2Ball Payout to ${sscdata}${newtwoballpayout}`)
                                                                return message.channel.send({
                                                                    embed: success2bp
                                                                })
                                                            });
                                                        }
                                                    }
                                                    if (option.includes('2ballcost')) {
                                                        if (!other) {
                                                            var twoballcostembed = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('2Ball Cost')
                                                                .setDescription(sscdata + twoballcost)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            return message.channel.send({
                                                                embed: twoballcostembed
                                                            })
                                                        } else {
                                                            var newtwoballcost = parseFloat(other)
                                                            var costtoolow = new Discord.RichEmbed()
                                                                .setColor(colors.critical)
                                                                .setTitle('Cost Too Low')
                                                                .setDescription('You must set the 2Ball Cost above or equal to ' + sscdata + '10')
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            if (newtwoballcost < 10) return message.channel.send({
                                                                embed: costtoolow
                                                            })
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/2ballcost.txt`, newtwoballcost, function (err) {
                                                                var success2bc = new Discord.RichEmbed()
                                                                    .setColor(colors.success)
                                                                    .setTitle('2Ball Cost Changed')
                                                                    .setDescription(`Successfully changed the 2Ball Cost to ${sscdata}${newtwoballcost}`)
                                                                return message.channel.send({
                                                                    embed: success2bc
                                                                })
                                                            });
                                                        }
                                                    }
                                                    if (option.includes('8ballcost')) {
                                                        if (!other) {
                                                            var eightballcostembed = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('8Ball Cost')
                                                                .setDescription(sscdata + eightballcost)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            return message.channel.send({
                                                                embed: eightballcostembed
                                                            })
                                                        } else {
                                                            var neweightballcost = parseFloat(other)
                                                            var costtoolow = new Discord.RichEmbed()
                                                                .setColor(colors.critical)
                                                                .setTitle('Cost Too Low')
                                                                .setDescription('You must set the 8Ball Cost above or equal to ' + sscdata + '15')
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            if (newtwoballcost < 10) return message.channel.send({
                                                                embed: costtoolow
                                                            })
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/8ballcost.txt`, neweightballcost, function (err) {
                                                                var success8bc = new Discord.RichEmbed()
                                                                    .setColor(colors.success)
                                                                    .setTitle('8Ball Cost Changed')
                                                                    .setDescription(`Successfully changed the 8Ball Cost to ${sscdata}${neweightballcost}`)
                                                                return message.channel.send({
                                                                    embed: success8bc
                                                                })
                                                            });
                                                        }
                                                    }
                                                    if (option.includes('8ballpay')) {
                                                        if (!other) {
                                                            var eightballpayembed = new Discord.RichEmbed()
                                                                .setColor(colors.system)
                                                                .setTitle('8Ball Pay')
                                                                .setDescription(sscdata + eightballpayout)
                                                                .setAuthor(message.guild.name, message.guild.iconURL)
                                                            return message.channel.send({
                                                                embed: eightballpayembed
                                                            })
                                                        } else {
                                                            var neweighttwoballpayout = parseFloat(other)
                                                            var payouttoolow = new Discord.RichEmbed()
                                                                .setColor(colors.critical)
                                                                .setTitle('Payout Too Low')
                                                                .setDescription('You must set the 8Ball Payout above ' + sscdata + '10')
                                                            if (neweightballpayout < 5) return message.channel.send({
                                                                embed: costtoolow
                                                            })
                                                            fs.writeFile(`./data/serverdata/${message.guild.id}/settings/2ballpayout.txt`, neweightballpayout, function (err) {
                                                                var success2bp = new Discord.RichEmbed()
                                                                    .setColor(colors.success)
                                                                    .setTitle('2Ball Payout Changed')
                                                                    .setDescription(`Successfully changed the 8Ball Payout to ${sscdata}${neweightballpayout}`)
                                                                return message.channel.send({
                                                                    embed: success2bp
                                                                })
                                                            });
                                                        }
                                                    }

                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

        } else {
            message.channel.send("This command is not available for Sunset LiteMode")
        }
    });
}
module.exports.help = {
    name: "serversettings",
    usage: "serversettings <option> <other>",
    info: "Change the settings for your server"
}