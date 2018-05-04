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
  const announcements = message.guild.channels.find('name', 'announcements')
let banmessage = message.content.split(' ').slice(1).join(' ')
let banMember = message.guild.member(message.mentions.users.first());
  let banreason = message.content.split(/\s+/g).slice(2).join(" ");
var embedreturn = new Discord.RichEmbed()
  .setColor(colors.system)
  .setDescription('You need to provide a member to ban and a reason for the ban')
  .addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')
  // removed 
var embedpermreturn = new Discord.RichEmbed()
.setColor(colors.critical)
.setTitle('Ban Usage')
.setDescription('`BAN_MEMBERS` permission required')
.addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
.setFooter("Version " + data.newversion + " (Ban Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.p?size=1024")
var embedbotpermreturn = new Discord.RichEmbed()
.setColor(colors.critical)
.setTitle('Ban Usage')
.setDescription('`BAN_MEMBERS` permission required')
.addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
// removed 
var banusermessageembed = new Discord.RichEmbed()
.setColor(colors.critical)
.setTitle('Automated Ban Message')
.setDescription('**You have been banned** \n \n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + banreason + ' \n **Server:** ' + message.guild.name)
var selfBan = new Discord.RichEmbed()
      .setColor(colors.critical)
      .setTitle('Self-Ban Attempted')
      .setDescription('You cannot ban yourself!')
var sameRole = new Discord.RichEmbed()
      .setColor(colors.critical)
      .setTitle('Permission Error')
      .setDescription(`You cannot ban ${banMember} because they have the same or higher role than you!`)
      var sameRoleClient = new Discord.RichEmbed()
      .setColor(colors.critical)
      .setTitle('Permission Error')
      .setDescription(`You cannot ban ${banMember} because they have the same or higher role than me!`)
var notBannable = new Discord.RichEmbed()
      .setColor(colors.critical)
      .setTitle('Ban Attempted')
      .setDescription('That member is not bannable')
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({embed: embedpermreturn}).catch(console.error);
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: embedbotpermreturn}).catch(console.error);
  if(banMember.id === message.author.id) return message.channel.send({embed: selfBan});
  if(banMember.highestRole.position >= message.member.highestRole.position) return message.channel.send({embed: sameRole})
  if(message.guild.me.highestRole.position <= banMember.highestRole.position) return message.channel.send({embed: sameRoleClient})
  if(!banMember.bannable) return message.channel.send({embed: notBannable})
  //  if(!banmessage.content.indexOf('@') === '@') return message.channel.send(':(')
    if(banreason.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
    if(banMember.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
        message.guild.member(banMember).ban(banreason)
        message.delete()
        var embedaction = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('**A user has been banned** \n \n **User:** ' + banMember + '\n **Moderator:** ' + message.author.username + '\n **Reason:** ' + banreason + '\n **Server:** ' + message.guild.name)
        .setAuthor(message.author.username ,message.author.avatarURL)
        // removed 
        message.channel.send({embed: embedaction})
        console.log(boxen('[Ban] | ' + message.guild.name + ' | ' + message.author.username + ' | ' + banreason + ' | ' + banMember.tag, {padding: 1}))


        var banmlembed = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('**A user has been banned** \n \n **User:** ' + banMember + '\n **Moderator:** ' + message.author.username + '\n **Reason:** ' + banreason + '\n **Server:** ' + message.guild.name)
        .setAuthor(message.author.username ,message.author.avatarURL)
        // removed 
        if(modlog) {
          modlog.send({embed: banmlembed}).catch(console.error);
        }
        if(!announcements) {
          message.guild.owner.send(banmlembed)
        }
        if(announcements) {
          announcements.send({embed: banmlembed}).catch(console.error);
        }
      } else {
        let banmessage = message.content.split(' ').slice(1).join(' ')
        let banMember = message.guild.member(message.mentions.users.first());
        let banreason = message.content.split(/\s+/g).slice(2).join(" ");

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1})).catch(console.error);
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1})).catch(console.error);
  if(banMember.id === message.author.id) return message.channel.send('```' + boxen('You cannot mute yourself', {padding: 1}) +'```');
  if(banMember.highestRole.position >= message.member.highestRole.position) return message.channel.send('```' + boxen(`You cannot ban ${banMember} because they have the same or higher role than you!`, {padding: 1}) +'```')
  if(message.guild.me.highestRole.position <= banMember.highestRole.position) return message.channel.send('```' + boxen(`You cannot ban ${banMember} because they have the same or higher role than me!`, {padding: 1}) +'```')
  if(!banMember.bannable) return message.channel.send('```' + boxen('That member is not bannable', {padding: 1}) +'```')


  //  if(!banmessage.content.indexOf('@') === '@') return message.channel.send(':(')
    if(banreason.length < 1) return message.channel.send('```' + boxen('You need to provide a member to ban and a reason for the ban', {padding: 1}) + '```').catch(console.error);
    if(banMember.length < 1) return message.channel.send('```' + boxen('You need to provide a member to ban and a reason for the ban', {padding: 1}) + '```').catch(console.error);

        message.guild.member(banMember).ban(banreason)
        message.delete()

        message.channel.send('**A user has been banned** \n \n **User:** ' + banMember.user.tag + '\n **Moderator:** ' + message.author.username + '\n **Reason:** ' + banreason + '\n **Server:** ' + message.guild.name)
      }
    });
      }
      module.exports.help = {
        name: "ban",
        info: "Ban a user",
        usage: "ban <@user> <reason>"
      }
