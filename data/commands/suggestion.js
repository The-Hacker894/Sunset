const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var github_project_linkembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Suggestion Command Error')
  .setDescription('You must edit the `data.json` file and put your github project link in the section titled `github_project_link`')
  .setFooter(embedfooter)

if(data.github_project_link.length < 1) return message.channel.send({embed: github_project_linkembed}).catch(console.error);
    message.channel.send('If you would like to submit an issue or PR visit the link below.')
    message.channel.send(data.github_project_link + 'issues')
    var suggestionmlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Suggestion Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: suggestionmlembed}).catch(console.error);
    }
    module.exports.help = {
      name: "issue",
      info: "Submit an issue or PR",
      usage: "issue"
    }
