const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if (commandlock.includes('true')) {
    if (message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')
  }
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
      const modlog = message.guild.channels.find('name', 'mod-log');
      const announcements = message.guild.channels.find('name', 'announcements')
      let kickreason = message.content.split(/\s+/g).slice(2).join(" ");
      let kickMember = message.guild.member(message.mentions.users.first());

    
      var embedkpermreturn = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Kick Usage')
        .setDescription('This command will only work if you have the permission `KICK_MEMBERS`')
        .addField(data.prefix + 'kick <@user> <reason>', '<@user> = Mentioned User | <reason> = Reason for Kick')
        .setFooter("Version " + data.newversion + " (kick Usage)", "https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.p?size=1024")
      var embedbotkpermreturn = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Kick Usage')
        .setDescription('This command will only work if I have the permission `KICK_MEMBERS`')
        .addField(data.prefix + 'kick <@user> <reason>', '<@user> = Mentioned User | <reason> = Reason for Kick')
      // removed 

      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send({
        embed: embedkpermreturn
      }).catch(console.error);
      if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send({
        embed: embedbotkpermreturn
      }).catch(console.error);
      var newembed = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Kick Usage')
        .setDescription('You provide a member to kick and a reason')
        .addField(data.prefix + 'kick <@user> <reason>', '<@user> = Mentioned User | <reason> = Reason for kick')
        .setFooter("Version " + data.newversion + " (Kick Usage)", "https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.webp?size=1024")
      var sunsetkickembed = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Kick Usage Error')
        .setDescription('I cannot kick myself :joy:')
        .addField(data.prefix + 'kick <@user> <reason>', '<@user> = Mentioned User | <reason> = Reason for kick')
        var selfKick = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Self-Kick Attempted')
        .setDescription('You cannot kick yourself!')
  var sameRole = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Permission Error')
        .setDescription(`You cannot kick ${kickMember} because they have the same or higher role than you!`)
        var sameRoleClient = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Permission Error')
        .setDescription(`You cannot kick ${kickMember} because they have the same or higher role than me!`)
        var notKickable = new Discord.RichEmbed()
          .setColor(colors.critical)
          .setTitle('Kick Attempted')
          .setDescription('That member is not kickable')

      if (kickreason.length < 1) return message.channel.send({
        embed: newembed
      }).catch(console.error);
      if (kickMember.length < 1) return message.channel.send({
        embed: newembed
      }).catch(console.error);

      if (kickMember === `<@${client.user.id}>`) return message.channel.send({
        embed: sunsetkickembed
      })
      if(kickMember.id === message.author.id) return message.channel.send({embed: selfKick});
      if(kickMember.highestRole.position >= message.member.highestRole.position) return message.channel.send({embed: sameRole})
      if(message.guild.me.highestRole.position <= kickMember.highestRole.position) return message.channel.send({embed: sameRoleClient})
      if(!kickMember.kickable) return message.channel.send({embed: notKickable})

      var embedaction = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
        .setAuthor(message.author.username, message.author.avatarURL)
      // removed 
      message.channel.send({
        embed: embedaction
      }).catch(console.error);
      message.delete()
      message.guild.member(kickMember).kick(kickreason);
      console.log(boxen('[Kick] | ' + message.guild.name + ' | ' + message.author.tag + ' | ' + kickreason + ' | ' + kickMember.tag, {
        padding: 1
      }))
      var kickmlembed = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
        .setAuthor(message.author.username, message.author.avatarURL)
      // removed 
      if (modlog) {
        modlog.send({
          embed: kickmlembed
        }).catch(console.error);
      }
      if (!announcements) {
        message.guild.owner.send({
          embed: kickmlembed
        })
      }
      if (announcements) {
        announcements.send({
          embed: kickmlembed
        }).catch(console.error);
      }
    } else {
      // LiteMode

      let kickreason = message.content.split(/\s+/g).slice(2).join(" ");
      let kickMember = message.guild.member(message.mentions.users.first());

     

      if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('```' + boxen('KICK_MEMBERS permission required', {padding: 1}) + '```').catch(console.error);
      if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('```' + boxen('KICK_MEMBERS permission required', {padding: 1}) + '```').catch(console.error);
      if(kickMember.id === message.author.id) return message.channel.send('```' + boxen('You cannot kick yourself!', {padding: 1}) + '```');
      if(kickMember.highestRole.position >= message.member.highestRole.position) return message.channel.send('```' + boxen(`You cannot kick ${kickMember} because they have the same or higher role than you!`, {padding: 1}) +'```')
      if(message.guild.me.highestRole.position <= kickMember.highestRole.position) return message.channel.send('```' + boxen(`You cannot kick ${kickMember} because they have the same or higher role than me!`, {padding: 1}) +'```')
      if(!kickMember.kickable) return message.channel.send('```' + boxen('That member is not kickable', {padding: 1}) +'```')

      // removed 


      if (kickreason.length < 1) return message.channel.send('```' + boxen('You provide a member to kick and a reason', {padding: 1}) +'```').catch(console.error);
      if (kickMember.length < 1) return message.channel.send('```' + boxen('You provide a member to kick and a reason', {padding: 1}) +'```').catch(console.error);
      
      if (kickMember === `<@${client.user.id}>`) return message.channel.send('```' + boxen('I cannot kick myself :joy:', {padding : 1}) +'```')

      var embedaction = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
        .setAuthor(message.author.username, message.author.avatarURL)
      // removed 
      message.channel.send({
        embed: embedaction
      }).catch(console.error);
      message.delete()
      message.guild.member(kickMember).kick(kickreason);
    }
  });
}
module.exports.help = {
  name: "kick",
  info: "Kick a Member",
  usage: "kick <@user> <reason>"
}