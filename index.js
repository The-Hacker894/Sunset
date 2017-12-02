const Discord = require("discord.js");
const client = new Discord.Client();
var data = require("./data/brain/data.json");
var announcement = require("./data/brain/announcement.json");
var game = require("./data/brain/game.json");
const fs = require("fs");
const prefix = data.prefix
const ytdl = require("ytdl-core")
const request = require("request")
const moment = require("moment")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
const embedfooter = moment().format('h:mm:ss a') + ' on ' +  moment().format('MMMM Do YYYY')
const requestpn = require('request-promise-native');
const Attachment = require('discord.js').Attachment
const webdict = require('webdict');
const pusage = require('pidusage')
const figlet = require('figlet');
const flip = require('flip-text');
const cowsay = require('cowsay');
const prettyMs = require('pretty-ms');
const convert = require('color-convert');
const defaultConfig = {
  modLogChannel: "mod-log",
  modRole: "Moderator",
  adminRole: "Administrator"
}

//const modlog = member.guild.channels.find('name', 'mod-log');

const botjoinembed = new Discord.RichEmbed()
  .setColor('FFCE00')
  .setTitle('From ' + data.name + ' to Sunrise I\'ll be there!')
  .setDescription('**Thank you for inviting me to your server!**\n Please note that I log **almost everything** that I can *see*. This means stuff like your ID, updates done to messages, and the commands you use are logged. If you are against this sort of thing then this bot is not for you.')
  .addField('**If you need any help you can use the** `help` **command**','Also by doing `help <command>` you can get usage on how to use those commands')
  .addField('**You may also want to make channels with the names below**','`#announcements` `#mod-log`')
  .addField("**You can also make the channels using the commands below**",'`announcementscreate` `mod-logcreate`')



const noannouncechannelembed = new Discord.RichEmbed()
  .setColor('FFCE00')
  .setTitle('No Announcement channel found')
  .setDescription('Please make a channel titled `announcements` or use the `announcementscreate` command so join/leave ban/kick/unban messages can work')
// const announcements = member.guild.channels.find('name', 'announcements');




