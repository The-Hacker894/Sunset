const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
let banmessage = message.content.split(' ').slice(1).join(' ')
let banMember = message.guild.member(message.mentions.users.first());
  let banreason = message.content.split(/\s+/g).slice(2).join(" ");
var embedreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription('You need to provide a member to ban and a reason for the ban')
  .addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')
  // removed 
var embedpermreturn = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Ban Usage')
.setDescription('This command will only work if you have the permission `BAN_MEMBERS`')
.addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
.setFooter("Version " + data.newversion + " (Ban Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.p?size=1024")
var embedbotpermreturn = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Ban Usage')
.setDescription('This command will only work if I have the permission `BAN_MEMBERS`')
.addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
// removed 
var banusermessageembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Automated Ban Message')
.setDescription('**You have been banned** \n \n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + banreason + ' \n **Server:** ' + message.guild.name)
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({embed: embedpermreturn}).catch(console.error);
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: embedbotpermreturn}).catch(console.error);

  //  if(!banmessage.content.indexOf('@') === '@') return message.channel.send(':(')
    if(banreason.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
    if(banMember.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
        message.guild.member(banMember).ban(banreason)
        message.delete()
        var embedaction = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setDescription('**A user has been banned** \n \n **User:** ' + banMember + '\n **Moderator:** ' + message.author.username + '\n **Reason:** ' + banreason + '\n **Server:** ' + message.guild.name)
        .setAuthor(message.author.username ,message.author.avatarURL)
        // removed 
        message.channel.send({embed: embedaction})
        console.log(boxen('[Ban] | ' + message.guild.name + ' | ' + message.author.username + ' | ' + banreason + ' | ' + banMember.tag, {padding: 1}))


        var banmlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
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
      }
      module.exports.help = {
        name: "ban",
        info: "Ban a user",
        usage: "ban <@user> <reason>"
      }
