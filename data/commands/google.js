const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const request = require("request")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
const boxen = require("boxen")
const google = require('google')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  message.channel.startTyping()

  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {

      var googlesearch = message.content.split(' ').slice(1).join(' ')
  var searchUrl = `https://www.google.com/search?q=${encodeURIComponent(googlesearch)}`;

  return snekfetch.get(searchUrl).then((result) => {
    var $ = cheerio.load(result.text);
    var googleData = $('.r').first().find('a').first().attr('href');
    googleData = querystring.parse(googleData.replace('/url?', ''));
    

  const modlog = message.guild.channels.find('name', 'mod-log');
 
 var noSearch = new Discord.RichEmbed()
    .setColor(colors.critical)
    .setTitle('No Search Term Provided')
    .setDescription('You must provide something to search for')
 if(googlesearch.length < 1) return message.channel.send({embed: noSearch}).then(msg => {
   msg.channel.stopTyping()
 })
google.resultsPerPage = 1
var nextCounter = 0
 
google(googlesearch, function (err, res){
  if (err) console.error(err)
 
  for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
    var checkGoogleData = link.description
    var checkOtherGoogleData = googleData.q
    var googlesearchresult = new Discord.RichEmbed()
      .setColor(colors.success)
      .setTitle('Here\'s what I found for')
      .setDescription(`${googlesearch}\n\n**Title:** ${link.title}\n**Link:** ${link.href}\n**Description:** ${link.description}\n${googleData.q}`)
      .setThumbnail('https://i.imgur.com/kUSeXDX.png')
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      var nsfwerror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setDescription('NSFW term used in non NSFW channel')
      var gsrml = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('Google Command Used')
        .setDescription(`${googlesearch}\n\n${link.title}`)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
      var nsfwml = new Discord.RichEmbed()
        .setColor(colors.critical)
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
        return message.channel.stopTyping()
      }else{
          if(nsfwterms.some(terms => checkGoogleData.includes(terms))) {
            message.channel.send({embed: nsfwerror}).then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
            if(modlog) {
              modlog.send({embed: nsfwml})
            }
            return message.channel.stopTyping()
          } else {
            if(nsfwterms.some(terms => checkOtherGoogleData.includes(terms))) {
              message.channel.send({embed: nsfwerror}).then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
              if(modlog) {
                modlog.send({embed: nsfwml})
              }
              return message.channel.stopTyping()
            } else {
              message.channel.send({embed: googlesearchresult}).then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
              if(modlog) {
                modlog.send({embed: gsrml})
              }
              return message.channel.stopTyping()
            }
            message.channel.send({embed: googlesearchresult}).then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
            if(modlog) {
              modlog.send({embed: gsrml})
            }
            return message.channel.stopTyping()
          } 
        }
    
  }
 
})
  });
} else {
  //LiteMode
  var googlesearch = message.content.split(' ').slice(1).join(' ')

 if(googlesearch.length < 1) return message.channel.send('```' + boxen('You must provide something to search for', {padding: 1}) +'```').then(msg => {
  msg.channel.stopTyping()
})
  var searchUrl = `https://www.google.com/search?q=${encodeURIComponent(googlesearch)}`;

  return snekfetch.get(searchUrl).then((result) => {
    var $ = cheerio.load(result.text);
    var googleData = $('.r').first().find('a').first().attr('href');
    googleData = querystring.parse(googleData.replace('/url?', ''));
     

  google.resultsPerPage = 1
  var nextCounter = 0
 
google(googlesearch, function (err, res){
  if (err) console.error(err)
 
  for (var i = 0; i < res.links.length; ++i) {
    var link = res.links[i];
    var checkGoogleData = link.description
    var checkOtherGoogleData = googleData.q
        const nsfwterms = data.nsfwterms
        
      if(message.channel.nsfw){
        message.channel.send(`**Here's what I found for** *${googlesearch}*\n\n**Title:** ${link.title}\n**Link:** ${link.href}\n**Description:** ${link.description}\n${googleData.q}`).then(message => {
          message.channel.stopTyping()
        })
          .catch(console.error);
          return message.channel.stopTyping()
        }else{
          if(nsfwterms.some(terms => checkGoogleData.includes(terms))) {
            message.channel.send('```'+ boxen('NSFW term used in non NSFW channel', {padding: 1}) +'```').then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
              return message.channel.stopTyping()
            } else {
            if(nsfwterms.some(terms => checkOtherGoogleData.includes(terms))) {
              message.channel.send('```'+ boxen('NSFW term used in non NSFW channel', {padding: 1}) +'```').then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
                return message.channel.stopTyping()
              } else {
              message.channel.send(`${googlesearch}\n\n**Title:** ${link.title}\n**Link:** ${link.href}\n**Description:** ${link.description}\n${googleData.q}`).then(message => {
                message.channel.stopTyping()
              })
                .catch(console.error);
                return message.channel.stopTyping()
              }
            message.channel.send(`${googlesearch}\n\n**Title:** ${link.title}\n**Link:** ${link.href}\n**Description:** ${link.description}\n${googleData.q}`).then(message => {
              message.channel.stopTyping()
            })
              .catch(console.error);
            return message.channel.stopTyping()
          } 
        }
    
  }
 
})
  });

}
  });
}
module.exports.help = {
  name: "google",
  usage: "google <searchTerm>",
  info: "Search Google"
}