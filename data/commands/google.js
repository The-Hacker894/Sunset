const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const request = require("request")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
const boxen = require("boxen")
const google = require('google')
module.exports.run = (client, message, args, data, game, announcement) => {
  message.channel.startTyping()

  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  var searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content.split(' ').slice(1).join(' '))}`;

  return snekfetch.get(searchUrl).then((result) => {
    var $ = cheerio.load(result.text);
    var googleData = $('.r').first().find('a').first().attr('href');
    googleData = querystring.parse(googleData.replace('/url?', ''));
    

  const modlog = message.guild.channels.find('name', 'mod-log');
 var googlesearch = message.content.split(' ').slice(1).join(' ')
google.resultsPerPage = 1
var nextCounter = 0
 
google(googlesearch, function (err, res){
  if (err) console.error(err)
 
  for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
    var checkGoogleData = link.description
    var checkOtherGoogleData = googleData.q
    var googlesearchresult = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Here\'s what I found for')
      .setDescription(`${googlesearch}\n\n**Title:** ${link.title}\n**Link:** ${link.href}\n**Description:** ${link.description}\n${googleData.q}`)
      .setThumbnail('https://i.imgur.com/kUSeXDX.png')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      var nsfwerror = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setDescription('NSFW term used in non NSFW channel')
      var gsrml = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Google Command Used')
        .setDescription(`${googlesearch}\n\n${link.title}`)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
      var nsfwml = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Google Command Used (NSFW Error)')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        const nsfwterms = data.nsfwterms
        
      if(message.channel.nsfw){
        message.channel.send({embed: googlesearchresult}).then(message => {
          message.channel.stopTyping()
        })
          .catch(console.error);
        if(modlog) {
          modlog.send({embed: gsrml})
        }
        return;
        }else{
          if(nsfwterms.some(terms => checkGoogleData.includes(terms))) {
            message.channel.send({embed: nsfwerror}).then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
            if(modlog) {
              modlog.send({embed: nsfwml})
            }
            return;
          } else {
            if(nsfwterms.some(terms => checkOtherGoogleData.includes(terms))) {
              message.channel.send({embed: nsfwerror}).then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
              if(modlog) {
                modlog.send({embed: nsfwml})
              }
              return;
            } else {
              message.channel.send({embed: googlesearchresult}).then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
              if(modlog) {
                modlog.send({embed: gsrml})
              }
              return;
            }
            message.channel.send({embed: googlesearchresult}).then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
            if(modlog) {
              modlog.send({embed: gsrml})
            }
            return;
          } 
        }
    
  }
 
})
  });
}
module.exports.help = {
  name: "google",
  usage: "google <searchTerm>",
  info: "Search Google"
}