client.on("ready", () => {
  console.log('Logged on at ' + embedfooter)
  console.log('[Game] ' + game.game)
  console.log('[Announcement] ' + announcement.announce)
  client.user.setGame(game.game + ' | ' + data.prefix + 'help' )
  pusage.unmonitor(process.pid)
 requestpn.post({
         uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
         headers: {
             Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3MTA5NzIyMzk0Mjg5NzY2NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTEwOTczNTg0fQ.Buo5Ql61yXVjTObZE-o8eAVmNVYRJANX2dCyZi8EOOU`, // Insert token here
         },
         json: true,
         body: {
             server_count: client.guilds.size,
         },
     });


});
client.on('guildBanAdd', (guild, user) => {
  var modlog = guild.channels.find('name', 'mod-log')
  var announcements = guild.channels.find('name', 'announcements');

    var newbanembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('User Banned :hammer:')
      .setDescription('The user ' + user + ' has been met with the Ban Hammer :hammer: ')
      .setAuthor(user.username ,user.avatarURL)
      .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: newbanembed}).then( () => {
      if(announcements) return announcements.send({embed: newbanembed})
    })

});
client.on('guildMemberSpeaking', (member, speaking) => {
  if(member.speaking) {
    console.log(member.user.username + ' is speaking | ' + member.guild.name)
  }
});
client.on('guildMemberUpdate', (message, oMember, nMember) => {
  var modlog = message.guild.channels.find('name', 'mod-log')
  var guildMemberUpdateembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Guild Member Update')
    .setDescription(oMember + ' | ' + nMember)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: guildMemberUpdateembed})
});
client.on('guildUpdate', (oGuild, nGuild) => {
  var modlog = oGuild.channels.find('name', 'mod-log')
  var guildupdateembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Guild Updated')
    .setDescription('The Guild has been updated! \n \n **Before:** ' + oGuild + ' \n \n **After:** ' + nGuild)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: guildupdateembed})
});
client.on('guildBanRemove', (guild, user) => {
  var modlog = guild.channels.find('name', 'mod-log')
  var announcements = guild.channels.find('name', 'announcements');
  var newunbanembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('User Unbanned')
    .setDescription('The user ' + user + ' has been unbanned')
    .setAuthor(user.username , user.displayAvatarURL)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: newunbanembed}).then( () => {
      if(announcements) return announcements.send({embed: newunbanembed})
    })
});
client.on("guildDelete", guild => {
  console.log('Removed from 1 server | ' + guild)
  client.user.setGame(game.game + ' | ' + data.prefix + 'help' )
  requestpn.post({
          uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
          headers: {
              Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3MTA5NzIyMzk0Mjg5NzY2NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTEwOTczNTg0fQ.Buo5Ql61yXVjTObZE-o8eAVmNVYRJANX2dCyZi8EOOU`, // Insert token here
          },
          json: true,
          body: {
              server_count: client.guilds.size,
          },
      });

});
client.on("guildCreate", guild => {
  guild.owner.send({embed: botjoinembed}).catch(console.error);
      client.user.setGame(game.game + ' | ' + data.prefix + 'help' )
     requestpn.post({
            uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
            headers: {
                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3MTA5NzIyMzk0Mjg5NzY2NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTEwOTczNTg0fQ.Buo5Ql61yXVjTObZE-o8eAVmNVYRJANX2dCyZi8EOOU`, // Insert token here
            },
            json: true,
            body: {
                server_count: client.guilds.size,
            },
        });

});
client.on('guildMemberAdd', member => {

  var modlog = member.guild.channels.find('name', 'mod-log');
var announcements = member.guild.channels.find('name', 'announcements');
var newusermessageembed = new Discord.RichEmbed()
  .setColor("FFCE00")
  .setTitle('**Welcome to the server**')
  .setDescription('Some things that you may want to know about this server is that everything you do here is logged. This is done for *quality assurance* and moderation. If you disagree with this sort of thing you should leave this server now.')

  var newuserjoinembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Member Announcement')
    .setDescription('A new user has joined the server :D \nPlease welcome ' + member + '!')
    .setFooter(embedfooter)

if(modlog) return modlog.send({embed: newuserjoinembed}).then( () => {
  if(announcements) return announcements.send({embed: newuserjoinembed})
})
// member.send({embed: newusermessageembed})
});
client.on('guildMemberRemove', member => {
  var modlog = member.guild.channels.find('name', 'mod-log');
var announcements = member.guild.channels.find('name', 'announcements');
    var olduserjoinembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Member Announcement')
      .setDescription('A user has left the server D: \nPlease say your Farewells to ' + member + '!')
      .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: olduserjoinembed}).then( () => {
        if(announcements) return announcements.send({embed: olduserjoinembed})
      })
});
client.on('channelUpdate', (oChannel, nChannel) => {
  var modlog = oChannel.guild.channels.find('name', 'mod-log');
    var channelupdateeventembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Channel Updated')
      .setDescription('**Before:** ' + oChannel + '\n **After:**' + nChannel)
      .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: channelupdateeventembed})
});
client.on('channelPinsUpdate', (channel, time) => {
  var modlog = channel.guild.channels.find('name', 'mod-log');
    var channelpinsupdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Channel Pins Updated')
      .addField(channel.name, time)
      .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: channelpinsupdateembed}).catch(console.error);
});
client.on('roleCreate', role => {
  var modlog = role.guild.channels.find('name', 'mod-log');
  var rolecreateembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Role Created')
    .setDescription(role)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: rolecreateembed}).catch(console.error);
});
client.on('roleDelete', role => {
  var modlog = role.guild.channels.find('name', 'mod-log');
  var roledeleteembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Role Deleted')
    .setDescription(role)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: roledeleteembed}).catch(console.error);
});
client.on('roleUpdate', role => {
  var modlog = role.guild.channels.find('name', 'mod-log');
  var roleupdateembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Role Updated')
    .setDescription(role)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: roleupdateembed}).catch(console.error);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
  var modlog = oldMessage.guild.channels.find('name', 'mod-log');
  var messageUpdateembed = new Discord.RichEmbed()
    .setColor('FFCE00')
   .setTitle("Message Edited")
    .setDescription('Edited by @' + oldMessage.author.username + ' in #' + oldMessage.channel.name + '\n \n **Before:** ' + oldMessage + '\n \n **After:** ' + newMessage)
    .setFooter(embedfooter)
if(modlog) {
  console.log(' ')
  if(oldMessage.content !== newMessage.content) return modlog.send({embed: messageUpdateembed});
}

});
client.on('messageDelete', message => {
  var modlog = message.guild.channels.find('name', 'mod-log');
   var messagedelembed = new Discord.RichEmbed()
   .setColor('FFCE00')
   .setTitle('Message Deleted')
   .setDescription(message.author.username + '\n \n' + message)
   .setFooter(embedfooter)
   if(modlog) return modlog.send({embed: messagedelembed}).catch(console.error);
});
client.on('message', msg => {
if(msg.content === 'prefix') {
    msg.channel.send("My prefix is " + data.prefix).catch(console.error);
    var prefixarembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Prefix Auto-Response used')
      .setDescription(msg.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
    var modlog = member.guild.channels.find('name', 'mod-log');
    if(modlog) return modlog.send({embed: prefixarembed}).catch(console.error);
  }
  if(msg.content === '@Sunset#8283') {
    msg.channel.send("My prefix is " + data.prefix).catch(console.error);
  }
  if(msg.content === '@Sunset') {
    msg.channel.send("My prefix is " + data.prefix).catch(console.error);
  }
  if(msg.content === '<@&378930041356288010>') {
    msg.channel.send("My prefix is " + data.prefix).catch(console.error);
  }
  if(msg.content.indexOf('porn') === 1) {
    msg.delete(0)
  }
});


client.on("message", message => {
  let args = message.content.substring(prefix.length).split(" ");
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;
  fs.readFile("./data/brain/data.json", JSON.stringify(data), (err) => console.error);

  switch (args[0].toLowerCase()) {
    case "usage":
    pusage.stat(process.pid, function (err, stat) {
      const cpuusage = parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2)
      const memusage = parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2)
      var pusageembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Usage')
        .setDescription('\n CPU: ' + cpuusage + '% \n Memory: ' + memusage + 'MB')
  /*    message.channel.send('CPU: ' + parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2) + '%')
      message.channel.send('Mem: ' + parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2) + 'MB') //those are bytes
      */
      message.channel.send({embed: pusageembed}).then( () => {
        pusage.unmonitor(process.pid)
      })
      var pusagemlembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Usage Command Used')
        .setDescription('CPU: ' + cpuusage + '% \n Memory: ' + memusage + 'MB')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.send({embed: pusagemlembed}).catch(console.error);
  });
      break;

    case "disclaimer":
      var disclaimerembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Disclaimer for Sunset')
        .setDescription('**Sunset logs a wide variety of data** \n This includes: \n \n -Any updates done to messages \n -Commands Used \n *This data is used for some moderation features*. **The data that is logged by Sunset is in no way malicious and cannot be used against you.**')
        .setFooter(embedfooter)
        message.channel.send({embed: disclaimerembed})
      var disclaimermlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Disclaimer Command Used')
        .setDescription(message.author.username)
        .setFooter(embedfooter)

        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.send({embed: disclaimermlembed}).catch(console.error);
        break;
    case "join":
    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply("**You must be in a voice channel.**").catch(console.error);
    voiceChannel.join()
    var modlog = message.guild.channels.find('name', 'mod-log');
    var joinmlembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Join Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: joinmlembed}).catch(console.error);
    break;
    case "leave":
    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply("**You must be in a voice channel.**").catch(console.error);
    voiceChannel.leave()
    var modlog = message.guild.channels.find('name', 'mod-log');
    var leavemlembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Leave Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: leavemlembed}).catch(console.error);
    break;
    case "mod-logcreate":
    var nopermsembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Mod Log Perm Error')
      .setDescription("Please give me the permission `MANAGAE_CHANNELS`")
      .setFooter(embedfooter)

    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: nopermsembed}).catch(console.error);
      message.guild.createChannel('mod-log').catch(console.error);
      break;
    case "announcementscreate":
      var noacpermsembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Announcement Create Perm Error')
        .setDescription('Please give me the permission `MANAGE_CHANNELS`')
        .setFooter(embedfooter)
      if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: noacpermsembed}).catch(console.error);
      message.guild.createChannel('announcements').catch(console.error);
      break;
    case "ping":
    var data = require("./data/brain/data.json");
      var pingmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Ping Command used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)

      var modlog = message.guild.channels.find('name', 'mod-log');
    message.channel.send('Pinging...').then(sent => {
      sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)
    })
    if(modlog) return modlog.send({embed: pingmlembed}).catch(console.error);
    message.delete()
    break;
    case "announcement":
      var announcement = require("./data/brain/announcement.json");
      var announcement_embed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Announcement')
        .setDescription(announcement.announce)
        message.channel.send({embed: announcement_embed})
      var announcemlembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle("Announcement Command Used")
        .setDescription(announcement.announce)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setFooter(embedfooter)
        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.send({embed: announcementmlembed}).catch(console.error);
        break;
    case "setannounce":
    var data = require("./data/brain/data.json");
    if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Command**`).catch(console.error);
      let setnewannounce = message.content.split(' ').slice(1).join(' ')
      var announcement = require("./data/brain/announcement.json");

      announcement.announce = setnewannounce;

    fs.writeFileSync("./data/brain/announcement.json", JSON.stringify(announcement), (err) => console.error);
    message.channel.send('Set announcement to `' + setnewannounce + '`')

    break;
    case "flush":
    var data = require("./data/brain/data.json");
      if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Command**`).catch(console.error);
      let flushmessage = message.content.split(' ').slice(1).join(' ')
      var flushinfoembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle("Flush Info")
        .setDescription('This command is used to reload certain things')
        .addField('Game',data.prefix + 'flush game')
        .addField('Session', data.prefix + 'flush session')
        .addField('Process', data.prefix + 'flush process')
      if(flushmessage.length < 1) return message.channel.send({embed: flushinfoembed})
      if(flushmessage === `game`) {
        var flushgamesuccessembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Flushed Game')
          .setAuthor(message.author.username, message.author.displayAvatarURL)
        client.user.setGame(game.game + ' | ' + data.prefix + 'help')
          message.channel.send({embed: flushgamesuccessembed})
      }
      if(flushmessage === `session`) {
        var flushannouncementsuccessembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Flushing Session')
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          message.channel.send({embed: flushannouncementsuccessembed})
            client.destroy()
            client.login(data.token)
      }
      if(flushmessage === `process`) {
        var flushprocesssuccessembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Flushing Process')
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          message.channel.send({embed: flushprocesssuccessembed})
            process.exit(0);
      }
    break;
    case "vote":
      var votereason = message.content.split(' ').slice(1).join(' ')
      var voteembed = new Discord.RichEmbed()
        .setTitle('Vote')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setColor('FFCE00')
        .setDescription(votereason)
        .addField('Instructions', ':a: = Yes | :b: = No')
        .setFooter('Poll setup at ' + embedfooter)
        message.delete()
        message.channel.send({embed: voteembed}).then(function (message) {
            message.react('🅰')
            message.react('🅱')

          });
          var votemlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Vote Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .addField(votereason, "-")
            .setFooter(embedfooter)

          var modlog = message.guild.channels.find('name', 'mod-log');
          if(modlog) return modlog.send({embed: votemlembed}).catch(console.error);
          break;
          function soundtestrandomizer() {
          var rand = ['tranquilize','far_and_wide','heavy_weight','hubbub','morning_routine','slipstream','snap','soul_food','windswept'];

          return rand[Math.floor(Math.random()*rand.length)];
      }
          case "soundtest":
          var voiceChannel = message.member.voiceChannel;
          var data = require("./data/brain/data.json")
          if (message.author.id !== data.ownerid) return message.channel.send('**There is currently an issue with FFMPEG Libraries not being compatible with Linux Operating Systems.** \n This command will be disabled until a fix is made.')
          if (!voiceChannel) return message.reply("**You must be in a voice channel.**").catch(console.error);
          voiceChannel.leave()

          voiceChannel.join().then(connection => {
            var dispatcher = connection.playFile('./data/files/audio/music/' + soundtestrandomizer() + '.mp3');
            dispatcher.on('end', () => voiceChannel.leave());
            message.channel.send(':play_pause: **Now Playing SoundTest**')

          });
          var modlog = message.guild.channels.find('name', 'mod-log');
          var soundtestmlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Sound Test Command Used')
            .setDescription(message.author.username)
            .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: soundtestmlembed}).catch(console.error);

          break;
          case "play":
          var data = require("./data/brain/data.json")
          var voiceChannel = message.member.voiceChannel;
          if (message.author.id !== data.ownerid) return message.channel.send('**There is currently an issue with FFMPEG Libraries not being compatible with Linux Operating Systems.** \n This command will be disabled until a fix is made.')
        if (!voiceChannel) return message.reply("**You must be in a voice channel.**").catch(console.error);
        voiceChannel.leave()

          let simplegooglesearch = message.content.split(' ').slice(1).join(' ')
          let ytgooglesearch = 'www.youtube.com/watch?=' + message.content.split(' ').slice(1).join(' ')
          let ytsearchUrl = `https://www.google.com/search?q=${encodeURIComponent(ytgooglesearch)}`;

          return snekfetch.get(ytsearchUrl).then((result) => {
            let $ = cheerio.load(result.text);
            let ytgoogleData = $('.r').first().find('a').first().attr('href');
            ytgoogleData = querystring.parse(ytgoogleData.replace('/url?', ''));

          let musictoplay = message.content.split(' ').slice(1).join('')
          let youtubeurl = `www.youtube.com`
          let volume2set = message.content.split(/\s+/g).slice(2).join(" ");
          var musiclengtherror = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Music Commands Usage (Play)')
            .setDescription('You must provide a search term for YouTube')
            .addField(data.prefix + 'play <youtube_video>','<youtube_video> = Search Term for Youtube Video')
            .setFooter(embedfooter)

          if(musictoplay.length < 1) return message.channel.send({embed: musiclengtherror}).catch(console.error);



        voiceChannel.join()
          .then(connnection => {
            var stream = ytdl(`${ytgoogleData.q}`, { filter: 'audioonly' });
            message.channel.send(':play_pause: **Now Playing** ' + `${ytgoogleData.q}`)

            var dispatcher = connnection.playStream(stream);
            dispatcher.on('end', () => voiceChannel.leave());
            dispatcher.on('error', error => {
              console.log(error)
            });
            console.log('YTDL | ' + `${ytgoogleData.q}` + ' | ' + message.guild.name + ' | ' + message.author.username)
            var playmlembed = new Discord.RichEmbed()
              .setColor('FFCE00')
              .setTitle('Play Command Used')
              .setDescription(message.author.username)
              .addField(`${ytgoogleData.q}`,'_')
              .setAuthor(message.author.username ,message.author.avatarURL)
              .setFooter(embedfooter)

            var modlog = message.guild.channels.find('name', 'mod-log');
            if(modlog) return modlog.send({embed: playmlembed}).catch(console.error);
          });
      });

        break;

    case "youtube":

    var data = require('./data/brain/data.json')
    var ytsearchtooshortembed = new Discord.RichEmbed()
     .setColor('FFCE00')
      .setTitle('YouTube Search Help')
      .setDescription('You must provide something to search for')
      .addField(data.prefix + 'youtube <search>','<search> = Something to search on Youtube')
      .setFooter(embedfooter)

    let ytsimplegooglesearch = message.content.split(' ').slice(1).join(' ')
    let ytsearch = 'www.youtube.com/watch?=' + message.content.split(' ').slice(1).join(' ')
    let youtubesearchUrl = `https://www.google.com/search?q=${encodeURIComponent(ytsearch)}`;
    if(ytsimplegooglesearch.length < 1)  return message.channel.send({embed: ytsearchtooshortembed})

    return snekfetch.get(youtubesearchUrl).then((result) => {
      let $ = cheerio.load(result.text);
      let youtubegoogleData = $('.r').first().find('a').first().attr('href');
      youtubegoogleData = querystring.parse(youtubegoogleData.replace('/url?', ''));

     var youtubegoogleresulterrorembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Sorry, but an error occured while processing your request.')
        .setDescription('Please try rewording your search')
        .addField(data.prefix + 'youtube <search>','<search> = Youtube Search Request')
        .setFooter(embedfooter)

      if(youtubegoogleData.q === 'undefined') return message.channel.send({embed: youtubegoogleresulterrorembed}).catch(console.error);
      var youtuberesultembed = new Discord.RichEmbed()
        .setColor('FFCE00')
       .setTitle('Here\'s what I found for')
      .setDescription(ytsimplegooglesearch + '\n \n ' + youtubegoogleData.q)
        .setThumbnail('https://ih0.redbubble.net/image.25011287.7046/flat,1000x1000,075,f.u1.jpg')
        .setFooter('Youtube Search Result at ' + embedfooter)
      message.channel.send({embed: youtuberesultembed}).catch(console.error);
      console.log(message.guild.name + " | " + message.author.username + ' | ' + ytsearch + ' | ' + `${youtubegoogleData.q}`)
      var youtubemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('YouTube Command Used')
        .setDescription(message.author.username + '\n \n ' + youtubegoogleData.q)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)

      var modlog = message.guild.channels.find('name', 'mod-log');
      if(modlog) return modlog.send({embed: youtubemlembed}).catch(console.error);
 });

break;
case "urban":
let urbandictsearch = message.content.split(' ').slice(1).join(' ')
var data = require("./data/brain/data.json")
  webdict('urbandictionary', urbandictsearch).then(resp => {
    var urbandicterrorembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Urban Dictionary Error')
      .setDescription('**No Dictionary Entry for ' + urbandictsearch + '**')
      .addField(data.prefix + 'urban <word>','<word> = Word from the English Dictionary')
    var urbandictlengthembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Urban Dictionary Length Error')
      .setDescription('You must provide a word to search for')
      .addField(data.prefix + 'urban <word>','<word> = Word from the English Dictionary')
    if(!resp.definition) return message.channel.send({embed: urbandicterrorembed})
    if(urbandictsearch.length < 1) return message.channel.send({embed: urbandictlengthembed})
    var urbandictembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Urban Dictionary Definition')
      .setDescription('**Word:** ' + urbandictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setFooter(embedfooter)
      .setThumbnail('http://www.extension.zone/wp-content/uploads/2015/11/Urban-Dictionary-logo.png')
    message.channel.send({embed: urbandictembed})
    var urbandictmlembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Urban Dictionary Command Used')
      .setDescription('**Word:** ' + urbandictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setFooter(embedfooter)
    var modlog = message.guild.channels.find('name', 'mod-log');
    if(modlog) return modlog.channel.send({embed: urbandictmlembed})
  });
  break;
case "urbandictionary":
let ubdictsearch = message.content.split(' ').slice(1).join(' ')
var data = require("./data/brain/data.json")
  webdict('urbandictionary', ubdictsearch).then(resp => {
    var ubdicterrorembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Urban Dictionary Error')
      .setDescription('**No Dictionary Entry for ' + ubdictsearch + '**')
      .addField(data.prefix + 'urbandictionary <word>','<word> = Word from the English Dictionary')
    var ubdictlengthembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Urban Dictionary Length Error')
      .setDescription('You must provide a word to search for')
      .addField(data.prefix + 'urbandictionary <word>','<word> = Word from the English Dictionary')
    if(!resp.definition) return message.channel.send({embed: ubdicterrorembed})
    if(ubdictsearch.length < 1) return message.channel.send({embed: ubdictlengthembed})
    var ubdictembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Urban Dictionary Definition')
      .setDescription('**Word:** ' + ubdictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setFooter(embedfooter)
      .setThumbnail('http://www.extension.zone/wp-content/uploads/2015/11/Urban-Dictionary-logo.png')
    message.channel.send({embed: ubdictembed})
    var ubdictmlembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Urban Dictionary Command Used')
      .setDescription('**Word:** ' + ubdictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
      .setAuthor(message.author.username, message.author.displayAvatarURL)
      .setFooter(embedfooter)
    var modlog = message.guild.channels.find('name', 'mod-log');
    if(modlog) return modlog.channel.send({embed: ubdictmlembed})
  });
  break;
    case "dictionary":
    let dictsearch = message.content.split(' ').slice(1).join(' ')
    var data = require("./data/brain/data.json")
      webdict('dictionary', dictsearch).then(resp => {
        var dicterrorembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Dictionary Error')
          .setDescription('**No Dictionary Entry for ' + dictsearch + '**')
          .addField(data.prefix + 'dictionary <word>','<word> = Word from the English Dictionary')
        var dictlengthembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Dictionary Length Error')
          .setDescription('You must provide a word to search for')
          .addField(data.prefix + 'dictionary <word>','<word> = Word from the English Dictionary')
        if(!resp.definition) return message.channel.send({embed: dicterrorembed})
        if(dictsearch.length < 1) return message.channel.send({embed: dictlengthembed})
        var dictembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Dictionary Definition')
          .setDescription('**Word:** ' + dictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .setFooter(embedfooter)
          .setThumbnail('https://lh3.ggpht.com/Lj0twnvfFV_29_rN09DBZKElquqO2rrSqaMg-avflK9tcejasrOnjsD15G5kkM4kVSE=w300')
        message.channel.send({embed: dictembed})
        var dictmlembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Dictionary Command Used')
          .setDescription('**Word:** ' + dictsearch + '\n **Definition:** ' + resp.definition + '\n **Type:** ' + resp.type + '\n **Source:** ' + resp.source)
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .setFooter(embedfooter)
        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.channel.send({embed: dictmlembed})
      });
      break;
    case "google":
    var data = require('./data/brain/data.json')
    var googlesearchtooshortembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Google Search Help')
      .setDescription('You must provide something to search for')
      .addField(data.prefix + 'google <search>','<search> = Something to search on Google')
      .setFooter(embedfooter)

    let googlesearch = message.content.split(' ').slice(1).join(' ')
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content.split(' ').slice(1).join(' '))}`;
    if(googlesearch.length < 1)  return message.channel.send({embed: googlesearchtooshortembed})

    return snekfetch.get(searchUrl).then((result) => {
      let $ = cheerio.load(result.text);
      let googleData = $('.r').first().find('a').first().attr('href');
      googleData = querystring.parse(googleData.replace('/url?', ''));

      var googleresulterrorembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Sorry, but an error occured while processing your request.')
        .setDescription('Please try rewording your search')
        .addField(data.prefix + 'google <search>','<search> = Google Search Request')
        .setFooter(embedfooter)

      if(googleData.q === 'undefined') return message.channel.send({embed: googleresulterrorembed}).catch(console.error);
      var googleresultembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Here\'s what I found for')
        .setDescription(googlesearch + '\n \n ' + googleData.q)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png')
        .setFooter('Google Search Result at ' + embedfooter)
      message.channel.send({embed: googleresultembed}).catch(console.error);
      console.log(message.guild.name + " | " + message.author.username + ' | ' + googlesearch + ' | ' + `${googleData.q}`)
      var googlemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Google Command Used')
        .setDescription(message.author.username + '\n \n ' + googleData.q)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
    var modlog = message.guild.channels.find('name', 'mod-log');
      if(modlog) return modlog.send({embed: googlemlembed}).catch(console.error);
});

     break;
    case "music":
      var musichembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Music Commands')
        .addField('Commands','`play` `stop` `end`')
        message.channel.send({embed: musichembed}).catch(console.error);

        var musicmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)

        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.send({embed: musicmlembed}).catch(console.error);

      break;
      case "earrape":
        var data = require("./data/brain/data.json")
        var voiceChannel = message.member.voiceChannel;
        if (message.author.id !== data.ownerid) return message.channel.send('**There is currently an issue with FFMPEG Libraries not being compatible with Linux Operating Systems.** \n This command will be disabled until a fix is made.')
      if (!voiceChannel) return message.channel.send("**You must be in a voice channel.**").catch(console.error);
      voiceChannel.leave()
      function earrapetoplay() {
      var rand = ['https://www.youtube.com/watch?v=uYRWDYDsjrY&t','https://www.youtube.com/watch?v=YMJhr6ca4Js','https://www.youtube.com/watch?v=5WltNU0JBPk&t'];

      return rand[Math.floor(Math.random()*rand.length)];
  }
      voiceChannel.join()
        .then(connnection => {
          var stream = ytdl(earrapetoplay(), { filter: 'audioonly' });
          message.channel.send(':play_pause: **Now Playing Earrape**')
          var dispatcher = connnection.playStream(stream);
          dispatcher.on('end', () => voiceChannel.leave());
          console.log('YTDL (Earrape) | ' + earrapetoplay() + ' | ' + message.guild.name + ' | ' + message.author.username)
        });
        var earrapemlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Earrape Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)

        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.send({embed: earrapemlembed}).catch(console.error);
        break;

      case "date":
      let momentdate = moment().format('MMMM Do YYYY')
      var dateembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Today\'s date is (US)')
        .setDescription(momentdate)
        .setFooter(embedfooter)
        message.channel.send({embed: dateembed}).catch(console.error);
        var datemlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Date Command Used')
          .setDescription(message.author.username)
          .addField(moment().format('MMMM Do YYYY'), '_')
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.send({embed: datemlembed}).catch(console.error);

        break;
      case "day":
      let momentday = moment().format('dddd')
        var dayembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('The day is (US)')
          .setDescription(momentday)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          message.channel.send({embed: dayembed}).catch(console.error);
          var daymlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Day Command Used')
            .setDescription(message.author.username)
            .addField(moment().format('dddd'),'_')
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
          var modlog = message.guild.channels.find('name', 'mod-log');
          if(modlog) return modlog.send({embed: daymlembed}).catch(console.error);
          break;
      case "whois":
      var data = require(`./data/brain/data.json`)
      let whoisuserprofile = message.content.split(' ').slice(1).join(' ')
      let whoisotheruserprofile = message.guild.member(message.mentions.users.first())
      var whoisuserprofilelengthtooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Profile Help')
        .setDescription('You must provide a mentioned user')
        .addField(data.prefix + 'whois <@user>','<@user> =  Mentioned User')
        .setFooter(embedfooter)

        var whoismlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Who Is Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)

      if(whoisuserprofile.length < 1) return message.channel.send({embed: whoisuserprofilelengthtooshortembed})
      var whoisprofileembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(`Profile`)
        .addField('Username', message.guild.member(message.mentions.users.first()))
        .addField('ID', message.guild.member(message.mentions.users.first()).id)
        .addField('Discriminator', message.mentions.users.first().discriminator)
        .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt)
        .addField('Joined Timestamp', message.guild.member(message.mentions.users.first()).joinedTimestamp)
        .addField('Status', message.guild.member(message.mentions.members.first()).presence.status)
        .setThumbnail(message.mentions.users.first().displayAvatarURL)
        .setFooter(embedfooter)
        message.channel.send({embed: whoisprofileembed}).catch(console.error);


        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) return modlog.send({embed: whoismlembed}).catch(console.error);
        break;
      case "profile":
      var data = require(`./data/brain/data.json`)
      var modlog = message.guild.channels.find('name', 'mod-log');
      let userprofile = message.content.split(' ').slice(1).join(' ')
      let otheruserprofile = message.guild.member(message.mentions.users.first())
      var userprofilelengthtooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Profile')
        .addField('Username', message.author.username)
        .addField('ID', message.author.id)
        .addField('Discriminator', message.author.discriminator)
        .addField('Joined',message.member.joinedAt)
        .addField('Joined Timestamp', message.member.joinedTimestamp)
        .addField('Status', message.author.presence.status)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter(embedfooter)
      var profilemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(`Profile Command Used`)
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.displayAvatarURL)
        .setFooter(embedfooter)

      if(userprofile.length < 1) return message.channel.send({embed: userprofilelengthtooshortembed})
      var profileembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(`Profile`)
        .addField('Username', message.guild.member(message.mentions.users.first()))
        .addField('ID', message.guild.member(message.mentions.users.first()).id)
        .addField('Discriminator', message.mentions.users.first().discriminator)
        .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt)
        .addField('Joined Timestamp', message.guild.member(message.mentions.users.first()).joinedTimestamp)
        .addField('Status', message.guild.member(message.mentions.members.first()).presence.status)
        .setThumbnail(message.mentions.users.first().displayAvatarURL)
        .setFooter(embedfooter)
        message.channel.send({embed: profileembed}).catch(console.error);

        if(modlog) return modlog.send({embed: profilemlembed}).catch(console.error);
        break;
      case "avatar":
      var data = require(`./data/brain/data.json`)
      var modlog = message.guild.channels.find('name', 'mod-log');
      let useravatar = message.content.split(' ').slice(1).join(' ')
      let otheruser = message.guild.member(message.mentions.users.first())
      var useravatarlengthtooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Avatar Help')
        .setDescription('You must provide a mentioned user')
        .addField(data.prefix + 'avatar <@user>','<@user> =  Mentioned User')
        .setFooter(embedfooter)
      var avatarmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Avatar Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        .setFooter(embedfooter)
      var avatarnomenembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Avatar of ' + message.author.username)
        .setImage(message.author.displayAvatarURL)
        .setAuthor(message.author.username ,message.author.displayAvatarURL)
        .setFooter(embedfooter)

      if(useravatar.length < 1) return message.channel.send({embed: avatarnomenembed})

        var avatarouembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle(' ')
          .setImage(message.mentions.users.first().displayAvatarURL)
          .setAuthor(message.author.username ,message.author.displayAvatarURL)
          .setFooter(embedfooter)
          message.channel.send({embed: avatarouembed}).catch(console.error);

          if(modlog) return modlog.send({embed: avatarmlembed}).catch(console.error);
          break;
      case "time":
      let momenttime = moment().format('h:mm:ss a')
        var timeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('The time is (EDT)')
          .setDescription(momenttime)
          .setFooter(embedfooter)
            message.channel.send({embed: timeembed})
            var timemlembed = new Discord.RichEmbed()
              .setColor('FFCE00')
              .setTitle('Time Command Used')
              .setDescription(message.author.username)
              .setAuthor(message.author.username ,message.author.avatarURL)
              .setFooter(embedfooter)

            var modlog = message.guild.channels.find('name', 'mod-log');
            if(modlog) return modlog.send({embed: timemlembed}).catch(console.error);
          break;
      case "pause":
          message.channel.send('I do not support pausing at this time :(')
          var pausemlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Pause Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)

          var modlog = message.guild.channels.find('name', 'mod-log');
          if(modlog) return modlog.send({embed: pausemlembed}).catch(console.error);
          break;
      case "stop":
        var voiceChannel = message.member.voiceChannel;
          if(!voiceChannel) return message.channel.send('You must be in a voice channel').catch(console.error);
          voiceChannel.leave()
          message.channel.send(':octagonal_sign: ').catch(console.error);
          var stopmlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Stop Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)

          var modlog = message.guild.channels.find('name', 'mod-log');
          if(modlog) return modlog.send({embed: stopmlembed}).catch(console.error);
          break;
      case "end":
      var voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send('You must be in a voice channel').catch(console.error);
        voiceChannel.leave()
        message.channel.send(':wave:').catch(console.error);
        var endmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('End Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)

        var modlog = message.guild.channels.find('name', 'mod-log');
        if(modlog) modlog.send({embed: endmlembed}).catch(console.error);
          break;
      case "queue":
      message.channel.send('`Sorry, but I do not support queues at this time.`').catch(console.error);
      var queuemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Queue Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      var modlog = message.guild.channels.find('name', 'mod-log');
      if(modlog) return modlog.send({embed: queuemlembed}).catch(console.error);
      break;
      case "skip":
      message.channel.send('`Sorry, but I do not support skipping at this time.`').catch(console.error);
      var skipmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Skip Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)

      var modlog = message.guild.channels.find('name', 'mod-log');
      if(modlog) return modlog.send({embed: skipmlembed}).catch(console.error);
      break;

    case "math":
    var mathmlerrembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Math Command Used by Non-Owner')
      .setDescription(message.author.username)
      .setFooter(embedfooter)
    var mathmlembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Math Command Used by Owner')
      .setDescription(message.author.username)
      .addField(mathequation, '_')
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
      var modlog = message.guild.channels.find('name', 'mod-log');

      var data = require(`./data/brain/data.json`)
      if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Command**`).catch(console.error) && modlog.send({embed: mathmlerrembed}).catch(console.error);


      let equation = message.content.split(' ').slice(1).join(' ')
      let mathequation = math.eval(equation)
      message.channel.send(mathequation).catch(console.error)
      if(modlog) return modlog.send(mathmlembed)

      break;
    case "pi":
    var value = eval("Math.PI");
    message.channel.send(value).catch(console.error);
    message.delete()
    var pimlembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Pi Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
      var modlog = message.guild.channels.find('name', 'mod-log');
      if(modlog) return modlog.send({embed: pimlembed}).catch(console.error);
    break;
    case "jsexec":
    var data = require('./data/brain/data.json')
    var wronguserembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('**Owner Only Command**')
      .setDescription('*This command is exclusive to the owner of this bot*')
      .setFooter(embedfooter)
    var jsexecmlerrembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('JSExec Command Used by Non-Owner')
      .setDescription(message.author.username)
      .setFooter(embedfooter)

    var jsexecmlembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('JSExec Command Used by Owner')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)

      var modlog = message.guild.channels.find('name', 'mod-log');


    if (message.author.id !== data.ownerid) {
      message.channel.send({embed: wronguserembed}).catch(console.error)
      if(modlog) {
        modlog.send({embed: jsexecmlerrembed}).catch(console.error);
      }
    }
    var execute = eval(message.content.split(' ').slice(1).join(' '))
    let something2execute = message.content.split(' ').slice(1).join(' ')
    var noevalembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('JS Exec Usage')
      .setDescription("Please provide something to evaluate")
      .addField(data.prefix + 'jsexec <evaluation>','<evaluation> = Something to evaluate.')
      .setFooter(embedfooter)


    if (something2execute.length < 1) return message.channel.send({embed: noevalembed}).catch(console.error);


    var jsembed = new Discord.RichEmbed()
     .setColor("FFCE00")
     .setTitle("JS Execution")
      .addField(':inbox_tray:','**Input**')
     .addField(something2execute, '↓')
    .addField(':outbox_tray:','**Output**')
    .addField(execute, '∎')
    .setFooter(embedfooter)
        message.channel.send({embed: jsembed}).catch(console.error);
        if(modlog) return modlog.send({embed: jsexecmlembed}).catch(console.error);

      break;
    case "setnick":
    var permerrorsnembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Set Nick Usage')
      .setDescription('You must have the permissions `CHANGE_NICKNAME` and `MANAGE_NICKNAMES`')
      .setFooter(embedfooter)
    var permboterrorsnembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Set Nick Usage')
      .setDescription('I music have the permissions `CHANGE_NICKNAME` and `MANAGE_NICKNAMES`')
      .setFooter(embedfooter)
    if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send({embed: permerrorsnembed}).catch(console.error);
    if(!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send({embed: permboterrorsnembed}).catch(console.error);
    let nickuserset = message.guild.member(message.mentions.users.first())
    let usernick = message.content.split(/\s+/g).slice(2).join(" ")

    var data = require("./data/brain/data.json")
    var nickembed = new Discord.RichEmbed()
      .setTitle('Nickname Usage')
      .setColor('FFCE00')
      .setDescription('You must provide a nickname and a user *or bot* to set a nickname for.')
      .addField(data.prefix + 'setnick <@user> <nick>','<@user> = Mentioned user | <nick> = Nickname')
      .setFooter(embedfooter)
    var nickmlembed = new Discord.RichEmbed()
      .setTitle('Nickname Command Used')
      .setColor('FFCE00')
      .setDescription(message.author.username + '\n \n **User:** ' + nickuserset + '\n **Nick:** ' + usernick)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)

      var modlog = message.guild.channels.find('name', 'mod-log');


    if(nickuserset < 1) return message.channel.send({embed: nickembed}).catch(console.error);
    if(usernick < 1) return message.channel.send({embed: nickembed}).catch(console.error);
        message.guild.member(nickuserset).setNickname(usernick).catch(console.error);
        message.delete()
        message.channel.send('Check ' + nickuserset + '\'s nick/username to see if the results match ' + usernick).catch(console.error);
        if(modlog) return modlog.send({embed: nickmlembed}).catch(console.error);

    break;
    case "setstatus":
    var setstatusmlerrembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Set Status Command Used by Non-Owner')
      .setDescription(message.author.username)
      .setFooter(embedfooter)
      .setAuthor(message.author.username ,message.author.avatarURL)
    var modlog = message.guild.channels.find('name', 'mod-log');
      var data = require("./data/brain/data.json");{
        if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Command**`).catch(console.error);
  }
      let status = message.content.split(' ').slice(1).join(' ')
      var statustooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Set Status Help')
        .setDescription('You must set the status to `dnd` `online` `idle` or `invisible`')
        .addField(data.prefix + 'setstatus <status>','<status> = `dnd` `online` `idle` or `invisible`')
        .setFooter(embedfooter)
      var statustoolongembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Set Status Help')
        .setDescription('You must set the status to `dnd` `online` `idle` or `invisible`')
        .addField(data.prefix + 'setstatus <status>','<status> = `dnd` `online` `idle` or `invisible`')
        .setFooter(embedfooter)
      var setstatusmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Set Status Command Used by Owner')
        .setDescription(message.author.username)
        .addField(status, '_')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
    var statussuccessembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Status Successfully Changed')
      .setDescription('**Status:** ' + status)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
      client.user.setStatus(status)
      message.channel.send({embed: statussuccessembed})
      if(modlog) return modlog.send({embed: setstatusmlembed}).catch(console.error);
      break;
    case "setgame":
    var data = require("./data/brain/data.json");
    var game = require("./data/brain/game.json");
    var modlog = message.guild.channels.find('name', 'mod-log');
    let playgame = message.content.split(' ').slice(1).join(' ')
    if (message.author.id !== data.ownerid) return message.channel.send(`**Owner Only Command**`)

    var setgamemlerrembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Set Game Command Used by Non-Owner')
      .setDescription(message.author.username)
      .setFooter(embedfooter)
    var gameembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setDescription('You must provide a status *or game* for ' + data.name)
      .addField(data.prefix + 'setgame <game>','<game> = Can be anything really')
      .setFooter(embedfooter)
      var setgamemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Set Game Command Used by Owner')
        .setDescription(game.game + ' | ' + data.prefix + 'help')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
    if(playgame.length < 1) return message.channel.send({embed: gameembed}).catch(console.error);

    game.game = playgame

  fs.writeFile("./data/brain/game.json", JSON.stringify(game), (err) => console.error)
          message.delete()
          message.channel.send('Set Game Status to `' + game.game + ' | ' + data.prefix + 'help`').catch(console.error);
        if(modlog) return modlog.send({embed: setgamemlembed}).catch(console.error);
        client.user.setGame(game.game + ' | ' + data.prefix + 'help')
      break;

    case "website":
    var modlog = message.guild.channels.find('name', 'mod-log');
    var data = require("./data/brain/data.json");
      var websiteembed = new Discord.RichEmbed()
        .setColor('FFCE00')
          .setTitle(data.name + ' Website')
            .setURL('https://skydevpage.weebly.com/sunset.html')
            .setFooter(embedfooter)
          message.channel.send({embed: websiteembed}).catch(console.error);
        var webistemlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Website Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: websitemlembed}).catch(console.error);

        break;
    case "devpage":
    var modlog = message.guild.channels.find('name', 'mod-log');
      var devpageembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('TheHacker894 Dev Page')
        .setURL('https://skydevpage.weebly.com/')
        .setFooter(embedfooter)
        message.channel.send({embed: devpageembed}).catch(console.error);
      var devpagemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Dev Page Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: devpagemlembed}).catch(console.error);
        break;
          case "uptime":
          var modlog = message.guild.channels.find('name', 'mod-log');
          var data = require("./data/brain/data.json");
        let seconds = client.uptime / 1000 + ' seconds'
        let minutes = client.uptime / 60000 + ' minutes'
        let hours = client.uptime / 3600000 + ' hours'
        let days = client.uptime / 86400000 + ' days'
        let uptimeformat = message.content.split(' ').slice(1).join(' ')

        var uptimeembed = new Discord.RichEmbed()
        .setColor(`FFCE00`)
        .setTitle(data.name + ' Uptime')
        .setDescription('Uptime: ' + prettyMs(client.uptime, {verbose: true}))
        .setFooter(embedfooter)
        var uptimemlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Uptime Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
        if(uptimeformat.length < 1) return message.channel.send({embed: uptimeembed})
        if(modlog) return modlog.send(uptimemlembed)
        break;
        case "unixtimestamp":
          message.channel.send(Date.now() / 1000 + ' seconds').catch(console.error);
          var modlog = message.guild.channels.find('name', 'mod-log');
          var unixtsmlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Unix TimeStamp Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: unixtsmlembed}).catch(console.error);
          break;
      case "serverinfo":
        var serverinfembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Server Info')
        .addField('Server Name', message.guild.name + ' | ' + message.guild.id, true)
        .addField('Server Region', message.guild.region, true)
        .addBlankField(false)
        .addField('Member Count', message.guild.memberCount, true)
        .addField('Channel Count', message.guild.channels.size, true)
        .addBlankField(false)
        .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size, true)
        .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `, true)
        .addBlankField(false)
        .setFooter(embedfooter)

        message.channel.send({embed: serverinfembed}).catch(console.error);
        var modlog = message.guild.channels.find('name', 'mod-log');
        var serverinfmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Server Info Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: serverinfmlembed}).catch(console.error);
        break;
      case "membercount":
      var mcembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Member Count')
      .addField('Member Count', message.guild.memberCount)
      .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
      .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
      .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
      .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `)
      .setFooter(embedfooter)
      message.channel.send({embed: mcembed}).catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var mcmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Member Count Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: mcmlembed}).catch(console.error);
        break;
      case "members":
      var membersembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Member Count')
      .addField('Member Count', message.guild.memberCount)
      .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
      .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
      .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
      .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `)
      .setFooter(embedfooter)
      message.channel.send({embed: membersembed}).catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var membersmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Members Comamnd Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      if(modlog) modlog.send({embed: membersmlembed}).catch(console.error);
      break;
      case "warn":
      var data = require("./data/brain/data.json");
      var warnembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must supply a reason and a mentioned user.')
        .addField(data.prefix + 'warn <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for warn')
        .setFooter(embedfooter)


      let reason = message.content.split(/\s+/g).slice(2).join(" ");
      let usertowarn = message.guild.member(message.mentions.users.first());

        if(reason.length < 1) return message.channel.send({embed: warnembed}).catch(console.error);
        if(message.mentions.users.size < 1) return message.channel.send({embed: warnembed}).catch(console.error);

        var permerrorembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('Please note that this command is not finished')
        .addField('Action','Warning')
        .addField('User:', usertowarn)
        .addField('Moderator', message.author.username)
        .addField('Reason', reason)
        .setFooter(embedfooter)
        message.channel.send({embed: permerrorembed}).catch(console.error);
        var modlog = message.guild.channels.find('name', 'mod-log');
        var warnmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Warn Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          .addField(usertowarn, reason)
        if(modlog) return modlog.send({embed: warnmlembed}).catch(console.error);
        break;
      case "error-report":
      var message4hacker = message.content.split(' ').slice(1).join(' ')
      var data = require("./data/brain/data.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide an error to report')
        .addField(data.prefix + 'error-report <error>','<error> = Error to report')
        .setFooter(embedfooter)

      if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get(data.ownerid).send('A message from the user ' + message.author.username + ' has arrived.')
        client.users.get(data.ownerid).send(message4hacker)
        var modlog = message.guild.channels.find('name', 'mod-log');
        var errreprtmlembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Error Report Command Used')
          .setDescription(message.author.username)
          .addField(message4hacker, '_')
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: errreprtmlembed}).catch(console.error);
        break;
        case "ban":
        var data = require("./data/brain/data.json");
        let banmessage = message.content.split(' ').slice(1).join(' ')
        let banMember = message.guild.member(message.mentions.users.first());
          let banreason = message.content.split(/\s+/g).slice(2).join(" ");
        var embedreturn = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setDescription('You need to provide a member to ban and a reason for the ban')
          .addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')
          .setFooter(embedfooter)
        var embedpermreturn = new Discord.RichEmbed()
       .setColor("FFCE00")
       .setTitle('Ban Usage')
       .setDescription('This command will only work if you have the permission `BAN_MEMBERS`')
       .addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
       .setFooter("Version " + data.newversion + " (Ban Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.p?size=1024")
       var embedbotpermreturn = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Ban Usage')
        .setDescription('This command will only work if I have the permission `BAN_MEMBERS`')
        .addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
        .setFooter(embedfooter)
      var banusermessageembed = new Discord.RichEmbed()
        .setColor('FFCE00')
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
                .setColor('FFCE00')
                .setDescription('**A user has been banned** \n \n **User:** ' + banMember + '\n **Moderator:** ' + message.author.username + '\n **Reason:** ' + banreason + '\n **Server:** ' + message.guild.name)
                .setAuthor(message.author.username ,message.author.avatarURL)
                .setFooter(embedfooter)
                message.channel.send({embed: embedaction})
                console.log('Ban | ' + message.guild.name + ' | ' + message.author.username + ' | ' + banreason + ' | ' + banMember)
                var modlog = message.guild.channels.find('name', 'mod-log');

                var banmlembed = new Discord.RichEmbed()
                .setColor('FFCE00')
                .setDescription('**A user has been banned** \n \n **User:** ' + banMember + '\n **Moderator:** ' + message.author.username + '\n **Reason:** ' + banreason + '\n **Server:** ' + message.guild.name)
                .setAuthor(message.author.username ,message.author.avatarURL)
                .setFooter(embedfooter)
                if(modlog) {
                  modlog.send({embed: banmlembed}).catch(console.error);
                }
                if(announcements) {
                  announcements.send({embed: banmlembed}).catch(console.error);
                }

          break;
          case "kick":
          var data = require("./data/brain/data.json");
          let kickreason = message.content.split(/\s+/g).slice(2).join(" ");
          let kickMember = message.guild.member(message.mentions.users.first());
          var announcements = message.guild.channels.find('name', 'announcements');

          var embedkreturn = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setDescription('You need to provide a member to kick and a reason for the kick')
            .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
            .setFooter(embedfooter)
          var embedkpermreturn = new Discord.RichEmbed()
         .setColor("FFCE00")
         .setTitle('Kick Usage')
         .setDescription('This command will only work if you have the permission `KICK_MEMBERS`')
         .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
         .setFooter("Version " + data.newversion + " (Ban Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.p?size=1024")
         var embedbotkpermreturn = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Kick Usage')
          .setDescription('This command will only work if I have the permission `KICK_MEMBERS`')
          .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
          .setFooter(embedfooter)

            if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send({embed: embedkpermreturn}).catch(console.error);
            if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send({embed: embedbotkpermreturn}).catch(console.error);
            var newembed = new Discord.RichEmbed()
            .setColor("FFCE00")
            .setTitle('Kick Usage')
            .setDescription('You provide a member to kick and a reason')
            .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for kick')
            .setFooter("Version " + data.newversion + " (Kick Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.webp?size=1024")
            var sunsetkickembed = new Discord.RichEmbed()
              .setColor("FFCE00")
              .setTitle('Kick Usage Error')
              .setDescription('I cannot kick myself :joy:')
              .addField(data.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for kick')
              .setFooter(embedfooter)


              if(kickreason.length < 1) return message.channel.send({embed: newembed}).catch(console.error);
              if(kickMember.length < 1) return message.channel.send({embed: newembed}).catch(console.error);
              if(kickMember === `@${data.name}`) return message.channel.send({embed: sunsetkickembed})
              if(kickMember === `@${data.name}#${data.bot_discriminator}`) return message.channel.send({embed: sunsetkickembed})
              if(kickMember === `${data.bot_guild_id}`) return message.channel.send({embed: sunsetkickembed})

              var embedaction = new Discord.RichEmbed()
              .setColor('FFCE00')
              .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
              .setAuthor(message.author.username ,message.author.avatarURL)
              .setFooter(embedfooter)
              message.channel.send({embed: embedaction}).catch(console.error);
                  message.delete()
                  message.guild.member(kickMember).kick(kickreason);
                    console.log('Kick | ' + message.guild.name + ' | ' + message.author.username + ' | ' + kickreason + ' | ' + kickMember)
                    var modlog = message.guild.channels.find('name', 'mod-log');
                    var kickmlembed = new Discord.RichEmbed()
                      .setColor('FFCE00')
                      .setDescription('**A user has been Kicked** \n \n **User:** ' + kickMember + '\n **Moderator:** ' + message.author.username + ' \n **Reason:** ' + kickreason + ' \n **Server:** ' + message.guild.name)
                      .setAuthor(message.author.username ,message.author.avatarURL)
                      .setFooter(embedfooter)
                    if(modlog) {
                      modlog.send({embed: kickmlembed}).catch(console.error);
                    }
                    if(announcements) {
                      announcements.send({embed: kickmlembed}).catch(console.error);
                    }

                  break;
    case "unixtime":
      message.channel.send('The amount of ticks that have passed since 1/1/1970 on EDT is ' + Date.now())
      var modlog = message.guild.channels.find('name', 'mod-log');
      var utmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Unix Time Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: utmlembed}).catch(console.error);
    break;
    case "purge":
    var data = require("./data/brain/data.json")
    var permembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Purge Usage')
      .setDescription('You must have the permission `MANAGE_MESSAGES`')
      .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
      .setFooter(embedfooter)
    var permbotembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Purge Usage')
      .setDescription('I have have the permission `MANAGE_MESSAGES`')
      .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
      .setFooter(embedfooter)

      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send({embed: permembed}).catch(console.error);
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed: permbotembed}).catch(console.error);

      var data = require("./data/brain/data.json");
      var lengthtoosmall = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide a number of message to purge; 2 - 100')
        .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge')
        .setFooter(embedfooter)

      var lengthtoobig = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('The amount of messages to purge cannot be greater than 100')
        .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge (cannot be greater than 100)')
        .setFooter(embedfooter)

      var purgetoosmall = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('The amount of messages to purge can be as small as 2 but larger than 100')
        .addField(data.prefix + 'purge <amount>','<amount> = Messages to purge (2 - 100)')
        .setFooter(embedfooter)

      let purgearg = message.content.split(' ').slice(1).join(' ')

      if(purgearg.length < 1) return message.channel.send({embed: lengthtoosmall}).catch(console.error);
      if(purgearg.length > 100) return message.channel.send({embed: lengthtoobig}).catch(console.error);
      message.channel.send('Deleting...')
      message.delete()
      message.guild.member(message.channel.bulkDelete(purgearg))
      console.log('Purge | ' + purgearg + ' | ' + message.guild.name + ' | ' + message.author.username)
      var modlog = message.guild.channels.find('name', 'mod-log');
      var purgemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Purge Command Used')
        .setDescription(message.author.username)
        .addField(purgearg, '_')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: purgemlembed}).catch(console.error);
      break;
      case "channeldelete":
      var data = require('./data/brain/data.json')
      let channeldelreason = message.content.split(' ').slice(1).join(' ')
      var embedcdpermreturn = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Channel Delete Usage')
        .setDescription('You must have the permission `MANAGAE_CHANNELS`')
        .addField(data.prefix + 'channeldelete <reason>','<reason> = Reason for Channel Deletion')
        .setFooter(embedfooter)
      var embedbotcdpermreturn = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Channel Delete Usage')
        .setDescription('I must have the permission `MANAGE_CHANNELS`')
        .addField(data.prefix + 'channeldelete <reason>','<reason> = Reason for Channel Deletion')
        .setFooter(embedfooter)
      var chnldelrsnerrorembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Channel Delete Usage')
        .setDescription('You must provide a reason for the channel deletion')
        .addField(data.prefix + 'channeldelete <reason>','<reason> = Reason for Channel Deletion')

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedcdpermreturn}).catch(console.error);
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({embed: embedbotcdpermreturn}).catch(console.error);
        if(channeldelreason.length < 1) return message.channel.send({embed: chnldelrsnerrorembed})

        message.channel.delete()
        message.author.send('Channel has been deleted').catch(console.error);
          console.log('A channel has been deleted on ' + message.guild.name + '.')
          var modlog = message.guild.channels.find('name', 'mod-log');
          var channeldelmlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Channel Delete Command Used')
            .setDescription(message.author.username + '\n \n **Reason:** ' + channeldelreason)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: channeldelmlembed}).catch(console.error);
        break;
      case "channelcreate":
      var data = require('./data/brain/data.json')

      var embedccpermreturn = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Channel Create Usage')
        .setDescription('You must have the permission `MANAGE_CHANNELS`')
        .addField(data.prefix + 'channelcreate <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
        .setFooter(embedfooter)
      var embedbotccpermreturn = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle("Channel Create Usage")
        .setDescription('I must have the permission `MANAGE_CHANNELS`')
        .addField(data.prefix + 'channelcreate <name>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
        .setFooter(embedfooter)
      var channelcreatereasonerrorembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Channel Create Usage')
        .setDescription('You must provide a reason for the Channel Creation')
        .addField(data.prefix + 'channelcreate <name> <reason>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedccpermreturn}).catch(console.error);
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send({embed: embedbotccpermreturn}).catch(console.error);
      //  if(chnlcreatereason.length < 1) return message.channel.send({embed: channelcreatereasonerrorembed})

        var channelcembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setDescription('You must provide a name for your new channel.')
          .addField(data.prefix + 'channelcreate <name> <reason>','<name> = Name for Channel | <reason> = Reason for Channel Creation')
          .setFooter(embedfooter)
//   /\s+/g
        let channelname = message.content.split(' ').slice(1).join(' ')

        if(channelname.length < 1) return message.channel.send({embed: channelcembed}).catch(console.error);
            message.guild.createChannel(channelname).catch(console.error);

            message.channel.send('Channel ' + channelname + ' has been created ' + message.author.username + '.')
              console.log('A channel has been created on ' + message.guild.name + '.')
              var modlog = message.guild.channels.find('name', 'mod-log');
              var channelcremlembed = new Discord.RichEmbed()
                .setColor('FFCE00')
                .setTitle('Channel Create Command Used')
                .setDescription(message.author.username + '\n \n **Name:** ' + channelname)
                .setAuthor(message.author.username ,message.author.avatarURL)
                .setFooter(embedfooter)
                if(modlog) return modlog.send({embed: channelcremlembed}).catch(console.error);
                break;
      case "sourcecode":
      var data = require("./data/brain/data.json");
      var scembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle(data.name + ' Source Code')
      .setDescription('Here you can view and download the source code. Please note that the GitHub Source Code gets updated every week.')
      .setURL(data.github_project_link)
      .setFooter(embedfooter)
      message.channel.send({embed: scembed}).catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var sourcecodemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Source Code Command')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: sourcecodemlembed}).catch(console.error);
      break;
	  case "github":
    var data = require("./data/brain/data.json");
		  var gembed = new Discord.RichEmbed()
		  .setColor('FFCE00')
		  .setTitle(data.name + ' Github Page')
		  .setDescription('Here you can view the ' + data.name + ' github page.')
		  .setURL(data.github_project_link)
      .setFooter(embedfooter)
		  message.channel.send({embed: gembed})
      var modlog = message.guild.channels.find('name', 'mod-log');
      var githubmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('GitHub Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: githubmlembed}).catch(console.error);
            break;

      case "invite":
      	message.channel.send('Here is the invite to the server requested by,' + message.author.username + ".").catch(console.error);
    	var inembed = new Discord.RichEmbed()
    	.setColor('FFCE00')
    	.setTitle('Invite to HackerWorld Server')
    	.setURL('https://discord.gg/FC2F8n2')
      .setFooter(embedfooter)
    	message.channel.send({embed: inembed}).catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var invitemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Invite Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: invitemlembed}).catch(console.error);
    	break;
    case "test":
    	message.channel.send('Testing...')
    	message.channel.send('https://media.giphy.com/media/8GY3UiUjwKwhO/giphy.gif')
      var modlog = message.guild.channels.find('name', 'mod-log');
      var testmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Test Command Used')
        .setDescription(message.author.username)
        .setURL('https://media.giphy.com/media/8GY3UiUjwKwhO/giphy.gif')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: testmlembed}).catch(console.error);
    	break;
    case "botinvite":
    	var data = require("./data/brain/data.json");
    	message.channel.send("Here is an invite for " + data.name + " requested by, " + message.author.username + ".").catch(console.error);
    	var binvembed = new Discord.RichEmbed()
    	.setColor('FFCE00')
    	.setTitle(data.name + ' Invite')
    	.setURL('https://discordapp.com/oauth2/authorize?client_id='+ data.bot_client_id + '&scope=bot&permissions=' + data.permissions)
      .setFooter(embedfooter)
    	message.channel.send({embed: binvembed}).catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var botinvitemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Bot Invite Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: botinvitemlembed}).catch(console.error);
    	break;
    case "version":
  var data = require("./data/brain/data.json");
  var versioncembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Version')
    .setDescription('**Running Version** \n ' + data.newversion)
    message.channel.send({embed: versioncembed})
  var versionmlembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Version Command Used')
    .setDescription(message.author.username)
    var modlog = message.guild.channels.find('name', 'mod-log');
 if(modlog) return modlog.send({embed: versionmlembed}).catch(console.error);

  break;
  case "randomcolor":
  let color = ((1 << 24) * Math.random() | 0).toString(16);
