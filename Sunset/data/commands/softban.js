const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) { 
  const modlog = message.guild.channels.find('name', 'mod-log');
  
  var softBanUser = message.guild.member(message.mentions.users.first());
  var softBanReason = message.content.split(/\s+/g).slice(2).join(" ");
  var msg = message.content.split(' ').slice(1).join(' ')

  var noUser = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Softban Error')
        .setDescription('No user was provided for softban')
    var noReason = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Softban Error')
        .setDescription('No reason provided for the softban')
    var permError = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Softban Permission Error')
        .setDescription('BAN_MEMBERS permission required')
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({embed: permError}).catch(console.error);
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: permError}).catch(console.error);
        if(msg.length < 1) return message.channel.send({embed: noUser})
        if(softBanReason.length < 1) return message.channel.send({embed: noReason})

        var softBanSuccess = new Discord.RichEmbed()
            .setColor(colors.success)
            .setTitle('SoftBan Successful')
            .setDescription('Successfully softbanned '  + softBanUser.user.tag)

        function unBan() {
            message.guild.unban(softBanUser.id)
        }
    
        message.guild.member(softBanUser.id).ban(7 ,softBanReason)
        message.channel.send({embed: softBanSuccess})
        setTimeout(unBan, 1000)

      } else {
          // LiteMode

          var softBanUser = message.guild.member(message.mentions.users.first());
  var softBanReason = message.content.split(/\s+/g).slice(2).join(" ");
  var msg = message.content.split(' ').slice(1).join(' ')

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) +'```').catch(console.error);
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) +'```').catch(console.error);
        if(msg.length < 1) return message.channel.send('```' + boxen('No user was provided for softban', {padding: 1}) +'```')
        if(softBanReason.length < 1) return message.channel.send('```' + boxen('No reason provided for the softban', {padding: 1}) + '```')

        function unBan() {
            message.guild.unban(softBanUser.id)
        }
    
        message.guild.member(softBanUser.id).ban(7 ,softBanReason)
        message.channel.send('```' + boxen('Successfully softbanned '  + softBanUser.user.tag, {padding: 1}) +'```')
        setTimeout(unBan, 1000)
      }
    }); 
      }
      module.exports.help = {
        name: "softban",
        info: "Softbans a user",
        usage: "softban <@user> <reason>"
      }
