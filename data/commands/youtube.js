const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require("request")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  message.channel.startTyping()
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
  var ytsearchtooshortembed = new Discord.RichEmbed()
   .setColor(data.embedcolor)
    .setTitle('YouTube Search Help')
    .setDescription('You must provide something to search for')
    .addField(data.prefix + 'youtube <search>','<search> = Something to search on Youtube')
    // removed 

  const ytsimplegooglesearch = message.content.split(' ').slice(1).join(' ')
  const ytsearch = 'www.youtube.com/watch?=' + message.content.split(' ').slice(1).join(' ')
  const youtubesearchUrl = `https://www.google.com/search?q=${encodeURIComponent(ytsearch)}`;
  if(ytsimplegooglesearch.length < 1)  return message.channel.send({embed: ytsearchtooshortembed})

  return snekfetch.get(youtubesearchUrl).then((result) => {
    var $ = cheerio.load(result.text);

    var youtubegoogleData = $('.r').first().find('a').first().attr('href');
    youtubegoogleData = querystring.parse(youtubegoogleData.replace('/url?', ''));
    var modlog = message.guild.channels.find('name', 'mod-log');

   var youtubegoogleresulterrorembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Sorry, but an error occured while processing your request.')
      .setDescription('Please try rewording your search')
      .addField(data.prefix + 'youtube <search>','<search> = Youtube Search Request')
      // removed 
    var youtuberesultembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
     .setTitle('Here\'s what I found for')
    .setDescription(ytsimplegooglesearch + '\n \n ' + youtubegoogleData.q)
      .setThumbnail('https://i.imgur.com/mr5RWW8.jpg')
      .setFooter('Youtube Search Result at ' + embedfooter)
      var youtubemlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('YouTube Command Used')
      .setDescription(message.author.username + '\n \n ' + youtubegoogleData.q)
      .setAuthor(message.author.username ,message.author.avatarURL)
      var nsfwtermerrorembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('NSFW Term Error')
        .setDescription('NSFW Term used in Non-NSFW Channel')
var nsfwterms = data.nsfwterms
      var ytcheck = youtubegoogleData.q
      if(message.channel.nsfw) {
        console.log(boxen('[YouTube] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + youtubegoogleData.q + ' | ' + ytsimplegooglesearch, {padding: 1}))
        message.channel.send({embed: youtuberesultembed}).catch(console.error);
        if(modlog) return modlog.send({embed: youtubemlembed}).catch(console.error);
      } else {
        if(nsfwterms.some(terms => ytcheck.includes(terms))) {
          message.channel.send({embed: nsfwtermerrorembed})
          if(modlog) return modlog.send({embed: nsfwtermerrorembed})
        }else {
          message.channel.send({embed: youtuberesultembed}).catch(console.error);
          if(modlog) return modlog.send({embed: youtubemlembed}).catch(console.error);
        }
      }
      message.channel.stopTyping()
    
    
});
}
module.exports.help = {
  name: "youtube",
  info: "Search Youtube",
  usage: "youtube <search_term>"
}
