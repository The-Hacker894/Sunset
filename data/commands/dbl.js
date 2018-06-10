const prettyMs = require('pretty-ms');
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
const boxen = require('boxen');
const DBL = require('dblapi.js')
const tinyurl = require('tinyurl')
const calls = ["bot", "user"]
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    const dbl = new DBL(data.dbltoken)
    var option = args[1]
    var ID = args[2]

    if (!fs.existsSync(`./data/serverdata/${message.guild.id}/litemode.txt`)) {
        fs.writeFileSync(`./data/serverdata/${message.guild.id}/litemode.txt`, 'false', function(err) {
        });
    };
      fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {

        if(!litedata.includes('true')) {
            // Non-LiteMode

    var dblHelp = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('DBL Help')
        .setDescription('**Get Bot Stats**\n' + 
                        '`dbl bot <id>`\n' +
                        '**Get User Stats**\n' +
                        '`dbl user <id|@user>`\n')

    if(!option) return message.channel.send({embed: dblHelp})

    if(calls.some(cls => option.includes(cls))) {
        // If the option provided is valid
        if(option.includes("bot")) {
            var noID = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('No ID Provided')
                .setDescription('Please provide a valid ID')
            var notANumber = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('ID Not Valid')
                .setDescription('The ID you provided was not a number. Please try again.')
            var noAFlake = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('ID Not a Snowflake')
                .setDescription('THe ID must be an 18-Digit Snowflake. Please try again.')
            if(!ID) return message.channel.send({embed: noID})
            if(isNaN(ID)) return message.channel.send({embed: notANumber})
            if(!ID.length == 18) return message.channel.send({embed: noAFlake})

            dbl.getBot(ID).then(bot => {
                var botGet = new Discord.RichEmbed()
                    .setColor(colors.success)
                    .setTitle(bot.username + bot.discriminator)
                    .setDescription('**Prefix:** `' + bot.prefix + '`\n' + 
                                    '**Website:** `' + bot.website + '`\n' + 
                                    '**Lib:** `' + bot.lib + '`\n' + 
                                    '**Repo:** `' + bot.github + '`\n' + 
                                    '**Vanity:** `' + bot.vanity + '`\n' + 
                                    '**Guild Count:** `' + bot.server_count + '`\n' + 
                                    '**Tags:** `' + bot.tags + '`\n' + 
                                    '**Support Server:** `' + bot.support + '`\n' + 
                                    '**Certified?** `' + bot.certifiedBot + '`\n' + 
                                    '**Invite:** `' + bot.invite + '`')
                    return message.channel.send({embed: botGet})
            }).catch(err => {
                var error404 = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setTitle('Error 404')
                    .setDescription('Bot Not Found')
                message.channel.send({embed: error404})
            })

        }   
        if(option.includes("user")) {
            var DBLuser = message.guild.member(message.mentions.users.first());
            var noUser = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('No User ID or Mention Provided')
                .setDescription('Please provide a user ID or mention to get stats for.')
            var NaS = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setTitle('ID Not a Snowflake')
                .setDescription('Please provide a user ID or mention. IDs must be 18 characters long.')
            if(!ID) return message.channel.send({embed: noUser})
            if(ID.length < 18) return message.channel.send({embed: NaS})
            if(ID.length > 18 && ID.length < 21) return message.channel.send({embed: NaS})
            if(ID.length == 18) {
                //If a user ID is a snowflake and not a mention
                dbl.getUser(ID).then(user => {
                tinyurl.shorten(user.banner, function(res) {
                
                    var UserGet = new Discord.RichEmbed()
                        .setColor(colors.success)
                        .setTitle(user.username + user.discriminator)
                        .setDescription('**Banner:** ' + res + '\n' + 
                                        '**Color:** ' + user.color + '\n' + 
                                        '**DBL Admin:** ' + user.admin + '\n' +
                                        '**DBL Mod:** ' + user.mod + '\n' +
                                        '**Web Mod:** ' + user.webMod + '\n' + 
                                        '**Certified | Supporter** ' + user.certifiedDev + '\n' +
                                        '**Supporter?** ' + user.supporter + '\n' + 
                                        '**Social:** ' + JSON.stringify(user.social, null,2 )+ '\n')
                                        return message.channel.send({embed: UserGet})

                });
                });
            } else if(ID.length == 21) {
                //If a user ID is a mention and not a snowflake
                var newID = ID.substr(2).slice(0, -1);
                dbl.getUser(newID).then(user => {
                    var UserGet = new Discord.RichEmbed()
                        .setColor(colors.success)
                        .setTitle(user.username + user.discriminator)
                        .setDescription('**Banner:** ' + user.banner + '\n' + 
                                        '**Color:** ' + user.color + '\n' + 
                                        '**DBL Admin:** ' + user.admin + '\n' +
                                        '**DBL Mod:** ' + user.mod + '\n' +
                                        '**Web Mod:** ' + user.webMod + '\n' + 
                                        '**Certified** ' + user.certifiedDev + '\n' +
                                        '**Supporter?** ' + user.supporter + '\n' + 
                                        '**Social:** ' + JSON.stringify(user.social, null,2 ) + '\n')

                                        return message.channel.send({embed: UserGet})
                });
            }

        }

    } else {
        // If the option provided is NOT valid
        var optionError = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setTitle('Error')
            .setDescription('The option `' + option + '` is not valid.')
            return message.channel.send({embed: optionError})


    }
} else {
    // LiteMode

    var dblHelp = '**Get Bot Stats**\n' + 
                        '`dbl bot <id>`\n' +
                        '**Get User Stats**\n' +
                        '`dbl user <id|@user>`\n'

    if(!option) return message.channel.send(dblHelp)

    if(calls.some(cls => option.includes(cls))) {
        // If the option provided is valid
        if(option.includes("bot")) {
            var noID = boxen('No ID Provided', {padding: 1})
            var notANumber = boxen('The ID you provided was not a number. Please try again.', {padding: 1})
            var noAFlake = boxen('ID Not a Snowflake', {padding: 1})
            if(!ID) return message.channel.send(noID)
            if(isNaN(ID)) return message.channel.send(notANumber)
            if(!ID.length == 18) return message.channel.send(noAFlake)

            dbl.getBot(ID).then(bot => {
                var botGet = new Discord.RichEmbed()
                    .setColor(colors.success)
                    .setTitle(bot.username + bot.discriminator)
                    .setDescription('**Prefix:** `' + bot.prefix + '`\n' + 
                                    '**Website:** `' + bot.website + '`\n' + 
                                    '**Lib:** `' + bot.lib + '`\n' + 
                                    '**Repo:** `' + bot.github + '`\n' + 
                                    '**Vanity:** `' + bot.vanity + '`\n' + 
                                    '**Guild Count:** `' + bot.server_count + '`\n' + 
                                    '**Tags:** `' + bot.tags + '`\n' + 
                                    '**Support Server:** `' + bot.support + '`\n' + 
                                    '**Certified?** `' + bot.certifiedBot + '`\n' + 
                                    '**Invite:** `' + bot.invite + '`')
                    return message.channel.send({embed: botGet})
            }).catch(err => {
                var error404 = boxen('Bot Not Found', {padding:1})
                message.channel.send(error404)
            })

        }   
        if(option.includes("user")) {
            var DBLuser = message.guild.member(message.mentions.users.first());
            var noUser = boxen('No User ID or Mention Provided', {padding: 1})
            var NaS = boxen('ID Not a Snowflake', {padding: 1})
            if(!ID) return message.channel.send(noUser)
            if(ID.length < 18) return message.channel.send(NaS)
            if(ID.length > 18 && ID.length < 21) return message.channel.send(NaS)
            if(ID.length == 18) {
                //If a user ID is a snowflake and not a mention
                dbl.getUser(ID).then(user => {
                tinyurl.shorten(user.banner, function(res) {
                
                    var UserGet = new Discord.RichEmbed()
                        .setColor(colors.success)
                        .setTitle(user.username + user.discriminator)
                        .setDescription('**Banner:** ' + res + '\n' + 
                                        '**Color:** ' + user.color + '\n' + 
                                        '**DBL Admin:** ' + user.admin + '\n' +
                                        '**DBL Mod:** ' + user.mod + '\n' +
                                        '**Web Mod:** ' + user.webMod + '\n' + 
                                        '**Certified | Supporter** ' + user.certifiedDev + '\n' +
                                        '**Supporter?** ' + user.supporter + '\n' + 
                                        '**Social:** ' + JSON.stringify(user.social, null,2 )+ '\n')
                                        return message.channel.send({embed: UserGet})

                });
                });
            } else if(ID.length == 21) {
                //If a user ID is a mention and not a snowflake
                var newID = ID.substr(2).slice(0, -1);
                dbl.getUser(newID).then(user => {
                    var UserGet = new Discord.RichEmbed()
                        .setColor(colors.success)
                        .setTitle(user.username + user.discriminator)
                        .setDescription('**Banner:** ' + user.banner + '\n' + 
                                        '**Color:** ' + user.color + '\n' + 
                                        '**DBL Admin:** ' + user.admin + '\n' +
                                        '**DBL Mod:** ' + user.mod + '\n' +
                                        '**Web Mod:** ' + user.webMod + '\n' + 
                                        '**Certified** ' + user.certifiedDev + '\n' +
                                        '**Supporter?** ' + user.supporter + '\n' + 
                                        '**Social:** ' + JSON.stringify(user.social, null,2 ) + '\n')

                                        return message.channel.send({embed: UserGet})
                });
            }

        }

    } else {
        // If the option provided is NOT valid
        var optionError = 'The option `' + option + '` is not valid.'
            return message.channel.send(optionError)


    }

}
});

}
module.exports.help = {
    name: "dbl",
    info: "Access the Discord Bot List API",
    usage: "dbl <option> <id>"
}