const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const Twit = require('twit')
module.exports.run = (client, message, args, game, announcement, datajson) => {


    var T = new Twit({
        consumer_key:         '',
        consumer_secret:      "",
        access_token:         "",
        access_token_secret:  "",
        timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests. 
      })
      var Tweet = message.content.split(' ').slice(1).join(' ')
      if(Tweet.length < 1) {
        var noTweet = new Discord.RichEmbed()
            .setColor(datajson.embedcolor)
            .setTitle('Tweet')
            .setDescription('Compose and send a tweet to Twitter through Sunset!\nJust use `tweet <message>` to send a tweet.')
            return message.channel.send({embed: noTweet})
      } else if(Tweet.length > 260) {
        var toolongTweet = new Discord.RichEmbed()
            .setColor(datajson.embedcolor)
            .setTitle('Tweet over 260 characters')
            .setDescription('Your Tweet was over 260 characters, please try again with a shorter message.')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            return message.channel.send({embed: toolongTweet})
      } else {
      T.post('statuses/update', { status: Tweet + '\n\n\nSent with Discord.'}, function(err, data, response) {
          var Tmessage = JSON.stringify(data.text)
          var Twitmessage = Tmessage.substring(1, Tmessage.length - 1);
          if(Tmessage === 'undefined') {
            var duplicate = new Discord.RichEmbed()
                .setColor(data.embedcolor)
                .setTitle('Duplicate Tweet')
                .setDescription('Your Tweet was a duplicate. Please change your message and try again.')
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                return message.channel.send({embed: duplicate})
          }
      /*    var Twiturl = url.replace('"', ' ')
          var statusCount = JSON.stringify(data.statuses_count)
          var otherstatusCount = statusCount.replace('"', ' ')
          var newstatusCount = parseFloat(otherstatusCount) + 1 */
          var success = new Discord.RichEmbed()
            .setTitle('Posted to Twitter!')
            .setDescription(`Message: ${Tweet}\nCheck it out here: https://twitter.com/Sunset_Bot1`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            message.channel.send({embed: success})
            console.log(data)
      })

        
    }
}
module.exports.help = {
    name: "tweet",
    info: "Use Sunset to tweet to Twitter",
    usage: "tweet <message>"
}
