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
const kickreason = message.content.split(/\s+/g).slice(2).join(" ");
const kickMember = message.guild.member(message.mentions.users.first());

var embedkreturn = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription('You need to provide a member to kick and a reason for the kick')
  .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
  // removed 
var embedkpermreturn = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Kick Usage')
.setDescription('This command will only work if you have the permission `KICK_MEMBERS`')
.addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
.setFooter("Version " + data.newversion + " (Ban Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.p?size=1024")
var embedbotkpermreturn = new Discord.RichEmbed()
.setColor(data.embedcolor)
.setTitle('Kick Usage')
.setDescription('This command will only work if I have the permission `KICK_MEMBERS`')
.addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
// removed 

  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send({embed: embedkpermreturn}).catch(console.error);
  if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send({embed: embedbotkpermreturn}).catch(console.error);
  var newembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Kick Usage')
  .setDescription('You provide a member to kick and a reason')
  .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for kick')
  .setFooter("Version " + data.newversion + " (Kick Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.webp?size=1024")
  var sunsetkickembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Kick Usage Error')
    .setDescription('I cannot kick myself :joy:')
    .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for kick')
    // removed 


    if(kickreason.length < 1) return message.channel.send({embed: newembed}).catch(console.error);
    if(kickMember.length < 1) return message.channel.send({embed: newembed}).catch(console.error);
    if(kickMember === `@${data.name}`) return message.channel.send({embed: sunsetkickembed})
    if(kickMember === `@${data.name}#${data.bot_discriminator}`) return message.channel.send({embed: sunsetkickembed})
    if(kickMember === `${data.bot_guild_id}`) return message.channel.send({embed: sunsetkickembed})

    var embedaction = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
    .setAuthor(message.author.username ,message.author.avatarURL)
    // removed 
    message.channel.send({embed: embedaction}).catch(console.error);
        message.delete()
        message.guild.member(kickMember).kick(kickreason);
          console.log(boxen('[Kick] | ' + message.guild.name + ' | ' + message.author.tag + ' | ' + kickreason + ' | ' + kickMember.tag, {padding: 1}))
          var kickmlembed = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
            .setAuthor(message.author.username ,message.author.avatarURL)
            // removed 
          if(modlog) {
            modlog.send({embed: kickmlembed}).catch(console.error);
          }
          if(!announcements) {
            message.guild.owner.send({embed: kickmlembed})
          }
          if(announcements) {
            announcements.send({embed: kickmlembed}).catch(console.error);
          }
}
module.exports.help = {
  name: "kick",
  info: "Kick a Member",
  usage: "kick <@user> <reason>"
}
