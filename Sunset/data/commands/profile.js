const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')

  fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, baldata) {
    fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, 'utf8', function(err, atmdata) {
var userprofile = message.content.split(' ').slice(1).join(' ')
var otheruserprofile = message.guild.member(message.mentions.users.first())
var parsedBal = parseFloat(baldata);
var parsedATM = parseFloat(atmdata);
var parsedWorth = parseFloat(parsedBal + parsedATM)
var userprofilelengthtooshortembed = new Discord.RichEmbed()


.setColor(colors.system)
  .setTitle('Profile')
  .addField('Username', message.author.username, true)
  .addField('ID', message.author.id, true)
  .addField('Discriminator', message.author.discriminator, true)
  .addField('Joined',message.member.joinedAt, true)
  .addField('Joined Timestamp', message.member.joinedTimestamp, true)
  .addField('Status', message.author.presence.status, true)
  .addField('Balance', '$' + parsedBal, true)
  .addField('ATM Balance', '$' + parsedATM, true)
  .addField('Net Worth', '$' + parsedWorth, true)
  .setThumbnail(message.author.displayAvatarURL)
  // removed 
var profilemlembed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle(`Profile Command Used`)
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.displayAvatarURL)
  // removed 

if(userprofile.length < 1) return message.channel.send({embed: userprofilelengthtooshortembed})

  fs.readFile(`./data/serverdata/${message.guild.id}/economy/${otheruserprofile.id}.txt`, 'utf8', function(err, Obaldata) {
    fs.readFile(`./data/serverdata/${message.guild.id}/economy/atm/${otheruserprofile.id}.txt`, 'utf8', function(err, Oatmdata) {


      var newparsedBal = parseFloat(Obaldata);
      var newparsedATM = parseFloat(Oatmdata);
      var newparsedWorth = parseFloat(newparsedBal + newparsedATM)

var profileembed = new Discord.RichEmbed()
.setColor(colors.system)
  .setTitle(`Profile`)
  .addField('Username', message.guild.member(message.mentions.users.first()), true)
  .addField('ID', message.guild.member(message.mentions.users.first()).id, true)
  .addField('Discriminator', message.mentions.users.first().discriminator, true)
  .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt, true)
  .addField('Joined Timestamp', message.guild.member(message.mentions.users.first()).joinedTimestamp, true)
  .addField('Status', message.guild.member(message.mentions.members.first()).presence.status, true)
  .addField('Balance', '$' + newparsedBal, true)
  .addField('ATM Balance', '$' + newparsedATM, true)
  .addField('Net Worth', '$' + newparsedWorth, true)
  .setThumbnail(message.mentions.users.first().displayAvatarURL)
  message.channel.send({embed: profileembed}).catch(console.error);
  console.log(boxen('[Profile] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))

  if(modlog) return modlog.send({embed: profilemlembed}).catch(console.error);
    });
  });
});
});
    } else {
      // LiteMode 
      
      var userprofile = message.content.split(' ').slice(1).join(' ')
      var otheruserprofile = message.guild.member(message.mentions.users.first())

var userprofilelengthtooshortembed = new Discord.RichEmbed()


.setColor(colors.system)
  .setTitle('Profile')
  .addField('Username', message.author.username, true)
  .addField('ID', message.author.id, true)
  .addField('Discriminator', message.author.discriminator, true)
  .addField('Joined',message.member.joinedAt, true)
  .addField('Joined Timestamp', message.member.joinedTimestamp, true)
  .addField('Status', message.author.presence.status, true)
  .setThumbnail(message.author.displayAvatarURL)

if(userprofile.length < 1) return message.channel.send({embed: userprofilelengthtooshortembed})

var profileembed = new Discord.RichEmbed()
.setColor(colors.system)
  .setTitle(`Profile`)
  .addField('Username', message.guild.member(message.mentions.users.first()), true)
  .addField('ID', message.guild.member(message.mentions.users.first()).id, true)
  .addField('Discriminator', message.mentions.users.first().discriminator, true)
  .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt, true)
  .addField('Joined Timestamp', message.guild.member(message.mentions.users.first()).joinedTimestamp, true)
  .addField('Status', message.guild.member(message.mentions.members.first()).presence.status, true)
  .setThumbnail(message.mentions.users.first().displayAvatarURL)
  message.channel.send({embed: profileembed}).catch(console.error);

    }
  });
  
}
module.exports.help = {
  name: "profile",
  info: "Shows the profile of the mentioned user or yourself",
  usage: "profile <@user>"
}
