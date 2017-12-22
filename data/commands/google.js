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
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var googlesearchtooshortembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('Google Search Help')
  .setDescription('You must provide something to search for')
  .addField(data.prefix + 'google <search>','<search> = Something to search on Google')
  // removed 

let googlesearch = message.content.split(' ').slice(1).join(' ')
let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content.split(' ').slice(1).join(' '))}`;
if(googlesearch.length < 1)  return message.channel.send({embed: googlesearchtooshortembed})
message.channel.startTyping()

return snekfetch.get(searchUrl).then((result) => {
  var $ = cheerio.load(result.text);
  var googleData = $('.r').first().find('a').first().attr('href');
  googleData = querystring.parse(googleData.replace('/url?', ''));

  var googleresulterrorembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Sorry, but an error occured while processing your request.')
    .setDescription('Please try rewording your search')
    .addField(data.prefix + 'google <search>','<search> = Google Search Request')
  var googlensfwerrorembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('NSFW Term')
    .setDescription('NSFW Term used in non-NSFW channel.')
    // removed 

  var googleresultembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Here\'s what I found for')
    .setDescription(googlesearch + '\n \n ' + googleData.q)
    .setThumbnail('https://i.imgur.com/kUSeXDX.png')
    .setFooter('Google Search Result at ' + embedfooter)
    var googlemlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('Google Command Used')
    .setDescription(message.author.username + '\n \n ' + googleData.q)
    .setAuthor(message.author.username ,message.author.avatarURL)
    var googlensfwmlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Google Command Used (NSFW Failure)')
      .setAuthor(message.author.username ,message.author.avatarURL)
      
    var checkGoogleData = googleData.q
    var nsfwterms = data.nsfwterms
    if(message.channel.nsfw){
      message.channel.send({embed: googleresultembed})
      console.log(boxen('[Google] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + googlesearch + ' | ' + googleData.q, {padding: 1}))
      if(modlog) return message.channel.send({embed: googlemlembed})
      }else{
        if(nsfwterms.some(terms => checkGoogleData.includes(terms))) {
          message.channel.send({embed: googlensfwerrorembed})
          if(modlog) return message.channel.send({embed: googlensfwmlembed})
        } else {
          message.channel.send({embed: googleresultembed})
          if(modlog) return message.channel.send({embed: googlemlembed})
        }
      }
    message.channel.stopTyping()
});
}
module.exports.help = {
  name: "google",
  info: "Search Google",
  usage: "google <search_term>"
}
