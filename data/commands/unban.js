const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var permerrorubembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setTitle('Unban Usage')
  .setDescription("You must have the permission `BAN_MEMBERS`")
  .addField(data.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
  // removed 
var botpermerrorubembed = new Discord.RichEmbed()
  .setColor(colors.criticla)
  .setTitle("Unban Usage")
  .setDescription("I must have the permission `BAN_MEMBERS`")
  .addField(data.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
  // removed 

  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({embed: permerrorubembed}).catch(console.error);
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send({embed: botpermerrorubembed}).catch(console.error);
  var embedreturn = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setTitle('Unban Usage')
    .setDescription('You must provide a reason for the UnBan')
      .addField(data.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
    // removed 

const unbanMember = message.mentions.users.first();
const unbanreason = message.content.split(/\s+/g).slice(1, 2).join(" ");
if(unbanreason.length < 1) return message.channel.send(embedreturn).catch(console.error);
message.guild.unban(unbanreason);
    message.delete()
    message.channel.sendMessage("The user, " + message.author.username + "has unbanned a member.");
    console.log(boxen('[Unban] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + unbanreason, {padding: 1}))
    var unbanmlembed = new Discord.RichEmbed()
      .setColor(colors.system)
      .setTitle('Unban Command Used')
      .setDescription(message.author.username)
      .addField(unbanMember, unbanreason)
      .setAuthor(message.author.username ,message.author.avatarURL)
      // removed 
      if(modlog) {
        modlog.send({embed: unbanmlembed}).catch(console.error);
      }
      if(announcements) {
        announcements.send({embed: unbanmlembed}).catch(console.error);
      }
    } else {
      // LiteMode


  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) + '```').catch(console.error);
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('```' + boxen('BAN_MEMBERS permission required', {padding: 1}) + '```').catch(console.error);

const unbanMember = message.mentions.users.first();
const unbanreason = message.content.split(/\s+/g).slice(1, 2).join(" ");
if(unbanreason.length < 1) return message.channel.send('You must provide a reason for the UnBan').catch(console.error);
message.guild.unban(unbanreason);
    message.delete()
    message.channel.sendMessage("The user, " + message.author.username + "has unbanned a member.");
    }
  });
}
module.exports.help = {
  name: "unban",
  info: "Unban a user by their ID",
  usage: "unban"
}