var rhembed = new Discord.RichEmbed()
    .setTitle('Random Color')
    .setDescription(`**Hex** #${color} \n **RGB** ${convert.hex.rgb(color)} \n **LAB** ${convert.hex.lab(color)} \n **CMYK** ${convert.hex.cmyk(color)}`)
    .setColor(`#${color}`);
message.channel.send({embed: rhembed});
var rhmlembed = new Discord.RichEmbed()
  .setColor(`#${color}`)
  .setTitle('Random Color Command Used')
  .setAuthor(message.author.username, message.author.displayAvatarURL)
var modlog = message.guild.channels.find('name', 'mod-log');
if(modlog) return modlog.send({embed: rhmlembed}).catch(console.error);
break;

    case "info":
	var data = require("./data/brain/data.json");
  var announcement = require("./data/brain/announcement.json")
    let infoseconds = client.uptime / 1000 + ' seconds'
    let infominutes = client.uptime / 60000 + ' minutes'
    let infohours = client.uptime / 3600000 + ' hours'
    let infodays = client.uptime / 86400000 + ' days'
    let total = 0;
    client.guilds.map(g => total += g.memberCount)
    pusage.stat(process.pid, function (err, stat) {
      const cpuusage = parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2)
      const memusage = parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2)
  /*    var pusageembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Usage')
        .setDescription('\n CPU: ' + cpuusage + '% \n Memory: ' + memusage + 'MB')
      message.channel.send('CPU: ' + parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2) + '%')
      message.channel.send('Mem: ' + parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2) + 'MB') //those are bytes
      */
    	var infosembed = new Discord.RichEmbed()
    	.setColor("FFCE00")
    	.setTitle(data.name + ' Info')
      .setDescription('Please make sure to create a channel called #mod-log for mod-log support. \n **Sunset also logs any and all updates done to messages. Even if you delete these messages they will still percist in the logs** *(mod-log)*. **If you disagree with this it is suggested that you kick Sunset now.**')
      .addField('Announcement', announcement.announce, true)
    	.addField('Owner', data.owner + data.owner_discriminator, true)
      .addField('Host', '[Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)', true)
    	.addField('Library', '[' + data.library + '](https://discord.js.org/)', true )
      .addField('Language', '[' + data.language + '](https://nodejs.org/)', true)
      .addField('Uptime', prettyMs(client.uptime, {verbose: true}), true)
      .addField('CPU Usage', cpuusage + '%', true)
      .addField('Memory Usage', memusage + 'MB', true)
      .addField('Invite', '[Sunset Invite](https://discordapp.com/oauth2/authorize?client_id=' + data.bot_client_id + '&scope=bot&permissions=' + data.bot_permissions + ')', true)
      .addField('Server Count', client.guilds.size, true)
      .addField('Total Members Count', total, true)
      	.addField('Helpers', '@Google Drive#0831, @Bloxxer_DTC#1958, The Discord.js Discord Server', true)
    	.addField('Testers', '@Corbs#9620, @Oganesson#8844, @Google Drive#0831, @Shadow The  |「Dimensions™」#5869, @Jackalope#6413, @XomberLight#3502', true)
    	.addField('Version', data.newversion, true)
      .setThumbnail(client.user.displayAvatarURL)
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setFooter(embedfooter)


      message.channel.send({embed: infosembed}).then( () => {
        pusage.unmonitor(process.pid)
      })
      var infosmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Info Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
    //  if(infoseconds < 60000) return message.channel.send({embed: infomembed})
    //  if(infoseconds < 3600000) return message.channel.send({embed: infohembed})
    var modlog = message.guild.channels.find('name', 'mod-log');
 if(modlog) return modlog.send({embed: infosmlembed}).catch(console.error);
});
    	break;

      case "help":
      let helpcommand = message.content.split(' ').slice(1).join(' ')
      var data = require("./data/brain/data.json");
      var helpembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Commands')
        .setDescription(data.prefix + 'help <command> to get help with all commands listed here.')
        .addField('**Information**','`help` `disclaimer` `ping` `test` `info` `announcement` `uptime` `serverinfo` `membercount` `channelcount` `avatar` `profile` `whois`')
        .addField('**More Information**','`usage` `botinvite` `website` `sourcecode` `github` `version`')
        .addField('**VC**','`soundtest` `play` `skip` `pause` `queue` `end` `stop` `join` `leave`')
        .addField('**Entertainment**','`emoji` `cowthink` `cowsay` `fliptext` `figlet` `urbandictionary` `dictionary` `youtube` `google` `vote` `say` `saytts` `2ball` `8ball` `coinflip` `flip` `roll` `doubleroll`')
        .addField('**Memes**','`tableflip` `untableflip` `shrug` `bigorder`')
        .addField('**Moderation**','`ban` `unban` `kick` `purge` `channelcreate` `channeldelete` `mod-logcreate` `announcementscreate` `setnick`')
        .addField('**Other**','`randomcolor` `error-report` `devpage` `invite` `unixtime` `date` `day` `time` `importthis`')
        .addField('**WIP**','`warn`')
        .addField('**Owner Only Commands**','`jsexec` `flush` `setgame` `setstatus` `setannounce`')
        .setFooter(embedfooter)


        var helpcembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Help Help')
        .setDescription('Get a list of commands available with ' + data.name)
        .addField(data.prefix + 'help <command>','<command> = command from help')
        .setFooter(embedfooter)
        var pingembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Ping Help')
          .setDescription('Test the bot\'s ping')
          .addField(data.prefix + 'ping <text|image>','<text|image> = ')
          .setFooter(embedfooter)
        var testembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Test Help')
          .setDescription('Test Command to see if ' + data.name + ' is working')
          .addField(data.prefix + 'test','This command has no arguments')
          .setFooter(embedfooter)
        var infoembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Info Help')
          .setDescription('Gives info on ' + data.name)
          .addField(data.prefix + 'info','This command has no arguments')
          .setFooter(embedfooter)
        var uptimeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Uptime Help')
          .setDescription('Gives total Uptime of ' + data.name)
          .addField(data.prefix + 'uptime <timeformat>','<timeformat> = Seconds, Minutes, etc,...')
          .setFooter(embedfooter)
        var serverinfoembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Server Info Help')
          .setDescription('Gives info on the current server')
          .addField(data.prefix + 'severinfo','This command has no arguments')
          .setFooter(embedfooter)
        var channelcountembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Channel Count Help')
          .setDescription('Gives the number of channels on the server')
          .addField(data.prefix + 'channelcount *or* channels','This command has no arguments')
          .setFooter(embedfooter)
        var membercountembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Member Count Help')
          .setDescription('Gives the number of members on the server')
          .addField(data.prefix + 'membercount *or* members','This command has no arguments')
          .setFooter(embedfooter)
        var botinviteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Bot Invite Help')
          .setDescription('Sends an OAuth Invite for ' + data.name)
          .addField(data.prefix + 'botinvite','This command has no arguments')
          .setFooter(embedfooter)
        var websiteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Website Help')
          .setDescription('Sends a link to the ' + data.name + ' Website')
          .addField(data.prefix + 'website','This command has no arguments')
          .setFooter(embedfooter)
        var sourcecodeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Source Code Help')
          .setDescription('Sends a link to the ' + data.name + ' Source')
          .addField(data.prefix + 'sourcecode','This command has no arguments')
          .setFooter(embedfooter)
        var githubembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('GitHub Help')
          .setDescription('Sends a link the ' + data.name + ' GitHub Page')
          .addField(data.prefix + 'github','This command has no arguments')
          .setFooter(embedfooter)
        var suggestionembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Suggestion Help')
          .setDescription('Sends a link to the GitHub Issues Page')
          .addField(data.prefix + 'suggestion','This command has no arguments')
          .setFooter(embedfooter)
        var consoleissueembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('**This command has been depricated**')
          .setDescription('**Please use** `help error-report` **to learn how to use the new commands**')
          .setFooter(embedfooter)
        var sayembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle("Say Help")
          .setDescription('Say a message through ' + data.name)
          .addField(data.prefix + 'say <message>','<message> = Message to say')
          .setFooter(embedfooter)
        var sayttsembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('SayTTS Help')
          .setDescription('Say a message through ' + data.name + ' with Text To Speech')
          .addField(data.prefix + 'saytts <ttsmessage>','<ttsmessage> = TTS Message to say')
          .setFooter(embedfooter)
        var eightballembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('8Ball Help')
          .setDescription('Ask the mystical 8Ball your :fire: burnining :fire: questions')
          .addField(data.prefix + '8ball <question>','<question> = Question to ask the mystical 8Ball')
          .setFooter(embedfooter)
        var coinflipembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Coinflip Help')
          .setDescription('Flip a coin; Heads or Tails')
          .addField(data.prefix + 'flip','This command has no arguments')
          .setFooter(embedfooter)
        var rollembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('RollDice Help')
          .setDescription('Roll the die *(or dice)*')
          .addField(data.prefix + 'roll','This command has no arguments')
          .setFooter(embedfooter)
        var errorccembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Error Help')
          .setDescription('Sends an Error with the color provided')
          .addField(data.prefix + 'error <color>','<color> = Any color from the rainbow')
          .setFooter(embedfooter)
        var tableflipembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Table Flip Help')
          .setDescription('Sends a fipped table')
          .addField(data.prefix + 'tableflip','This command has no arguments')
          .setFooter(embedfooter)
        var untableflipembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('UnTable Flip Help')
          .setDescription('Sends a unflipped table')
          .addField(data.prefix + 'untableflip','This command has no arguments')
          .setFooter(embedfooter)
        var shrugembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Shrug Help')
          .setDescription('Sends a shrug')
          .addField(data.prefix + 'shrug','This command has no arguments')
          .setFooter(embedfooter)
        var notproductiveembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Not Productive Help')
            .setDescription('A summary of what you did over the summer')
            .addField(data.prefix + 'notproductive','This command has no arguments')
            .setFooter(embedfooter)
        var bigorderembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Big Order Help')
          .setDescription('Big Smokes\'s Big Order')
          .addField(data.prefix + 'bigorder','This command has no arguments')
          .setFooter(embedfooter)
        var banembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Ban Help')
          .setDescription('Bans a User')
          .addField(data.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')
          .setFooter(embedfooter)
        var unbanembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Unban Help')
          .setDescription('Unbans a User')
          .addField(data.prefix + 'unban <userid>','<userid> = User\'s guild ID')
          .setFooter(embedfooter)
        var purgeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Purge Help')
          .setDescription('Deletes up to 100 Messages')
          .addField(data.prefix + 'purge <amount>','<amount> = amount of messages to purge')
          .setFooter(embedfooter)
        var kickembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Kick Help')
          .setDescription('Kick a user')
          .addField(data.prefix + 'kick <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for Kick')
          .setFooter(embedfooter)
        var channelcreateembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Channel Create Help')
          .setDescription('Create a channel')
          .addField(data.prefix + 'channelcreate <name>','<name> = Name for Channel')
          .setFooter(embedfooter)
        var channeldeleteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Channel Delete Help')
          .setDescription('Delete a channel')
          .addField(data.prefix + 'channeldelete <reason>','<reason> = Reason for Channel Deletion')
          .setFooter(embedfooter)
        var setnickembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Set Nick Help')
          .setDescription('Set the Nickname of a user or bot *(with the correct permissions)*')
          .addField(data.prefix + 'setnick <@user> <nickname>','<@user> = @Mentioned User ! <nickname> = Nickname to set for the user or bot')
          .setFooter(embedfooter)
        var dmuserembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('**This command has been removed**')
          .setDescription('**This command has been deemed useless therefore, it was removed.**')
          .setFooter(embedfooter)
        var dmhackerembed =  new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('**This command has been depricated**')
          .setDescription('This command has been replaced by the error report commands. Please use `help error-report` to learn how to use the new command.')
          .setFooter(embedfooter)
        var devpageembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Dev Page Help')
          .setDescription('Sends a link to TheHacker894 Dev Page')
          .addField(data.prefix + 'devpage','This command has no arguments')
          .setFooter(embedfooter)
        var inviteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Invite Help')
          .setDescription('Sends an Invite Link to the HackerWorld Discord Server')
          .addField(data.prefix + 'invite','This command has no arguments')
          .setFooter(embedfooter)
        var unixtimeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Unix Time Help')
          .setDescription('Sends the amount of ticks passed since 1/1/1970 on EDT')
          .addField(data.prefix + 'unixtime','This command has no arguments')
          .setFooter(embedfooter)
        var playembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Command Help (Play)')
          .setDescription('Play some music from YouTube \n **This command has been disabled due to package issues**')
          .addField(data.prefix + 'play <youtube_video>','<youtube_video> = Video Title from Youtube')
          .setFooter(embedfooter)
        var endembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Command Help (End)')
          .setDescription('End the music that is playing *(has the same functionality as the **stop** command)')
          .addField(data.prefix + 'end','This command has no arguments')
          .setFooter(embedfooter)
        var stopembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Command Help (Stop)')
          .setDescription('Stop the music that is playing *(has the same functionality as the **end** command)')
          .addField(data.prefix + 'stop','This command has no arguments')
          .setFooter(embedfooter)
        var doublerollembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Double Roll Help')
          .setDescription('Roll two dice')
          .addField(data.prefix + 'doubleroll','This command has no arguments')
          .setFooter(embedfooter)
        var doublerolldiceembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Double Roll Dice Help')
          .setDescription('Roll two dice')
          .addField(data.prefix + 'doublerolldice','This command has no arguments')
          .setFooter(embedfooter)
        var timeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Time Help')
          .setDescription('Shows the time (EDT)')
          .addField(data.prefix + 'time','This command has no arguments')
          .setFooter(embedfooter)
        var dayembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Day Help')
          .setDescription('Shows the day')
          .addField(data.prefix + 'day','This command has no arguments')
          .setFooter(embedfooter)
        var dateembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Date Help')
          .setDescription('Shows the date (US)')
          .addField(data.prefix + 'date','This command has no arguments')
          .setFooter(embedfooter)
        var restartembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Restart Help')
          .setDescription('**Removed**')
          .addField(data.prefix + 'flush <item>','<item> = Item to flush')
          .setFooter(embedfooter)
        var jsexecembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('JSExec Help')
          .setDescription('Executes JavaScript commands with `eval()` ***Owner Only Command***')
          .addField(data.prefix + 'jsexec <execution>','<execution> = A JS command is execute')
          .setFooter(embedfooter)
        var errorreportembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Error Report Help')
          .setDescription('Sends an error report')
          .addField(data.prefix + 'error-report <error>','<error> = Error to report')
          .setFooter(embedfooter)
        var googleembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Google Help')
          .setDescription('Sends the first result of a Google Search')
          .addField(data.prefix + 'google <search>','<search> = Google Search')
          .setFooter(embedfooter)
        var relogembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Relog Help')
          .setDescription('**Removed**')
          .addField(data.prefix + 'flush <item>','<item> = Item to flush')
          .setFooter(embedfooter)
        var setgameembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Set Game Help')
          .setDescription('Sets ' + data.name + '\'s Game **Owner Only Command**')
          .addField(data.prefix + 'setgame <game>','<game> = Now Playing ---- status')
          .setFooter(embedfooter)
        var setstatusembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Set Status Help')
          .setDescription('Sets ' + data.name + '\'s Status **Owner Only Command**')
          .addField(data.prefix + `setstatus <status>`,'<status> = `dnd` `online` `idle` or `invisible`')
          .setFooter(embedfooter)
        var twoballembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('2Ball Help')
          .setDescription('Have your questions answered by a binary randomizer')
          .addField(data.prefix + '2ball <question>','<question> = Question for the 2Ball')
          .setFooter(embedfooter)
        var earrapeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Earrape Help')
          .setDescription('Will select an earrape track from a randomizer to play in VC \n **This command has been disabled due to package issues**')
          .addField(data.prefix + 'earrape','This command has no arguments')
          .setFooter(embedfooter)
        var avatarembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Avatar Help')
          .setDescription('Displays the Avatar of the @mentioned user')
          .addField(data.prefix + 'avatar <@user>','<@user> = @mentioned user')
          .setFooter(embedfooter)
        var profilecembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Profile Help')
          .setDescription('Shows information about the @mentioned user')
          .addField(data.prefix + 'profile <@user>','<@user> = @mentioned user')
          .setFooter(embedfooter)
        var whoisembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('WhoIs Help')
          .setDescription('Shows information about the @mentioned user')
          .addField(data.prefix + 'whois <@user>','<@user> = @mentioned user')
          .setFooter(embedfooter)
        var warncembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Warn Help')
          .setDescription('Warns an @mentioned user')
          .addField(data.prefix + 'warn <@user> <reason>','<@user> = @mentioned user | <reason> = Reason for warn')
          .setFooter(embedfooter)
        var youtubeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('YouTube Help')
          .setDescription('Searches for a video on YouTube *(if you would like to play this video use the* `play` *command)*')
          .addField(data.prefix + 'youtube <yt_video>','<yt_video> = Video Title from Youtube')
          .setFooter(embedfooter)
        var votehembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Vote Help')
          .setDescription('Sets up a voting poll with two reaction emojis')
          .addField(data.prefix + 'vote <reason>','<reason> = reason for vote')
          .setFooter(embedfooter)
        var announcementscreateembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Announcements Create Help')
          .setDescription("Attempts to Create an #announcements channel")
          .addField(data.prefix + 'announcementscreate','This command has no arguments')
          .setFooter(embedfooter)
        var modlogcreateembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Mod-Log Create Help')
          .setDescription('Attempts to create a #mod-log channel')
          .addField(data.prefix + 'mod-logcreate','This command has no arguments')
          .setFooter(embedfooter)
        var joinembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Join Help')
          .setDescription('Joins the current Voice Channel')
          .addField(data.prefix + 'join','This command has no arguments')
          .setFooter(embedfooter)
        var leaveembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Leave Help')
          .setDescription('Leaves the current Voice Channel')
          .addField(data.prefix + 'leave','This command has no arguments')
          .setFooter(embedfooter)
        var disclaimercembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Disclaimer Help')
          .setDescription('Sends a disclaimer regardding Sunset\'s logs')
          .addField(data.prefix + 'disclaimer','This command has no arguments')
          .setFooter(embedfooter)
        var soundtestembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Sound Test Help')
          .setDescription('Tests sound capabilities of ' + data.name + '\n **This command has been disabled due to package issues**')
          .addField(data.prefix + 'soundtest','This command has no arguments')
          .setFooter(embedfooter)
        var versionembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Version Help')
          .setDescription('Sends the version of ' + data.name)
          .addField(data.prefix + 'version','This command has no arguments')
          .setFooter(embedfooter)
        var randomcolorembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Random Color Help')
          .setDescription('Sends a random color in `Hex`, `RGB`, `LAB`, and `CMYK`')
          .addField(data.prefix + 'randomcolor','This command has no arguments')
          .setFooter(embedfooter)
        var skidhembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle("Skid Help")
          .setDescription('Sends a message for all skids out there')
          .addField(data.prefix + 'skid','This command has no arguments')
        var bruhembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Bruh Help')
          .setDescription('**bruh**')
          .addField(data.prefix + 'bruh','This command has no arguments')
        var datboiembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle("Dat Boi Help")
          .setDescription('Look at dat boi watch him roll')
          .addField(data.prefix + 'datboi','This command has no arguments')
        var dictionaryembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Dictionary Help')
          .setDescription('Searches for the dictionary definition of the suggested word.')
          .addField(data.prefix + 'dictionary <word>','<word> = Word in the English Dictionary')
        var urbandictionaryembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Urban Dictionary Help')
          .setDescription('Searchs for the urban dictionary definition of the suggested word.')
          .addField(data.prefix + 'urbandictionary <word>','<word> = Word from Urban Dictionary')
        var importthisembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Import This Help')
          .setDescription('The Zen of Python')
          .addField(data.prefix + 'importthis','This command has no arguments')
        var setannounceembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Set Announce Help')
          .setDescription('Sets announcements for the bot **Owner-Only Command**')
          .addField(data.prefix + 'setannounce <announcement>','<announcement> = Announcement for the bot')
        var announcementembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle('Announcement Help')
          .setDescription('Check the current announcement *(Can also be viewed using* `' + data.prefix + 'info`)*')
          .addField(data.prefix + 'announcement','This announcement has no arguments')
        var flushembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle("Flush Help")
          .setDescription('*Flushes* bot *things*')
          .addField(data.prefix + 'flush <item>','<item> = Item to flush')
        var figlethembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle("Figlet Help")
          .setDescription("*Figletizes* a message")
          .addField(data.prefix + 'figlet <message>','_')
        var usageembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle("Usage Help")
          .setDescription("Shows Sunset's usage")
          .addField(data.prefix + 'usage','This message has no arguments')
        var emojiembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle("Emoji Help")
          .setDescription("Emojifies your message *(if possible)*")
          .addField(data.prefix + 'emoji <message>','_')
        var fliptextembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle("Flip Text Help")
          .setDescription('Flips Text')
          .addField(data.prefix + 'fliptext <message>','_')
        var cowsayembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle("Cowsay Help")
          .setDescription("Classic Cow Say Module")
          .addField(data.prefix + 'cowsay <message>','_')
        var cowthinkembed = new Discord.RichEmbed()
          .setColor("FFCE00")
          .setTitle("Cowthink Help")
          .setDescription("Classic Cowthink Module")
          .addField(data.prefix + 'cowthink <message>','_')
          // Below this line belong to the mod-log

          var modlog = message.guild.channels.find('name', 'mod-log')

          var helpmlembed = new Discord.RichEmbed()
            .setColor("FFCE00")
            .setTitle('Help Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
          var helpmlargembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Help Command Used *(' + helpcommand + ')*')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
          var helpmlargerrembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Help Command Error *(' + helpcommand + ')*')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)


        // Above this line belongs to the mod-log


        if(helpcommand.length < 1) {
          message.channel.send({embed: helpembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `help`) {
          message.channel.send({embed: helpcembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `ping`) {
          message.channel.send({embed: pingembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `test`) {
          message.channel.send({embed: testembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `info`) {
          message.channel.send({embed: infoembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `uptime`) {
          message.channel.send({embed: uptimeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `serverinfo`) {
          message.channel.send({embed: serverinfoembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `membercount`) {
          message.channel.send({embed: membercountembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `members`) {
          message.channel.send({embed: membercountembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `channelcount`) {
          message.channel.send({embed: channelcountembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `channels`) {
          message.channel.send({embed: channelcountembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `botinvite`) {
          message.channel.send({embed: botinviteembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `website`) {
          message.channel.send({embed: websiteembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `sourcecode`) {
          message.channel.send({embed: sourcecodeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `github`) {
          message.channel.send({embed: githubembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `suggestion`) {
          message.channel.send({embed: suggestionembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `consoleissue`) {
          message.channel.send({embed: consoleissueembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `play`) {
          message.channel.send({embed: playembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `end`) {
          message.channel.send({embed: endembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `stop`) {
          message.channel.send({embed: pauseembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `queue`)  {
          message.channel.send('I do not support queues at this time.')
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `clear`) {
          message.channel.send('I do not support queues, therefore I do not support clearing queues at this time.')
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `say`) {
          message.channel.send({embed: sayembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `saytts`) {
          message.channel.send({embed: sayttsembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `8ball`) {
          message.channel.send({embed: eightballembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `coinflip`) {
          message.channel.send({embed: coinflipembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `flip`) {
        message.channel.send({embed: coinflipembed})
        if(modlog) return modlog.send({embed: helpmlargembed})
      }
        if(helpcommand === `roll`)  {
          message.channel.send({embed: rollembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `rolldice`) {
          message.channel.send({embed: rollembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `doubleroll`) {
          message.channel.send({embed: doublerollembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `doublerolldice`) {
          message.channel.send({embed: doublerolldiceembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `error`) {
          message.channel.send({embed: errorccembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `tablelfip`) {
          message.channel.send({embed: tableflipembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `untableflip`) {
          message.channel.send({embed: untableflipembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `shrug`) {
          message.channel.send({embed: shrugembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `bigorder`) {
          message.channel.send({embed: bigorderembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `ban`) {
          message.channel.send({embed: banembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `unban`) {
          message.channel.send({embed: unbanembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `purge`) {
          message.channel.send({embed: purgeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `kick`) {
          message.channel.send({embed: kickembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `channelcreate`) {
          message.channel.send({embed: channelcreateembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `channeldelete`) {
          message.channel.send({embed: channeldeleteembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `setnick`) {
          message.channel.send({embed: setnickembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `devpage`) {
          message.channel.send({embed: devpageembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `invite`) {
        message.channel.send({embed: inviteembed})
        if(modlog) return modlog.send({embed: helpmlargembed})
      }
        if(helpcommand === `unixtime`) {
          message.channel.send({embed: unixtimeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `moderation`) {
          message.channel.send({embed: moderationembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `channel`) {
          message.channel.send({embed: channelcountembed}).then(message => {
            message.channel.send({embed: channelcreateembed}).then(message => {
              message.channel.send({channeldeleteembed})
              if(modlog) return modlog.send({embed: helpmlargembed})
            })
          })
        }
        if(helpcommand === `time`) {
          message.channel.send({embed: timeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `date`) {
          message.channel.send({embed: dateembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `day`) {
          message.channel.send({embed: dayembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `jsexec`) {
          message.channel.send({embed: jsexecembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `restart`) {
          message.channel.send({embed: restartembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `error-report`) {
          message.channel.send({embed: errorreportembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `google`) {
          message.channel.send({embed: googleembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `googlesearch`) {
          message.channel.send({embed: googleembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `relog`) {
          message.channel.send({embed: relogembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `re`) {
          message.channel.send({embed: restartembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `setgame`) {
          message.channel.send({embed: setgameembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `setstatus`) {
          message.channel.send({embed: setstatusembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `set`) {
          message.channel.send({embed: setnickembed}).then(message => {
            message.channel.send({embed: setstatusembed}).then(message => {
              message.channel.send({embed: setgameembed})
              if(modlog) return modlog.send({embed: helpmlargembed})
            })
          })
        }
        if(helpcommand === `moment`) {
          message.channel.send({embed: dateembed}).then(message => {
            message.channel.send({embed: timeembed}).then(message => {
              message.channel.send({embed: dayembed})
              if(modlog) return modlog.send({embed: helpmlargembed})
            })
          })
        }
        if(helpcommand === `2ball`) {
          message.channel.send({embed: twoballembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `ball`) {
          message.channel.send({embed: eightballembed}).then( message => {
            message.channel.send({embed: twoballembed})
            if(modlog) return modlog.send({embed: helpmlargembed})
          })
        }
        if(helpcommand === `earrape`) {
          message.channel.send({embed: earrapeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `avatar`) {
          message.channel.send({embed: avatarembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `profile`) {
          message.channel.send({embed: profilecembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand ===  `whois`) {
          message.channel.send({embed: whoisembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `warn`) {
          message.channel.send({embed: warncembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `youtube`) {
          message.channel.send({embed: youtubeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `yt`) {
          message.channel.send({embed: youtubeembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `vote`) {
          message.channel.send({embed: votehembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `announcements`) {
          message.channel.send({embed: announcementscreateembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `announcementscreate`) {
          message.channel.send({embed: announcementscreateembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `mod-log`) {
          message.channel.send({embed: modlogcreateembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `modlog`) {
          message.channel.send({embed: modlogcreateembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `log`) {
          message.channel.send({embed: modlogcreateembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `join`) {
          message.channel.send({embed: joinembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `leave`) {
          message.channel.send({embed: leaveembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `disclaimer`) {
          message.channel.send({embed: disclaimercembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `soundtest`) {
          message.channel.send({embed: soundtestembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `st`) {
          message.channel.send({embed: soundtestembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `version`) {
          message.channel.send({embed: versionembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `randomcolor`) {
          message.channel.send({embed: randomcolorembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `skid`) {
          message.channel.send({embed: skidhembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `skids`) {
          message.channel.send({embed: skidhembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `bruh`) {
          message.channel.send({embed: bruhembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `datboi`) {
          message.channel.send({embed: datboiembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `dictionary`) {
          message.channel.send({embed: dictionaryembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `urbandictionary`) {
          message.channel.send({embed: urbandictionaryembed})
          if(modlog) return modlog.send({embed: helpmlgargembed})
        }
        if(helpcommand === `dict`) {
          message.channel.send({embed: urbandictionaryembed}).then(message => {
            message.channel.send({embed: dictionaryembed})
            if(modlog) return modlog.send({embed: helpmlgargembed})
          })
        }
        if(helpcommand === `importthis`) {
          message.channel.send({embed: importthisembed})
          if(modlog) return modlog.send({embed: helpmlgargembed})
        }
        if(helpcommand === `setannounce`) {
          message.channel.send({embed: setannounceembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `announcement`) {
          message.channel.send({embed: announcementembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `flush`) {
          message.channel.send({embed: flushembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `usage`) {
          message.channel.send({embed: usageembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `figlet`) {
          message.channel.send({embed: figlethembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `cowsay`) {
          message.channel.send({embed: cowsayembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `cowthink`) {
          message.channel.send({embed: cowthinkembed})
          if(modlog) return modlog.send({embed: helpmlargembed})
        }
        if(helpcommand === `emoji`) {
        message.channel.send({embed: emojiembed})
        if(modlog) return modlog.send({embed: helpmlargembed})
      }
      if(helpcommand === `fliptext`) {
      message.channel.send({embed: fliptextembed})
      if(modlog) return modlog.send({embed: helpmlargembed})
    }
      //  var helpargerrembed = new Discord.RichEmbed()
      //    .setColor('FFCE00')
      //    .setTitle('Help Error')
      //    .setDescription('That command does not exist')
      //  message.channel.send({embed: helpargerrembed})

      //  if(modlog) return modlog.send({embed: helpmlargerrembed})

        break;
        case "unban":
      var data = require('./data/brain/data.json');
        var permerrorubembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Unban Usage')
          .setDescription("You must have the permission `BAN_MEMBERS`")
          .addField(data.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
          .setFooter(embedfooter)
        var botpermerrorubembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle("Unban Usage")
          .setDescription("I must have the permission `BAN_MEMBERS`")
          .addField(data.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
          .setFooter(embedfooter)

          if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({embed: permerrorubembed}).catch(console.error);
          if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send({embed: botpermerrorubembed}).catch(console.error);
          var embedreturn = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Unban Usage')
            .setDescription('You must provide a reason for the UnBan')
              .addField(data.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
            .setFooter(embedfooter)

      let unbanMember = message.mentions.users.first();
      let unbanreason = message.content.split(/\s+/g).slice(1, 2).join(" ");
      if(unbanreason.length < 1) return message.channel.send(embedreturn).catch(console.error);
      message.guild.unban(unbanreason);
            message.delete()
            message.channel.sendMessage("The user, " + message.author.username + "has unbanned a member.");
            console.log('A user has been UNBANNED on ' + message.guild.name + '.')
            var modlog = message.guild.channels.find('name', 'mod-log');
            var unbanmlembed = new Discord.RichEmbed()
              .setColor('FFCE00')
              .setTitle('Unban Command Used')
              .setDescription(message.author.username)
              .addField(unbanMember, unbanreason)
              .setAuthor(message.author.username ,message.author.avatarURL)
              .setFooter(embedfooter)
              if(modlog) {
                modlog.send({embed: unbanmlembed}).catch(console.error);
              }
              if(announcements) {
                announcements.send({embed: unbanmlembed}).catch(console.error);
              }


          break;
          case "datboi":
          var modlog = message.guild.channels.find('name', 'mod-log');
          var datboimlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Dat Boi Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
            message.channel.send(new Attachment('./data/file/images/memes/datboi.jpg', 'datboi.jpg'));
            if(modlog) return modlog.send({embed: datboimlembed}).catch(console.error);
            break;
            case "importthis":
            var modlog = message.guild.channels.find('name', 'mod-log');
              message.channel.send({file: new Attachment('./data/file/images/memes/importthis.jpg', 'importthis.jpg')})
              var importtmlembed = new Discord.RichEmbed()
                .setColor('FFCE00')
                .setTitle('Import This Command Used')
                .setDescription(message.author.username)
                .setAuthor(message.author.username ,message.author.avatarURL)
                .setFooter(embedfooter)

                if(modlog) return modlog.send({embed: importtmlembed}).catch(console.error);
              break;
          case "re":
          var modlog = message.guild.channels.find('name', 'mod-log');
          var remlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Re Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
            message.channel.send(new Attachment('./data/file/images/memes/reeee.jpg', 'reeee.jpg'));
            if(modlog) return modlog.send({embed: remlembed}).catch(console.error);
            break;
          case "bruh":
          var modlog = message.guild.channels.find('name', 'mod-log');
          var skidsmlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Bruh Command Used')
            .setDescription(message.author.username)
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
            message.channel.send(new Attachment('./data/file/images/memes/bruh.jpg', 'bruh.jpg'));
            if(modlog) return modlog.send({embed: skidsmlembed}).catch(console.error);
            break;
          case "skid":
            //var skidsembed = new Discord.RichEmbed()
          //    .setColor("FFCE00")
          //    .setImage('https://cdn.discordapp.com/attachments/364502173955915786/379353644908150794/meme.png')
              var modlog = message.guild.channels.find('name', 'mod-log');
              var skidsmlembed = new Discord.RichEmbed()
                .setColor('FFCE00')
                .setTitle('Skid Command Used')
                .setDescription(message.author.username)
                .setAuthor(message.author.username ,message.author.avatarURL)
                .setFooter(embedfooter)
                message.channel.send(new Attachment('./data/file/images/memes/skid.png', 'skid.jpg'));
                if(modlog) return modlog.send({embed: skidsmlembed}).catch(console.error);
              break;
    case "skids":
    //var skidsembed = new Discord.RichEmbed()
  //    .setColor("FFCE00")
  //    .setImage('https://cdn.discordapp.com/attachments/364502173955915786/379353644908150794/meme.png')
      var modlog = message.guild.channels.find('name', 'mod-log');
      var skidmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Skid Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        message.channel.send(new Attachment('./data/file/images/memes/skid.png', 'skid.jpg'));
        if(modlog) return modlog.send({embed: skidmlembed}).catch(console.error);
        break;
    case "shrug":
    		message.channel.sendFile('https://media.giphy.com/media/ZeNmLY6FISq4M/giphy.gif')
        var modlog = message.guild.channels.find('name', 'mod-log');
        var shrugmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Shurg Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: shrugmlembed}).catch(console.error);
    		break;
    case "suggestion":
    var data = require("./data/brain/data.json");
    var github_project_linkembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Suggestion Command Error')
      .setDescription('You must edit the `data.json` file and put your github project link in the section titled `github_project_link`')
      .setFooter(embedfooter)

    if(data.github_project_link.length < 1) return message.channel.send({embed: github_project_linkembed}).catch(console.error);
    		message.channel.send('If you would like to submit a suggestion or concern visit the link below.')
    		message.channel.send(data.github_project_link + 'issues')
        var modlog = message.guild.channels.find('name', 'mod-log');
        var suggestionmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Suggestion Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: suggestionmlembed}).catch(console.error);
    		break;
        function rollyodice() {
          var rand = ['**1**','**2**','**3**','**4**','**5**','**6**']

        return rand[Math.floor(Math.random()*rand.length)];
      }
    function rollyodoubledice() {
      var rand = ['**2**','**3**','**4**','**5**','**6**','**7**','**8**','**9**','**10**','**11**','**12**']
      return rand[Math.floor(Math.random()*rand.length)];
    }
      case "doubleroll":
      {
        var modlog = message.guild.channels.find('name', 'mod-log');
        var doublerollmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Double Roll Command Used')
          .setDescription(message.author.username)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          .addField(rollyodoubledice(), '_')
        message.channel.send(':game_die: :game_die: **|** ' + rollyodoubledice())
        if(modlog) return modlog.send({embed: doublerollmlembed})
        break;
      }
      case "doublerolldice":
        {
          var modlog = message.guild.channels.find('name', 'mod-log');
          var doublerolldicemlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Double Roll Dice Command Used')
            .setDescription(message.author.username)
            .addField(rollyodoubledice(), '_')
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)

          message.channel.send(':game_die: :game_die: **|** ' + rollyodoubledice())
          if(modlog) return modlog.send({embed: doublerolldicemlembed})
          break;
        }
    case "roll":
    {
      var modlog = message.guild.channels.find('name', 'mod-log');
      var rollmlembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Roll Commad Used')
        .setDescription(message.author.username)
        .addField(rollyodice(), '_')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      message.channel.send(':game_die: **|** ' + rollyodice())
      if(modlog) return modlog.send({embed: rollmlembed})
      break;
    }
    case "rolldice":
    {
      var modlog = message.guild.channels.find('name', 'mod-log');
      var rolldicemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Roll Dice Command Used')
        .setDescription(message.author.username)
        .addField(rollyodice(), "_")
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)

      message.channel.send(':game_die: **|** ' + rollyodice())
      if(modlog) return modlog.send({embed: rolldicemlembed})
      break;
    }
    function do2ballVoodoo() {
      var rand = ['*Yes*','*No*','*Yes*','*No*','*Yes*','*No*','*Yes*','*No*']
      return rand[Math.floor(Math.random()*rand.length)];
    }
    case "2ball":
    {
      var data = require('./data/brain/data.json')
      var questionembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide a question to ask')
        .addField(data.prefix + '2ball <question>','<question> = Question for the 2Ball')
        .setFooter(embedfooter)
        let question = message.content.split(' ').slice(1).join(' ')
        if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
        console.log(message.guild.name + ' | ' + embedfooter + ' | ' + question + ' | ' + do2ballVoodoo());
        message.channel.send(':two: :basketball: ' + do2ballVoodoo());
        var modlog = message.guild.channels.find('name', 'mod-log');
        var twoballmlembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('2Ball Command Used')
          .setDescription(message.author.username)
          .addField(question, do2ballVoodoo)
          .setAuthor(message.author.username ,message.author.avatarURL)
          .setFooter(embedfooter)
          if(modlog) return modlog.send({embed: twoballmlembed}).catch(console.error);
     		break;
      }

    function doMagic8BallVoodoo() {
    var rand = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*'];

    return rand[Math.floor(Math.random()*rand.length)];
}


	case "8ball":
{
    var data = require('./data/brain/data.json')
    var questionembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setDescription('You must provide a question to ask')
      .addField(data.prefix + '8ball <question>','<question> = Question for the 8Ball')
      .setFooter(embedfooter)

    let question = message.content.split(' ').slice(1).join(' ')
    if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
    console.log(message.guild.name + ' | ' + embedfooter + ' | ' + question + ' | ' + doMagic8BallVoodoo());
    message.channel.send(':8ball: ' + doMagic8BallVoodoo());
    var modlog = message.guild.channels.find('name', 'mod-log');
    var eightballmlembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('8Ball Command Used')
      .setDescription(message.author.username)
      .addField(question, doMagic8BallVoodoo)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: eightballmlembed}).catch(console.error);
 		break;
}
	function coinflipping() {
	var rand = ['Heads!', 'Tails!', 'Heads!', 'Tails!','Heads!', 'Tails!','Heads!', 'Tails!',]
	return rand[Math.floor(Math.random()*rand.length)];
}

// Later in the code:
	case "coinflip":
{
  var modlog = message.guild.channels.find('name', 'mod-log');
  var coinflipmlembed = new Discord.RichEmbed()
    .setColor("FFCE00")
    .setTitle('CoinFlip Command Used')
    .setDescription(message.author.username)
    .addField(coinflipping(), "_")
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
    message.channel.send('We have, ' + coinflipping());
    if(modlog) return modlog.send({embed: coinflipmlembed}).catch(console.error);
 		break;
}
  case "flip":
{
  var modlog = message.guild.channels.find('name', 'mod-log');
  var flipmlembed = new Discord.RichEmbed()
    .setColor("FFCE00")
    .setTitle('Flip Command Used')
    .setDescription(message.author.username)
    .addField(coinflipping())
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
  message.channel.send('We have, ' + coinflipping());
  if(modlog) return modlog.send({embed: flipmlembed}).catch(console.error);
  break;
}

  case "cowthink":
  let ctmsg = message.content.split(' ').slice(1).join(' ')
  var cowsayerrembed = new Discord.RichEmbed()
    .setColor("FFCE00")
    .setTitle("Cowthink Usage Error")
    .setDescription('You must provide something for the cow to think')
  if(ctmsg.length < 1) return message.channel.send({embed: cowsayerrembed})
    message.channel.send('```' + cowsay.think({text: ctmsg, e: "oO", T: "U"}) + '```')
    var modlog = message.guild.channels.find('name', 'mod-log');
    var cowthinkmlembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Cowthink Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: cowthinkmlembed}).catch(console.error);
    break;
    case "cowsay":
    let csmsg = message.content.split(' ').slice(1).join(' ')
    var cowsayerrembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle("Cowsay Usage Error")
      .setDescription('You must provide something for the cow to say')
    if(csmsg.length < 1) return message.channel.send({embed: cowsayerrembed})
      message.channel.send('```' + cowsay.say({text: csmsg, e: "oO", T: "U"}) + '```')
      var modlog = message.guild.channels.find('name', 'mod-log');
      var cowsaymlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Cowsay Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: cowsaymlembed}).catch(console.error);
      break;
  case "fliptext":
  let flipmsg = message.content.split(' ').slice(1).join(' ')
  var fliperrembed = new Discord.RichEmbed()
    .setColor("FFCE00")
    .setTitle("Flip Usage Error")
    .setDescription('You must provide some text to flip')
  if(flipmsg.length < 1) return message.channel.send({embed: fliperrembed})
  message.channel.send('```' + flip(flipmsg) + '```')
  var modlog = message.guild.channels.find('name', 'mod-log');
  var fliptextmlembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Fliptext Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: fliptextmlembed}).catch(console.error);
    break;
  case "emoji":
  translate = require('moji-translate');
  let emsg = message.content.split(' ').slice(1).join(' ')
  var emojierrembed = new Discord.RichEmbed()
    .setColor("FFCE00")
    .setTitle("Emoji Usage Error")
    .setDescription('You must provide something to emojify')
  if(emsg.length < 1) return message.channel.send({embed: emojierrembed})
  message.channel.send(translate.translate(emsg));
  var modlog = message.guild.channels.find('name', 'mod-log');
  var emojimlembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Emoji Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: emojimlembed}).catch(console.error);
  break;

case "figlet":
let fmsg = message.content.split(' ').slice(1).join(' ')
var figletembed = new Discord.RichEmbed()
  .setColor('FFCE00')
  .setTitle("Figlet Usage")
  .setDescription("You must provide something to *figletize*")
if(fmsg.length < 1) return message.channel.send({embed: figletembed})
  figlet(fmsg, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  message.channel.send('```' + data + '```')
  var modlog = message.guild.channels.find('name', 'mod-log');
  var figletmlembed = new Discord.RichEmbed()
    .setColor('FFCE00')
    .setTitle('Figlet Command Used')
    .setDescription(message.author.username)
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: figletmlembed}).catch(console.error);
  });
break;
case "say":
var data = require("./data/brain/data.json");
var sayembed = new Discord.RichEmbed()
.setColor('FFCE00')
.setTitle('Say Usage')
.setDescription('You must provide a message to say')
.addField(data.prefix + 'say <message>','<message> = Message to say')
.setFooter(embedfooter)

let message2say = message.content.split(' ').slice(1).join(' ')
if(message2say.length < 1) return message.channel.send({embed: sayembed}).catch(console.error);
    message.channel.send(message2say).catch(console.error);
    message.delete()
    var modlog = message.guild.channels.find('name', 'mod-log');
    var saymlembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('Say Command Used')
      .setDescription(message.author.username)
      .addField(message2say, '_')
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: saymlembed}).catch(console.error);
          break;
          case "saytts":
          var data = require("./data/brain/data.json");
          var sayttsembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('SayTTS Usage')
          .setDescription('You must provide a message to say using TTS')
          .addField(data.prefix + 'saytts <messagetts>',':x')
          .setFooter(embedfooter)

          let message2saytts = message.content.split(' ').slice(1).join(' ')
          if(message2saytts < 1) return message.channel.send({embed: sayttsembed}).catch(console.error);
          message.channel.send(message2saytts, {
        tts: true
        }).catch(console.error);
          message.delete()
          var modlog = message.guild.channels.find('name', 'mod-log');
          var sayttsmlembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Say TTS Command Used')
            .setDescription(message.author.username)
            .addField(message2saytts, '_')
            .setAuthor(message.author.username ,message.author.avatarURL)
            .setFooter(embedfooter)
            if(modlog) return modlog.send({embed: sayttsmlembed}).catch(console.error);
        break;
    case "bigorder":
    	message.channel.send('I\’ll have two number 9\'s, a number 9 large, a number 6 with extra dip, a number 7, two number 4\'s, one with cheese, and a large soda.').catch(console.error);
    	message.channel.sendFile('http://pre06.deviantart.net/62e6/th/pre/f/2017/010/3/9/theorder_by_lawlsomedude-dauzlib.png').catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var bomlembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle('Big Order Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
        if(modlog) return modlog.send({embed: bomlembed}).catch(console.error);
    	break;
    case "untableflip":
      message.channel.send('┬─┬﻿ ノ( ゜-゜ノ)')
      var modlog = message.guild.channels.find('name', 'mod-log');
      var untableflipmlembed = new Discord.RichEmbed()
        .setColor("FFCE00")
        .setTitle("UnTableFlip Command Used")
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: untableflipmlembed}).catch(console.error);
      break;
    case "tableflip":
    	message.channel.send('(╯°□°）╯︵ ┻━┻ ').catch(console.error);
    	message.channel.sendFile('https://media.giphy.com/media/uKT0MWezNGewE/giphy.gif').catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var tableflipmlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('TableFlip Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: tableflipmlembed}).catch(console.error);
    	break;
    case "pause":
      message.channel.send('`Sorry, but I do not support this feature at the moment.`').catch(console.error);
      var modlog = message.guild.channels.find('name', 'mod-log');
      var pausemlembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Pause Command Used')
        .setDescription(message.author.username)
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setFooter(embedfooter)
      if(modlog) return modlog.send({embed: pausemlembed}).catch(console.error);
      break;
    case "rps":
    var data = require("./data/brain/data.json");
    function botrock() {
        var rand = ['Rock','Paper','Scissors','Paper','Scissors','Paper','Scissors','Paper','Scissors','Paper','Scissors']
        return rand[Math.floor(Math.random()*rand.length)];
        }
        function botpaper() {
            var rand = ['Rock','Paper','Scissors','Rock','Scissors','Rock','Scissors','Rock','Scissors','Rock','Scissors']
            return rand[Math.floor(Math.random()*rand.length)];
            }
            function botscissors() {
                var rand = ['Rock','Paper','Scissors','Rock','Paper','Rock','Paper','Rock','Paper','Rock','Paper']
                return rand[Math.floor(Math.random()*rand.length)];
                }
                var modlog = message.guild.channels.find('name', 'mod-log');
    var rpsmlembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('RPS Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
    var rpsmlargembed = new Discord.RichEmbed()
      .setColor("FFCE00")
      .setTitle('RPS Command Used *(' + rpsitem + ')*')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      .setFooter(embedfooter)
    var rpsitemlengtherrorembed = new Discord.RichEmbed()
      .setTitle('RPS Usage')
      .setColor('FFCE00')
      .setDescription('Please provide an item to *through*')
      .addField(data.prefix + 'rps <rock|paper|scissors>','<rock|paper|scissors> = Rock, Paper, or Scissors')
      .setFooter(embedfooter)

    let rpsitem = message.content.split(' ').slice(1).join(' ')
      if(rpsitem === "rock") return message.channel.send('I choose...').then(sent => {sent.edit(botrock())})
      if(rpsitem === "paper") return message.channel.send('I choose...').then(sent => {sent.edit(botpaper())})
      if(rpsitem === "scissors") return message.channel.send('I choose...').then(sent => {sent.edit(botscissors())})
      if(rpsitem === "scissor") return message.channel.send('I choose...').then(sent => {sent.edit(botscissors())})
      if(rpsitem === "gun") return message.channel.send('>:(').then(sent => {sent.edit(message.author.username + ' :gun:')})
      if(rpsitem.length > 1) return message.channel.send({embed: rpsitemlengtherrorembed})
      if(modlog) return modlog.send({embed: rpsmlargembed})
      break;
  }
});
client.login(data.token)
