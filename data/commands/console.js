const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
const prettyMs = require('pretty-ms');
const pusage = require('pidusage')
const cowsay = require('cowsay');
const figlet = require('figlet');

module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  /*
  Inspired by Quantum (Made by Felix)
  */
    var command = args[1]
    var basicParameter = args[2]
    var advParameter = message.content.split(/\s+/g).slice(2).join(" ");
    var terParameter = message.content.split(/\s+/g).slice(3).join(" "); 
    var cmd = message.content.split(' ').slice(1).join(' ')

    var consoleHeader = '```' + client.user.username +' v' + data.newversion + ' Console v' + data.consoleVer + '\n' +
                        '_________________________________________________________________\n' 
    var noCommand = '\nError: No command specified.\n' +
                    'Use ' + data.prefix + 'console help for more info.```'
    var noCMD = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription(consoleHeader + noCommand)
    if(cmd.length < 1) return message.channel.send({embed: noCMD})
    if(command.includes('help')) {
        var commandHelp = '\n' +client.user.username + ' Help Command v' + data.consoleVer +'\n\n' +
                        data.prefix + 'console help - List all available commands\n' + 
                        data.prefix + 'console sys(tem) - Shows system info\n' + 
                        data.prefix + 'console ping - Ping a server\n' +
                        data.prefix + 'console cmd - Interact with the Raspberry Pi\n' +
                        data.prefix + 'console cowsay - Use the Cowsay Linux package\n' + 
                        data.prefix + 'console cowthink - Use the Cowthink Linux package\n' + 
                        data.prefix + 'console figlet - Use the Figlet Linux package```'
        var cmdHelp = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(consoleHeader + commandHelp)
            return message.channel.send({embed: cmdHelp})
    }
    if(command.includes('sys')) {
        pusage.stat(process.pid, function (err, stat) {
            var cpuusage = parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2)
            var memusage = parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2)
        var commandSys1 = '\n' + client.user.username + ' System Command v' + data.consoleVer + '\n\n' +
                        'Retrieving System Info...```'
        var  commandSys2 = '\n' + client.user.username + ' System Command v' + data.consoleVer + '\n\n' +
                            'System Uptime -- ' + prettyMs(client.uptime, {verbose: true}) + '\n' + 
                            'CPU Usage -- ' + cpuusage + '%\n' + 
                            'Memory Usage -- ' + memusage + 'MB\n```'
        var cmdSys1 = new Discord.RichEmbed()
            .setColor(colors.system)
            .setDescription(consoleHeader + commandSys1)
        var cmdSys2 = new Discord.RichEmbed()
            .setColor(colors.system)
            .setDescription(consoleHeader + commandSys2)
        message.channel.send({embed: cmdSys1}).then(msg => {
            function sysInfo() {
                msg.edit({embed: cmdSys2})
            }
            setTimeout(sysInfo, 3000)
            return;
        })

        return;
        });
        return;
    }
    if(command.includes('cowsay')) {
        var commandCowSayNoArg = '\n' + client.user.username +' Cowsay Command v' + data.consoleVer + '\n' +  
                            '\nERROR\n' +
                            'Invalid argument provided\nMessage: PLEASE PROVIDE MESSAGE```'
        var cmdCowSayNoArg = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(consoleHeader + commandCowSayNoArg)

        if(advParameter.length < 1) return message.channel.send({embed: cmdCowSayNoArg})
        var commandCowSay = '\n' + client.user.username +' Cowsay Command v' + data.consoleVer + '\n' +  
                               '' +  cowsay.say({text: advParameter, e: "oO", T: "U"}) + '```'
        var cmdCowSay = new Discord.RichEmbed()
            .setColor(colors.system)
            .setDescription(consoleHeader + commandCowSay)
        return message.channel.send({embed: cmdCowSay})
    }
    if(command.includes('cowthink')) {
        var commandCowThinkNoArg = '\n' + client.user.username +' Cowthink Command v' + data.consoleVer + '\n' +  
        '\nERROR\n' +
        'Invalid argument provided\nMessage: PLEASE PROVIDE MESSAGE```'
var cmdCowSayNoArg = new Discord.RichEmbed()
.setColor(colors.critical)
.setDescription(consoleHeader + commandCowThinkNoArg)

if(advParameter.length < 1) return message.channel.send({embed: cmdCowThinkNoArg})
var commandCowThink = '\n' + client.user.username +' Cowsay Command v' + data.consoleVer + '\n' +  
           '' +  cowsay.say({text: advParameter, e: "oO", T: "U"}) + '```'
var cmdCowThink = new Discord.RichEmbed()
.setColor(colors.system)
.setDescription(consoleHeader + commandCowThink)
return message.channel.send({embed: cmdCowThink})
    }
    if(command.includes('figlet')) {
        var commandFigletNoArg = "\n"  + client.user.username + ' Figlet Command v' + data.consoleVer + '\n' +
                                 "\nError\n" +
                                "Invalid argument provided\nMessage: PLEASE PROVIDE TEXT```"
        var commandFigletNoColor = "\n"  + client.user.username + ' Figlet Command v' + data.consoleVer + '\n' +
                                    "\nError\n" +
                                    "Invalid argument provided\nMessage: PLEASE PROVIDE COLOR\n\nUse " + data.prefix +"console figlet help for more help```"
        var commandFigletHelp = "\n"  + client.user.username + ' Figlet Command v' + data.consoleVer + '\n' +
                                "\nFiglet Help\n" + 
                                data.prefix + "command figlet css <text>\n" +
                                data.prefix + "command figlet md <text>\n" +
                                data.prefix + "command figlet js <text>\n" +
                                data.prefix + "command figlet c# <text>\n" +
                                data.prefix + "command figlet bash <text>\n" +
                                data.prefix + "command figlet php <text>\n" +
                                data.prefix + "command figlet shell <text>\n" +
                                data.prefix + "command figlet java <text>\n" +
                                data.prefix + "command figlet help```"
        var commandFigletWrongColor = "\n"  + client.user.username + ' Figlet Command v' + data.consoleVer + '\n' +
                                    "\nError\n" + 
                                    "Figlet Color, " + basicParameter + ", does not exist.\nUse " + data.prefix +"console figlet help```"
        var validColors = ['css', 'md', 'js', 'c#', 'java', 'bash', 'php', 'shell']
        var cmdFigletNoArg = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(consoleHeader + commandFigletNoArg)
        var cmdFigletNoColor = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(consoleHeader + commandFigletNoColor)
        var cmdFigletHelp = new Discord.RichEmbed()
            .setColor(colors.system)
            .setDescription(consoleHeader + commandFigletHelp)
        var cmdFigletWrongColor = new Discord.RichEmbed()
            .setColor(colors.system)
            .setDescription(consoleHeader + commandFigletWrongColor)
        if(!basicParameter) return message.channel.send({embed: cmdFigletNoColor})
        if(basicParameter.includes('help')) return message.channel.send({embed: cmdFigletHelp})
        if(validColors.some(col => advParameter.includes(col))) {
        figlet(terParameter, function(err, fig) {
            var commandFigletErr = "\n"  + client.user.username + ' Figlet Command v' + data.consoleVer + '\n' +
                                    "\nERROR\n" +
                                    "An unexpected error occurred: " + err + '```'
            var cmdFigletErr = new Discord.RichEmbed()
                .setColor(colors.critical)
                .setDescription(consoleHeader + commandFigletErr)
        
        if(err) return message.channel.send({embed: cmdFigletErr})

        var commandFiglet = "\n"  + client.user.username + ' Figlet Command v' + data.consoleVer + '```' +
                            "```" + basicParameter +"\n" + fig + "```"
        var cmdFiglet = new Discord.RichEmbed()
            .setColor(colors.system)
            .setDescription(consoleHeader + commandFiglet)
            return message.channel.send({embed: cmdFiglet})
        });
        return;
    } else return message.channel.send({embed: cmdFigletWrongColor})
    return;
    }
    if(command.includes('ping')) {
        const { exec } = require('child_process');
        var commandPingNoArg = "\n" + client.user.username + ' Ping Command v' + data.consoleVer + '\n' + 
                                "\nError\n" +
                                "Invalid argument provided\nMessage: PLEASE PROVIDE ADDRESS TO PING```"
        var cmdPingNoArg = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(consoleHeader + commandPingNoArg)
        if(!basicParameter) {
            return message.channel.send({embed: cmdPingNoArg});
        } else {
            var commandPinging = "\n" + client.user.username + ' Ping Command v' + data.consoleVer + '\n' + 
                                "\nPinging...\n```"
            var cmdPinging = new Discord.RichEmbed()
                .setColor(colors.system)
                .setDescription(consoleHeader + commandPinging)
             message.channel.send({embed: cmdPinging}).then(message => {

             
        exec('ping  -c 5 ' + basicParameter, (err, stdout, stderr) => {
            if (err) {
                var commandPingErr = "\n" + client.user.username + ' Ping Command v' + data.consoleVer + '\n' + 
                                        "\nError\n" +
                                        "An unexpected error occured: " + err + '```'
                var cmdPingErr = new Discord.RichEmbed()
                    .setColor(colors.critical)
                    .setDescription(consoleHeader + commandPingErr)
                return message.edit({embed: cmdPingErr})
            }
            var commandPing = "\n" + client.user.username + ' Ping Command v' + data.consoleVer + '\n' + 
                                '\n' + stdout + '```'
            var cmdPing = new Discord.RichEmbed()
                .setColor(colors.system)
                .setDescription(consoleHeader + commandPing)
                return message.edit({embed: cmdPing})
          
          });
        })
          return;
        }
        
    }
    if(command.includes('cmd')) {
        const { exec } = require('child_process');
        var commandCMDNotOwner = "\n" + client.user.username + ' CMD Command v' + data.consoleVer + '\n' + 
                                "\nError\n" +
                                "This command is locked to the Bot Owner.```"
        var cmdCMDNotOwner = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(consoleHeader + commandCMDNotOwner)
        if(message.author.id !== data.ownerid) return message.channel.send({embed: cmdCMDNotOwner})
        var commandCMDNoArg = "\n" + client.user.username + ' CMD Command v' + data.consoleVer + '\n' + 
                                "\nError\n" + 
                                "Invalid argument provided\nMessage: PLEASE PROVIDE COMMAND```"
        var cmdCMDNoArg = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setDescription(consoleHeader + commandCMDNoArg)
        if(!advParameter) return message.channel.send({embed: cmdCMDNoArg})
        
        var commandWaiting = "\n" + client.user.username + ' CMD Command v' + data.consoleVer + '\n' + 
                            "\nProcessing...```"

        var cmdWaiting = new Discord.RichEmbed()
            .setColor(colors.system)
            .setDescription(consoleHeader + commandWaiting)
            message.channel.send({embed: cmdWaiting}).then(message => {
                exec(advParameter, (err, stdout, stderr) => {
                    if(err) {
                        var commandError = "\n" + client.user.username + ' CMD Command v' + data.consoleVer + '\n' + 
                                            "\nError\n" +
                                            "An unexpected error occured: " + err + '```'
                        var cmdError = new Discord.RichEmbed()
                            .setColor(colors.critical)
                            .setDescription(consoleHeader + commandError)
                            return message.edit({embed: cmdError})
                     }
                     var commandCMD = "\n" + client.user.username + ' CMD Command v' + data.consoleVer + '\n' + 
                                    "\n " +stdout + '```'
                    var cmdCMD = new Discord.RichEmbed()
                        .setColor(colors.system)
                        .setDescription(consoleHeader + commandCMD)
                        return message.edit({embed: cmdCMD}) 
                        

                }); 
                return;
            })
            return;
    }
    var failCommand = '\nERROR\n' +
                    'Command does not exists\nError Code: 404```'
    var failCMD = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription(consoleHeader + failCommand)
        return message.channel.send({embed: failCMD})


}
module.exports.help = {
    name: "console",
    info: "Console/Terminal access on Discord",
    usage: "console" //The usage varies depeding on the command
}