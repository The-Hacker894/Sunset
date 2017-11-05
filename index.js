const Discord = require("discord.js");
const client = new Discord.Client();
var package = require("./package.json");
var warns = require("./warns.json")
var config = require("./config.json");
var info = require("./info.json");
const fs = require("fs");
const prefix = config.prefix
const ytdl = require("ytdl-core")
const request = require("request")
const moment = require("moment")
const cheerio = require('cheerio')
const snekfetch = require('snekfetch')
const querystring = require('querystring')
const math = require('mathjs')
const tts = require('node-google-text-to-speech')

var botjoinembed = new Discord.RichEmbed()
  .setColor('FFCE00')
  .setTitle('From ' + config.name + ' to Sunrise I\'ll be there!')
  .setDescription('**Thank you for inviting me to your server!**')
  .addField('**If you need any help you can use the** `help` **command**','┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄')

var newuserjoinembed = new Discord.RichEmbed()
  .setColor('FFCE00')
  .setTitle('Member Announcement')
  .setDescription('A new user has joined')



client.on("ready", () => {
  console.log('Logged on at ' + moment().format('h:mm:ss a') + ' on ' +  moment().format('MMMM Do YYYY'))
  console.log(`Sunset has started setting`)
//  console.log(client.guilds)
//  client.user.setGame('MAINTENANCE 11/3/2017 @ 8PM EST | ' + config.prefix + 'help')
 client.user.setGame(client.guilds.size + ' servers | ' + config.prefix + 'help')
  client.users.get('270375857384587264').send(config.name + ' has started setting')
  // console.log(message)
});
client.on("guildCreate", guild => {
  guild.owner.send({embed: botjoinembed})
    client.user.setGame(client.guilds.size + ' servers | ' + config.prefix + 'help')
});
client.on('message', msg => {
if(msg.content === 'prefix') {
    msg.channel.send("My prefix is " + config.prefix)
  }
});


client.on("message", message => {
  let args = message.content.substring(prefix.length).split(" ");
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;
  fs.readFile("./config.json", JSON.stringify(config), (err) => console.error);

  switch (args[0].toLowerCase()) {
    case "ping":
    var config = require("./config.json");
    var pingembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Ping Usage')
      .setDescription(config.prefix + 'ping text or ' + config.prefix + 'ping image')
      .addField(config.prefix + 'ping <image|text>','<image|text> = Test your ping with an image or with text')

    let pingmessage = message.content.split(' ').slice(1).join(' ')
    if(pingmessage.length < 1) return message.channel.send({embed: pingembed})
    if(pingmessage === 'text') return message.channel.send('Pinging...').then(sent => { sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)});
    if(pingmessage === 'image') return message.channel.send('Pinging...').then(sent => { sent.edit('http://madeformakers.org/wp-content/uploads/2016/01/pong.png').then(msg => { msg.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)})});
    message.delete()
    break;

    case "relog": {
      var config = require("./config.json");
      if (message.author.id !== config.ownerid) return message.channel.send(`**Owner Only Command**`);
    }
      client.destroy()
      client.login(config.token)
      break;
    case "restart": {
      // Only use this command if you have a process manager like PM2
    var config = require("./config.json");
    if (message.author.id !== config.ownerid) return message.channel.send('**Owner Only Command**');
}
    message.channel.send('Restarting.... :arrows_counterclockwise: ') && process.exit(0);

      break;
    case "vote":
      var votereason = message.content.split(' ').slice(1).join(' ')
      var voteembed = new Discord.RichEmbed()
        .setTitle('Vote')
        .setAuthor(message.author.username ,message.author.avatarURL)
        .setColor('FFCE00')
        .setDescription(votereason)
        .setFooter('Poll setup at ' + moment().format('h:mm:ss a') + ' on ' +  moment().format('MMMM Do YYYY'))
        message.channel.send({embed: voteembed})
          .then(function (message) {
            message.react('☝')
            message.react('✌️')

          });
          message.channel.send('Please note that this command is not finished.')
          break;
          case "play":
          var config = require("./config.json")
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
            .addField(config.prefix + 'play <youtube_video>','<youtube_video> = Search Term for Youtube Video')

          if(musictoplay.length < 1) return message.channel.send({embed: musiclengtherror}).catch(console.error);
      //    if(!musictoplay.indexOf(youtubeurl)) return message.channel.send(`success`)
          var voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.reply("**You must be in a voice channel.**").catch(console.error);
        voiceChannel.join()
          .then(connnection => {
            var stream = ytdl(`${ytgoogleData.q}`, { filter: 'audioonly' });
            message.channel.send(':play_pause: **Now Playing** ' + `${ytgoogleData.q}`)

            var dispatcher = connnection.playStream(stream);
            dispatcher.on('end', () => voiceChannel.leave());
            console.log('YTDL | ' + `${ytgoogleData.q}` + ' | ' + message.guild.name + ' | ' + message.author.toString())
          });
      });
        break;
    case "youtube":

    var config = require('./config.json')
    var ytsearchtooshortembed = new Discord.RichEmbed()
     .setColor('FFCE00')
      .setTitle('YouTube Search Help')
      .setDescription('You must provide something to search for')
      .addField(config.prefix + 'youtube <search>','<search> = Something to search on Youtube')
//    var ytsearchundefinedembed = new Discord.RichEmbed()
//      .setColor('FFCE00')
//     .setTitle('YouTube Search Help')
//      .setDescription('You must use a `+` symbol for your spaces *this issue will be fixed in a later update*')
//      .addField(config.prefix + 'google <search>','<search> = Something to search on Google *No space*')

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
        .addField(config.prefix + 'youtube <search>','<search> = Youtube Search Request')

      if(youtubegoogleData.q === 'undefined') return message.channel.send({embed: youtubegoogleresulterrorembed})
      var youtuberesultembed = new Discord.RichEmbed()
        .setColor('FFCE00')
       .setTitle('Here\'s what I found for')
      .setDescription(ytsimplegooglesearch)
        .addField(`${youtubegoogleData.q}`,'⠀')
        .setThumbnail('https://ih0.redbubble.net/image.25011287.7046/flat,1000x1000,075,f.u1.jpg')
        .setFooter('Youtube Search Result at ' + moment().format('h:mm:ss a') + ' on ' +  moment().format('MMMM Do YYYY'))
      message.channel.send({embed: youtuberesultembed})
      console.log(message.guild.name + " | " + message.author.toString() + ' | ' + ytsearch + ' | ' + `${youtubegoogleData.q}`)
 });
break;
    case "google":
    var config = require('./config.json')
    var googlesearchtooshortembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Google Search Help')
      .setDescription('You must provide something to search for')
      .addField(config.prefix + 'google <search>','<search> = Something to search on Google')
    var googlesearchundefinedembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Google Search Help')
      .setDescription('You must use a `+` symbol for your spaces *this issue will be fixed in a later update*')
      .addField(config.prefix + 'google <search>','<search> = Something to search on Google *No space*')

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
        .addField(config.prefix + 'google <search>','<search> = Google Search Request')

      if(googleData.q === 'undefined') return message.channel.send({embed: googleresulterrorembed})
      var googleresultembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Here\'s what I found for')
        .setDescription(googlesearch)
        .addField(`${googleData.q}`,'⠀')
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png')
        .setFooter('Google Search Result at ' + moment().format('h:mm:ss a') + ' on ' +  moment().format('MMMM Do YYYY'))
      message.channel.send({embed: googleresultembed})
      console.log(message.guild.name + " | " + message.author.toString() + ' | ' + googlesearch + ' | ' + `${googleData.q}`)
});
     break;
    case "music":
      var musichembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Music Commands')
        .addField('Commands','`play` `stop` `end`')
        message.channel.send({embed: musichembed})
      break;
      case "volume":
      message.channel.send('I do not support changing the volume at this time')
        break;
      case "earrape":
        var config = require("./config.json")
        var voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) return message.channel.send("**You must be in a voice channel.**").catch(console.error);
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
          console.log('YTDL (Earrape) | ' + earrapetoplay() + ' | ' + message.guild.name + ' | ' + message.author.toString())
        });
        break;

      case "date":
      let momentdate = moment().format('MMMM Do YYYY')
      var dateembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Today\'s date is (US)')
        .setDescription(momentdate)
        message.channel.send({embed: dateembed})
        break;
      case "day":
      let momentday = moment().format('dddd')
        var dayembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('The day is (US)')
          .setDescription(momentday)
          message.channel.send({embed: dayembed})
          break;
      case "whois":
      var config = require(`./config.json`)
      let whoisuserprofile = message.content.split(' ').slice(1).join(' ')
      let whoisotheruserprofile = message.guild.member(message.mentions.users.first())
      var whoisuserprofilelengthtooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Profile Help')
        .setDescription('You must provide a mentioned user')
        .addField(config.prefix + 'whois <@user>','<@user> =  Mentioned User')

      if(whoisuserprofile.length < 1) return message.channel.send({embed: whoisuserprofilelengthtooshortembed})
      var whoisprofileembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(`Profile`)
        .addField('Username', message.guild.member(message.mentions.users.first()))
        .addField('ID', message.guild.member(message.mentions.users.first()).id)
        .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt)
        .addField('Status', message.guild.member(message.mentions.members.first()).presence.status)
        .setThumbnail(message.mentions.users.first().displayAvatarURL)
        message.channel.send({embed: whoisprofileembed})
        break;
      case "friend":
        message.channel.send('**This command is not ready for public testing**')
        break;
      case "profile":
      var config = require(`./config.json`)
      let userprofile = message.content.split(' ').slice(1).join(' ')
      let otheruserprofile = message.guild.member(message.mentions.users.first())
      var userprofilelengthtooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Profile Help')
        .setDescription('You must provide a mentioned user')
        .addField(config.prefix + 'profile <@user>','<@user> =  Mentioned User')

      if(userprofile.length < 1) return message.channel.send({embed: userprofilelengthtooshortembed})
      var profileembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(`Profile`)
        .addField('Username', message.guild.member(message.mentions.users.first()))
        .addField('ID', message.guild.member(message.mentions.users.first()).id)
        .addField('Joined', message.guild.member(message.mentions.users.first()).joinedAt)
        .addField('Status', message.guild.member(message.mentions.members.first()).presence.status)
        .setThumbnail(message.mentions.users.first().displayAvatarURL)
        message.channel.send({embed: profileembed})
        break;
      case "avatar":
      var config = require(`./config.json`)
      let useravatar = message.content.split(' ').slice(1).join(' ')
      let otheruser = message.guild.member(message.mentions.users.first())
      var useravatarlengthtooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Avatar Help')
        .setDescription('You must provide a mentioned user')
        .addField(config.prefix + 'avatar <@user>','<@user> =  Mentioned User')

      if(useravatar.length < 1) return message.channel.send({embed: useravatarlengthtooshortembed})
        var avatarouembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle(' ')
          .setImage(message.mentions.users.first().displayAvatarURL)
          .setAuthor(moment().format('MMMM Do YYYY') + ' at ' + moment().format('h:mm:ss a'),message.author.displayAvatarURL)
          message.channel.send({embed: avatarouembed})
          break;
      case "time":
      let momenttimeedt = moment().format('h:mm:ss a')
      let momenttimepst = (moment().format('h:mm:ss a' - `2:00:00`))
      message.guild.region
        var timeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('The time is (EDT)')
          .setDescription(momenttimeedt)
            message.channel.send({embed: timeembedt})
          break;
      case "pause":
          message.channel.send('I do not support pausing at this time :(')
          break;
      case "stop":
        var voiceChannel = message.member.voiceChannel;
          if(!voiceChannel) return message.channel.send('You must be in a voice channel')
          voiceChannel.leave()
          message.channel.send(':octagonal_sign: ')
          break;
      case "end":
      var voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send('You must be in a voice channel')
        voiceChannel.leave()
        message.channel.send(':wave:')
          break;
      case "queue":
      message.channel.send('`Sorry, but I do not support queues at this time.`')

      break;
      case "skip":
      message.channel.send('`Sorry, but I do not support skipping at this time.`')

      break;

    case "math":
      var config = require(`./config.json`)
      if (message.author.id !== config.ownerid) return message.channel.send(`**Owner Only Command**`).catch(console.error);

      let equation = message.content.split(' ').slice(1).join(' ')
      let mathequation = math.eval(equation)
      message.channel.send(mathequation).catch(console.error)
      break;
    case "pi":
    var value = eval("Math.PI");
    message.channel.send(value)
    message.delete()
    break;
    case "jsexec":
    var config = require('./config.json')
    var wronguserembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('**Owner Only Command**')
      .setDescription('*This command is exclusive to the owner of this bot*')

    if (message.author.id !== config.ownerid) return message.channel.send({embed: wronguserembed}).catch(console.error);
    var execute = eval(message.content.split(' ').slice(1).join(' '))
    let something2execute = message.content.split(' ').slice(1).join(' ')
    var noevalembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('JS Exec Usage')
      .setDescription("Please provide something to evaluate")
      .addField(config.prefix + 'jsexec <evaluation>','<evaluation> = Something to evaluate.')


    if (something2execute.length < 1) return message.channel.send({embed: noevalembed}).catch(console.error);


    var jsembed = new Discord.RichEmbed()
     .setColor("FFCE00")
     .setTitle("JS Execution")
      .addField(':inbox_tray:','**Input**')
     .addField(something2execute, '↓')
    .addField(':outbox_tray:','**Output**')
    .addField(execute, '∎')
        message.channel.send({embed: jsembed})

      break;
    case "setusernick":
      var config = require("./config.json")
    var usernickerrorembed = new Discord.RichEmbed()
      .setTitle('Nickname Usage')
      .setDescription('Please use ' + config.prefix + 'setnick | This command also works for bots.')
      .addField(config.prefix + 'setnick <@user> <nick>','<@user> = User to nick for | <nick> = Nickname')
      message.channel.send({embed: usernickerrorembed})

        break;
        case "setbotnick":
          var config = require("./config.json")
        var botnickerroraembed = new Discord.RichEmbed()
          .setTitle('Nickname Usage')
          .setDescription('Please use ' + config.prefix + 'setnick | This command also works for bots.')
          .addField(config.prefix + 'setnick <@user> <nick>','<@user> = User to nick for | <nick> = Nickname')
          message.channel.send({embed: botnickerroraembed})

            break;
    case "setnick":

      let unickstaffRoleIDs = message.guild.roles.filter(r => r.name == "Owner" || r.name == 'Co-Owner' || r.name == 'Co Owner' || r.name == "Admin" || r.name == "Admins" || r.name == "Administrator" || r.name == 'Moderator' || r.name == 'Moderators' || r.name == 'Mods').map(r => r.id);
      let unickisStaff = false;
    for (const id of unickstaffRoleIDs) {
      if (message.member.roles.has(id)) {
        unickisStaff = true;
        break;
}
}
if (unickisStaff) {
  var config = require("./config.json")
  var nickembed = new Discord.RichEmbed()

    .setTitle('Nickname Usage')
    .setColor('FFCE00')
    .setDescription('You must provide a nickname and a user *or bot* to set a nickname for.')
    .addField(config.prefix + 'setnick <@user> <nick>','<@user> = Mentioned user | <nick> = Nickname')

  let nickuserset = message.guild.member(message.mentions.users.first())
  let usernick = message.content.split(/\s+/g).slice(2).join(" ")
  if(nickuserset < 1) return message.channel.send({embed: nickembed}).catch(console.error);
  if(usernick < 1) return message.channel.send({embed: nickembed}).catch(console.error);
      message.guild.member(nickuserset).setNickname(usernick)
      message.delete()
      message.channel.send('Check ' + nickuserset + '\'s nick/username to see if the results match ' + usernick)
    }
    else {
      var permerrorembed = new Discord.RichEmbed()
      var config = require("./config.json")
        .setColor('FFCE00')
        .setDescription('You must have an Adminstrative role')
        .addField(config.prefix + 'setnick <@user> <nick>','<@user> = Mentioned user | <nick> = Nickname')

      return message.channel.send({embed: permerrorembed});
    }

      break;
    case "setstatus":
      var config = require("./config.json");{
        if (message.author.id !== config.ownerid) return message.channel.send(`**Owner Only Command**`);
  }
      var statustooshortembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Set Status Help')
        .setDescription('You must set the status to `dnd` `online` `idle` or `invisible`')
        .addField(config.prefix + 'setstatus <status>','<status> = `dnd` `online` `idle` or `invisible`')
      var statustoolongembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Set Status Help')
        .setDescription('You must set the status to `dnd` `online` `idle` or `invisible`')
        .addField(config.prefix + 'setstatus <status>','<status> = `dnd` `online` `idle` or `invisible`')

      let status = message.content.split(/\s+/g).slice(2).join(" ")
    //  if (status.length < 3) return message.channel.send({embed: statustooshortembed})
    //  if(status.length > 9) return message.channel.send({embed: statustoolongembed})
      client.user.setStatus(status)
      break;
    case "setgame":
    var config = require("./config.json");{
    if (message.author.id !== config.ownerid) return message.channel.send(`**Owner Only Command**`);
  }
    var gameembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setDescription('You must provide a status *or game* for ' + config.name)
      .addField(config.prefix + 'setgame <game>','<game> = Can be anything really')

    let playgame = message.content.split(' ').slice(1).join(' ')
    if(playgame.length < 1) return message.channel.send({embed: gameembed}).catch(console.error);
        client.user.setGame(playgame)
        message.delete()
        message.channel.send('Set Game Status to ' + playgame)
      break;

    case "website":
    var config = require("./config.json");
      var websiteembed = new Discord.RichEmbed()
        .setColor('FFCE00')
          .setTitle(config.name + ' Website')
            .setURL('https://sites.google.com/view/sunset-discordbot/home')
          message.channel.send({embed: websiteembed})

        break;
    case "musicwebsite":
      var mwebsiteembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('HackerBot Music Website')
        .setURL('https://sites.google.com/view/hackerbot-music/home')
        message.channel.send({embed: mwebstieembed})
        break;
    case "devpage":
      var devpageembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('TheHacker894 Dev Page')
        .setURL('https://sites.google.com/view/thehacker-dev-page/home')
        message.channel.send({embed: devpageembed})
        break;
    case "consoleissue":
      message.channel.send('**This command has been replaced by the error report commands**')
      message.channel.send('Please use `help error-report` to learn how to use the new commands')
      break;


      case "rage":
          message.channel.send('https://giphy.com/gifs/glee-image-wiki-wvQIqJyNBOCjK')
          break;
          case "uptime":
          var config = require("./config.json");
        let seconds = client.uptime / 1000 + ' seconds'
        let minutes = client.uptime / 60000 + ' minutes'
        let hours = client.uptime / 3600000 + ' hours'
        let days = client.uptime / 86400000 + ' days'
        let uptimeformat = message.content.split(' ').slice(1).join(' ')

        var uptimeembed = new Discord.RichEmbed()
        .setColor(`FFCE00`)
        .setTitle(config.name + ' Uptime')
        .addField('Uptime Seconds', seconds)
        .addField('Uptime Minutes', minutes)
        .addField('Uptime Hours', hours)
        .addField('Uptime Days', days)

        var secondupembed = new Discord.RichEmbed()
        .setColor(`FFCE00`)
        .setTitle(config.name + ' Uptime (Seconds)')
        .addField('Uptime Seconds', seconds)

        var minuteupembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(config.name + ' Uptime (Minutes)')
        .addField('Uptime Minutes', minutes)

        var hourupembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(config.name + ' Uptime (Hours)')
        .addField('Uptime Hours', hours)

        var dayupembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle(config.name + ' Uptime (Days)')
        .addField('Uptime Days', days)
        if(uptimeformat === 'seconds') return message.channel.send({embed: secondupembed})
        if(uptimeformat === 'minutes') return message.channel.send({embed: minuteupembed})
        if(uptimeformat === 'hours') return message.channel.send({embed: hourupembed})
        if(uptimeformat === 'days') return message.channel.send({embed: dayupembed})
        if(uptimeformat.length < 1) return message.channel.send({embed: uptimeembed})


        break;
        case "unixtimestamp":
          message.channel.send(Date.now() / 1000 + ' seconds')
          break;


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

        message.channel.send({embed: serverinfembed})
        break;
      case "membercount":
      var mcembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Member Count')
      .addField('Member Count', message.guild.memberCount)
      .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
      .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
      .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
      .addField('Offline Member Count', message.guild.presences.filter(p=>p.status == 'offline').size)
      message.channel.send({embed: mcembed})
        break;
      case "members":
      var mcembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Member Count')
      .addField('Member Count', message.guild.memberCount)
      .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
      .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
      .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
      .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `)
      message.channel.send({embed: mcembed})
      break;
      case "success":
        message.channel.sendFile('https://cdn.discordapp.com/attachments/216032723851018251/346777021780590612/meme.png')

        break;
      case "warn":
      var config = require("./config.json");
      var warnembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must supply a reason and a mentioned user.')
        .addField(config.prefix + 'warn <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for warn')

      let reason = message.content.split(/\s+/g).slice(2).join(" ");
      let usertowarn = message.guild.member(message.mentions.users.first());

        if(reason.length < 1) return message.channel.send({embed: warnembed})
        if(message.mentions.users.size < 1) return message.channel.send({embed: warnembed}).catch(console.error);

        var permerrorembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('Please note that this command is not finished')
        .addField('Action','Warning')
        .addField('User:', usertowarn)
        .addField('Moderator', message.author.toString())
        .addField('Reason', reason)
        message.channel.send({embed: permerrorembed})
        break;
      case "dmhacker":
        message.channel.send('This command has been replace by the error report commands.')
        message.channel.send('Please use `help error-report` to learn about how to use the new command.')
        break;
      case "errorreport":
      var config = require("./config.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide an error to report')
        .addField(config.prefix + 'error-report <error>','<error> = Error to report')
      var message4hacker = message.content.split(' ').slice(1).join(' ')
      if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get(config.ownerid).send('An error report from the user ' + message.author.toString() + ' has arrived from the server ' + message.guild.name + '.')
        client.users.get(config.ownerid).send(message4hacker)
        console.log('Error Report | ' + message.guild.name + ' | ' + message.author.toString() + ' | ' + message4hacker)
        break;
      case "errreport":
      var config = require("./config.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide an error to report')
        .addField(config.prefix + 'error-report <error>','<error> = Error to report')
      var message4hacker = message.content.split(' ').slice(1).join(' ')
      if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get(config.ownerid).send('A message from the user ' + message.author.toString() + ' has arrived.')
        client.users.get(config.ownerid).send(message4hacker)
        break;
      case "err-report":
      var config = require("./config.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide an error to report')
        .addField(config.prefix + 'error-report <error>','<error> = Error to report')
        var message4hacker = message.content.split(' ').slice(1).join(' ')
      if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get(config.ownerid).send('A message from the user ' + message.author.toString() + ' has arrived.')
        client.users.get(config.ownerid).send(message4hacker)
        break;
      case "error-report":
      var message4hacker = message.content.split(' ').slice(1).join(' ')
      var config = require("./config.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide an error to report')
        .addField(config.prefix + 'error-report <error>','<error> = Error to report')

      if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get(config.ownerid).send('A message from the user ' + message.author.toString() + ' has arrived.')
        client.users.get(config.ownerid).send(message4hacker)
        break;
      case "ban":
		        let staffRoleIDs = message.guild.roles.filter(r => r.name == "Owner" || r.name == 'Co-Owner' || r.name == 'Co Owner' || r.name == "Admin" || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
              let isStaff = false;
            for (const id of staffRoleIDs) {
              if (message.member.roles.has(id)) {
                isStaff = true;
                break;
    }
}
    if (isStaff) {
      var config = require("./config.json");
      var embedreturn = new Discord.RichEmbe()
        .setColor('FFCE00')
        .setDescription('You need to provide a member to ban and a reason for the ban')
        .addField(config.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')

        let banMember = message.guild.member(message.mentions.users.first());
          let banreason = message.content.split(/\s+/g).slice(2).join(" ");
          if(banreason.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
          if(banMember.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
		        message.guild.member(banMember).ban(banreason);
              message.delete()
              var embedaction = new Discord.RichEmbed()
              .setColor('FFCE00')
              .addField('Action','Ban')
              .addField('User:', banMember)
              .addField('UserID for Unban', userid4unban)
              .addField('Moderator', message.author.toString())
              .addField('Reason', banreason)
              message.channel.send({embed: embedaction})
              console.log('Ban | ' + message.guild.name + ' | ' + message.author.toString() + ' | ' + banreason + ' | ' + banMember + ' | ' + userid4unban)

            } else {
              var config = require("./config.json");
              var info = require("./info.json");;
              var embedpermreturn = new Discord.RichEmbed()
             .setColor("FFCE00")
             .setTitle('Ban Usage')
             .setDescription('This command will only work if your role is named Owner or Admin.')
             .addField(config.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
             .setFooter("Version " + info.newversion + " (Ban Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.p?size=1024")

              return message.channel.send({embed: embedpermreturn})
            }

	             break;
  case "unixtime":
    message.channel.send('The amount of ticks that have passed since 1/1/1970 on EDT is ' + Date.now())
  break;
	case "kick":
		let staffRoleID = message.guild.roles.filter(r => r.name == 'Owner' || r.name == 'Co-Owner' || r.name == 'Co Owner' || r.name == 'Admin' || r.name == 'Moderator' || r.name == 'Moderators' || r.name == 'Mods' || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
let isStaffs = false;
for (const id of staffRoleID) {
    if (message.member.roles.has(id)) {
        isStaffs = true;
        break;
    }
}
if (isStaffs) {
  var config = require("./config.json");
  var info = require("./info.json");;
var newembed = new Discord.RichEmbed()
.setColor("FFCE00")
.setTitle('Kick Usage')
.setDescription('You provide a member to kick and a reason', true)
.addField(config.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for kick', true)
.setFooter("Version " + info.newversion + " (Kick Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.webp?size=1024")

  let kickMember = message.guild.member(message.mentions.users.first());
  let reason = message.content.split(/\s+/g).slice(2).join(" ");
  if(reason.length < 1) return message.channel.send({embed: newembed}).catch(console.error);
  if(kickMember.length < 1) return message.channel.send({embed: newembed}).catch(console.error);

  var embedaction = new Discord.RichEmbed()
  .setColor('FFCE00')
  .addField('Action','Kick')
  .addField('User:', kickMember)
  .addField('Moderator', message.author.toString())
  .addField('Reason', reason)
  message.channel.send({embed: embedaction})
      message.delete()
      message.guild.member(kickMember).kick(reason);{
        console.log('Kick | ' + message.guild.name + ' | ' + message.author.toString() + ' | ' + reason + ' | ' + kickMember)
      }
    }
    else {
      var config = require("./config.json");
      {
        var info = require('./info.json');
    var embedreturn = new Discord.RichEmbed()
    .setColor("FFCE00")
    .setTitle('Kick Usage')
    .setDescription('This command will only work if your role is named Owner, Admin, or Moderator')
    .addField(config.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Kick')
    .setFooter("Version " + info.newversion + " (Kick Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.webp?size=1024")
    }
      return message.channel.send({embed: embedreturn})
    }
    break;

    case "purge":
      let purgeids = message.guild.roles.filter(r => r.name == 'Owner' || r.name == 'Co-Owner' || r.name == "Co Owner" || r.name == 'Admin' || r.name == 'Moderator' || r.name == 'Moderators' || r.name == 'Mods' || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
      let isStaffspurge = false;
        for (const id of purgeids) {
          if (message.member.roles.has(id)) {
            isStaffspurge = true;
            break;
          }
        }
        if (isStaffspurge) {
          var config = require("./config.json");
          var lengthtoosmall = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setDescription('You must provide a number of message to purge; 2 - 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge')

          var lengthtoobig = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setDescription('The amount of messages to purge cannot be greater than 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge (cannot be greater than 100)')

          var purgetoosmall = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setDescription('The amount of messages to purge can be as small as 2 but larger than 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge (2 - 100)')

          let purgearg = message.content.split(' ').slice(1).join(' ')

          if(purgearg.length < 1) return message.channel.send({embed: lengthtoosmall}).catch(console.error);
          if(purgearg.length > 100) return message.channel.send({embed: lengthtoobig}).catch(console.error);
          message.channel.send('Deleting...')
          message.delete()
          message.guild.member(message.channel.bulkDelete(purgearg))
          console.log('Purge | ' + purgearg + ' | ' + message.guild.name + ' | ' + message.author.toString())
    } else {
      var config = require("./config.json");
      var permembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('Your role must be named Owner, Admin, or Co-Owner for this command')
        .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge')

      return message.channel.send({embed: permembed});
    }
    break;

      case "channeldelete":
          let staffchanneldelID = message.guild.roles.filter(r => r.name == "Owner" || r.name == 'Co-Owner' || r.name == 'Co Owner' || r.name == "Admin" || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
            let isStaffchanneldel = false;
          for (const id of staffchanneldelID) {
            if (message.member.roles.has(id)) {
              isStaffchanneldel = true;
              break;
  }
}
  if (isStaffchanneldel) {
      message.channel.delete()
      message.author.send('Channel has been deleted')
        console.log('A channel has been deleted on ' + message.guild.name + '.')
          }
          else {
            return message.reply(" You don\'t have the permissions to delete channels.");
          }
             break;
      case "channelcreate":
          let staffchannelcreateID = message.guild.roles.filter(r => r.name == "Owner" || r.name == 'Co-Owner' || r.name == 'Co Owner' || r.name == "Admin" || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
            let isStaffchannelcreate = false;
          for (const id of staffchannelcreateID) {
            if (message.member.roles.has(id)) {
              isStaffchannelcreate = true;
              break;
  }
}
  if (isStaffchannelcreate) {
    var config = require("./config.json");
    var channelcembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setDescription('You must provide a name for your new channel.')
      .addField(config.prefix + 'channelcreate <channelname>','<channelname> = Name for Channel')

    let channelname = message.content.split(' ').slice(1).join(' ')
    if(channelname.length < 1) return message.channel.send({embed: channelcembed})
        message.guild.createChannel(channelname)
        message.channel.send('Channel ' + channelname + ' has been created ' + message.author.toString() + '.')
          console.log('A channel has been created on ' + message.guild.name + '.')
        }
        else {
          var config = require("./config.json");
          var channelcelsereturnembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setDescription('You must have a role named Owner or Admin')
            .addField(config.prefix + 'channelcreate <channelname>','<channelname> = Name for Channel')

          return message.channel.send({embed: channelcelsereturnembed})
        }
        break;


      case "sonicsez":
        message.channel.send('https://www.youtube.com/watch?v=0SuTW-edU5M')
        break;
      case "lawsofrobotics":
      message.channel.send("1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.")
      message.channel.send("2. A robot must obey orders given it by human beings except where such orders would conflict with the First Law.")
      message.channel.send("3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.")
      break;
      case "rules":
          message.channel.send("1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.")
          message.channel.send("2. A robot must obey orders given it by human beings except where such orders would conflict with the First Law.")
          message.channel.send("3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.")
          break;
      case "noticeme":
      		message.channel.send("You have been noticed, " + message.author.toString() + ".")
      		break;
      case "noticemesenpai":
      		message.channel.send("You have been noticed, " + message.author.toString() + ".")
      		break;
      case "sourcecode":
      var config = require("./config.json");
      var scembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle(config.name + ' Source Code')
      .setDescription('Here you can view and download the source code. Please note that the GitHub Source Code gets updated every week.')
      .setURL(config.github_project_link)
      message.channel.send({embed: scembed})
      break;
	  case "github":
    var config = require("./config.json");
		  var gembed = new Discord.RichEmbed()
		  .setColor('FFCE00')
		  .setTitle(config.name + ' Github Page')
		  .setDescription('Here you can view the ' + config.name + ' github page.')
		  .setURL(config.github_project_link)
		  message.channel.send({embed: gembed})
            break;

      case "invite":
      	message.channel.send('Here is the invite to the server requested by,' + message.author.toString() + ".")
    	var inembed = new Discord.RichEmbed()
    	.setColor('FFCE00')
    	.setTitle('Invite to HackerWorld Server')
    	.setURL('https://discord.gg/FC2F8n2')
    	message.channel.send({embed: inembed})
    	break;
    case "kernalpanic":
    	message.channel.send('Might wanna go the Apple Genius Bar!')
    	message.channel.sendFile('http://i.imgur.com/Ev03b0i.jpg')
    	break;
    case "test":
    	message.channel.send('Testing...')
    	message.channel.send('https://media.giphy.com/media/8GY3UiUjwKwhO/giphy.gif')
    	message.author.send('Testing...')
    	message.author.send('https://media.giphy.com/media/8GY3UiUjwKwhO/giphy.gif')
    	break;
    case "botinvite":
    	var config = require("./config.json");
    	message.channel.send("Here is an invite for " + config.name + " requested by, " + message.author.toString() + ".")
    	var binvembed = new Discord.RichEmbed()
    	.setColor('FFCE00')
    	.setTitle(config.name + ' Invite')
    	.setURL('https://discordapp.com/oauth2/authorize?client_id='+ config.bot_client_id + '&scope=bot&permissions=' + config.bot_permissions)
    	message.channel.send({embed: binvembed})
    	break;
    case "info":

    var info = require("./info.json");;
	var config = require("./config.json");
    let infoseconds = client.uptime / 1000 + ' seconds'
    let infominutes = client.uptime / 60000 + ' minutes'
    let infohours = client.uptime / 3600000 + ' hours'
    let infodays = client.uptime / 86400000 + ' days'
    	var infosembed = new Discord.RichEmbed()
    	.setColor("FFCE00")
    	.setTitle(config.name + ' Info')
    	.addField('Owner', config.owner)
    	.addField('Library', info.library)
      .addField('Language', info.language)
      .addField('Description', info.description)
      .addField('Uptime', infoseconds)
      .addField('Servers', client.guilds.size)
      	.addField('Helpers', '@Google Drive#0831, @Bloxxer_DTC#1958, The Discord.js Discord Server', false)
    	.addField('Testers', '@Corbs#9620, @Oganesson#8844, @Google Drive#0831, @Shadow The  |「Dimensions™」#5869, @Jackalope#6413', false)
    	.addField('Version', info.newversion)
      .setThumbnail('https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg')
      .setFooter("Version " + info.newversion,"https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg")

      var infomembed = new Discord.RichEmbed()
    	.setColor("FFCE00")
    	.setTitle(config.name + ' Info')
    	.addField('Owner', config.owner)
    	.addField('Library', info.library)
      .addField('Language', info.language)
      .addField('Description', info.description)
      .addField('Uptime', infominutes)
      .addField('Servers', client.guilds.size)
      	.addField('Helpers', '@Google Drive#0831, @Bloxxer_DTC#1958, The Discord.js Discord Server', false)
    	.addField('Testers', '@Corbs#9620, @Oganesson#8844, @Google Drive#0831, @Shadow The  |「Dimensions™」#5869, @Jackalope#6413', false)
    	.addField('Version', info.newversion)
      .setThumbnail('https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg')
      .setFooter("Version " + info.newversion,"https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg")

      var infohembed = new Discord.RichEmbed()
    	.setColor("FFCE00")
    	.setTitle(config.name + ' Info')
    	.addField('Owner', config.owner)
    	.addField('Library', info.library)
      .addField('Language', info.language)
      .addField('Description', info.description)
      .addField('Uptime', infohours)
      .addField('Servers', client.guilds.size)
      	.addField('Helpers', '@Google Drive#0831, @Bloxxer_DTC#1958, The Discord.js Discord Server', false)
    	.addField('Testers', '@Corbs#9620, @Oganesson#8844, @Google Drive#0831, @Shadow The  |「Dimensions™」#5869, @Jackalope#6413', false)
    	.addField('Version', info.newversion)
      .setThumbnail('https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg')
      .setFooter("Version " + info.newversion,"https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg")

      var infodembed = new Discord.RichEmbed()
    	.setColor("FFCE00")
    	.setTitle(config.name + ' Info')
    	.addField('Owner', config.owner)
    	.addField('Library', info.library)
      .addField('Language', info.language)
      .addField('Description', info.description)
      .addField('Uptime', infodays)
      .addField('Servers', client.guilds.size)
      	.addField('Helpers', '@Google Drive#0831, @Bloxxer_DTC#1958, The Discord.js Discord Server', false)
    	.addField('Testers', '@Corbs#9620, @Oganesson#8844, @Google Drive#0831, @Shadow The  |「Dimensions™」#5869, @Jackalope#6413', false)
    	.addField('Version', info.newversion)
      .setThumbnail('https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg')
      .setFooter("Version " + info.newversion,"https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg")

      message.channel.send({embed: infosembed})
    //  if(infoseconds < 60000) return message.channel.send({embed: infomembed})
    //  if(infoseconds < 3600000) return message.channel.send({embed: infohembed})

    	break;
      case "help":
      let helpcommand = message.content.split(' ').slice(1).join(' ')
      var info = require("./info.json");
      var config = require("./config.json");
      var helpembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Commands')
        .setDescription(config.prefix + 'help <command> to get help with all commands listed here.')
        .addField('**Information**','`help` `ping` `test` `info` `uptime` `serverinfo` `membercount` `channelcount` `avatar` `profile` `whois`')
        .addField('**Bot Information**','`botinvite` `website` `musicwebsite` `sourcecode` `github` `suggestion`')
        .addField('**Music**','`play` `skip` `pause` `queue` `end` `stop`')
        .addField('**Entertainment**','`youtube` `google` `earrape` `say` `saytts` `2ball` `8ball` `coinflip` `flip` `roll` `doubleroll`')
        .addField('**Memes**','`rage` `error` `tableflip` `untableflip` `shrug` `notproductive` `bigorder`')
        .addField('**Moderation**','`ban` `unban` `kick` `purge` `channelcreate` `channeldelete` `setnick`')
        .addField('**Other**','`error-report` `devpage` `invite` `unixtime` `date` `day` `time`')
        .addField('**WIP**','`warn` `vote` `friend`')
        .addField('**Owner Only Commands**','`jsexec` `restart` `relog` `setgame` `setstatus`')
        .setFooter(moment().format('MMMM Do YYYY, h:mm:ss a'))


        var helpcembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Help Help')
        .setDescription('Get a list of commands available with ' + config.name)
        .addField(config.prefix + 'help <command>','<command> = command from help')
        var pingembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Ping Help')
          .setDescription('Test the bot\'s ping')
          .addField(config.prefix + 'ping <text|image>','<text|image> = ')
        var testembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Test Help')
          .setDescription('Test Command to see if ' + config.name + ' is working')
          .addField(config.prefix + 'test','This command has no arguments')
        var infoembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Info Help')
          .setDescription('Gives info on ' + config.name)
          .addField(config.prefix + 'info','This command has no arguments')
        var uptimeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Uptime Help')
          .setDescription('Gives total Uptime of ' + config.name)
          .addField(config.prefix + 'uptime <timeformat>','<timeformat> = Seconds, Minutes, etc,...')
        var serverinfoembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Server Info Help')
          .setDescription('Gives info on the current server')
          .addField(config.prefix + 'severinfo','This command has no arguments')
        var channelcountembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Channel Count Help')
          .setDescription('Gives the number of channels on the server')
          .addField(config.prefix + 'channelcount *or* channels','This command has no arguments')
        var membercountembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Member Count Help')
          .setDescription('Gives the number of members on the server')
          .addField(config.prefix + 'membercount *or* members','This command has no arguments')
        var botinviteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Bot Invite Help')
          .setDescription('Sends an OAuth Invite for ' + config.name)
          .addField(config.prefix + 'botinvite','This command has no arguments')
        var websiteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Website Help')
          .setDescription('Sends a link to the ' + config.name + ' Website')
          .addField(config.prefix + 'website','This command has no arguments')
        var musicwebsiteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Website Help')
          .setDescription('Sends a link to the ' + config.name + ' Music Website')
          .addField(config.prefix + 'musicwebsite','This command has no arguments')
        var sourcecodeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Source Code Help')
          .setDescription('Sends a link to the ' + config.name + ' Source')
          .addField(config.prefix + 'sourcecode','This command has no arguments')
        var githubembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('GitHub Help')
          .setDescription('Sends a link the ' + config.name + ' GitHub Page')
          .addField(config.prefix + 'github','This command has no arguments')
        var suggestionembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Suggestion Help')
          .setDescription('Sends a link to the GitHub Issues Page')
          .addField(config.prefix + 'suggestion','This command has no arguments')
        var consoleissueembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('**This command has been depricated**')
          .setDescription('**Please use** `help error-report` **to learn how to use the new commands**')
        var sayembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle("Say Help")
          .setDescription('Say a message through ' + config.name)
          .addField(config.prefix + 'say <message>','<message> = Message to say')
        var sayttsembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('SayTTS Help')
          .setDescription('Say a message through ' + config.name + ' with Text To Speech')
          .addField(config.prefix + 'saytts <ttsmessage>','<ttsmessage> = TTS Message to say')
        var eightballembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('8Ball Help')
          .setDescription('Ask the mystical 8Ball your :fire: burnining :fire: questions')
          .addField(config.prefix + '8ball <question>','<question> = Question to ask the mystical 8Ball')
        var coinflipembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Coinflip Help')
          .setDescription('Flip a coin; Heads or Tails')
          .addField(config.prefix + 'flip','This command has no arguments')
        var rollembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('RollDice Help')
          .setDescription('Roll the die *(or dice)*')
          .addField(config.prefix + 'roll','This command has no arguments')
        var rageembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Rage Help')
          .setDescription('Sends a Rage GIF')
          .addField(config.prefix + 'rage','This command has no agruments')
        var errorccembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Error Help')
          .setDescription('Sends an Error with the color provided')
          .addField(config.prefix + 'error <color>','<color> = Any color from the rainbow')
        var tableflipembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Table Flip Help')
          .setDescription('Sends a fipped table')
          .addField(config.prefix + 'tableflip','This command has no arguments')
        var untableflipembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('UnTable Flip Help')
          .setDescription('Sends a unflipped table')
          .addField(config.prefix + 'untableflip','This command has no arguments')
        var shrugembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Shrug Help')
          .setDescription('Sends a shrug')
          .addField(config.prefix + 'shrug','This command has no arguments')
        var notproductiveembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Not Productive Help')
            .setDescription('A summary of what you did over the summer')
            .addField(config.prefix + 'notproductive','This command has no arguments')
        var bigorderembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Big Order Help')
          .setDescription('Big Smokes\'s Big Order')
          .addField(config.prefix + 'bigorder','This command has no arguments')
        var banembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Ban Help')
          .setDescription('Bans a User')
          .addField(config.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')
        var unbanembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Unban Help')
          .setDescription('Unbans a User')
          .addField(config.prefix + 'unban <userid>','<userid> = User\'s guild ID')
        var purgeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Purge Help')
          .setDescription('Deletes up to 100 Messages')
          .addField(config.prefix + 'purge <amount>','<amount> = amount of messages to purge')
        var kickembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Kick Help')
          .setDescription('Kick a user')
          .addField(config.prefix + 'kick <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for Kick')
        var channelcreateembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Channel Create Help')
          .setDescription('Create a channel')
          .addField(config.prefix + 'channelcreate <name>','<name> = Name for Channel Creation')
        var channeldelete = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Channel Delete Help')
          .setDescription('Delete a channel')
          .addField(config.prefix + 'channeldelete','This command has no arguments')
        var setnickembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Set Nick Help')
          .setDescription('Set the Nickname of a user or bot *(with the correct permissions)*')
          .addField(config.prefix + 'setnick <@user> <nickname>','<@user> = @Mentioned User ! <nickname> = Nickname to set for the user or bot')
        var dmuserembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('**This command has been removed**')
          .setDescription('**This command has been deemed useless therefore, it was removed.**')
        var dmhackerembed =  new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('**This command has been depricated**')
          .setDescription('This command has been replaced by the error report commands. Please use `help error-report` to learn how to use the new command.')
        var devpageembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Dev Page Help')
          .setDescription('Sends a link to TheHacker894 Dev Page')
          .addField(config.prefix + 'devpage','This command has no arguments')
        var inviteembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Invite Help')
          .setDescription('Sends an Invite Link to the HackerWorld Discord Server')
          .addField(config.prefix + 'invite','This command has no arguments')
        var unixtimeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Unix Time Help')
          .setDescription('Sends the amount of ticks passed since 1/1/1970 on EDT')
          .addField(config.prefix + 'unixtime','This command has no arguments')
        var playembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Command Help (Play)')
          .setDescription('Play some music from YouTube')
          .addField(config.prefix + 'play <youtube_video>','<youtube_video> = Video Title from Youtube')
        var endembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Command Help (End)')
          .setDescription('End the music that is playing *(has the same functionality as the **stop** command)')
          .addField(config.prefix + 'end','This command has no arguments')
        var stopembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Music Command Help (Stop)')
          .setDescription('Stop the music that is playing *(has the same functionality as the **end** command)')
          .addField(config.prefix + 'stop','This command has no arguments')
        var doublerollembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Double Roll Help')
          .setDescription('Roll two dice')
          .addField(config.prefix + 'doubleroll','This command has no arguments')
        var doublerolldiceembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Double Roll Dice Help')
          .setDescription('Roll two dice')
          .addField(config.prefix + 'doublerolldice','This command has no arguments')
        var timeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Time Help')
          .setDescription('Shows the time (EDT)')
          .addField(config.prefix + 'time','This command has no arguments')
        var dayembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Day Help')
          .setDescription('Shows the day')
          .addField(config.prefix + 'day','This command has no arguments')
        var dateembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Date Help')
          .setDescription('Shows the date (US)')
          .addField(config.prefix + 'date','This command has no arguments')
        var restartembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Restart Help')
          .setDescription('Restarts the Bot ***Owner Only Command****')
          .addField(config.prefix + 'restart','This command has no arguments')
        var jsexecembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('JSExec Help')
          .setDescription('Executes JavaScript commands with `eval()` ***Owner Only Command***')
          .addField(config.prefix + 'jsexec <execution>','<execution> = A JS command is execute')
        var errorreportembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Error Report Help')
          .setDescription('Sends an error report')
          .addField(config.prefix + 'error-report <error>','<error> = Error to report')
        var googleembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Google Help')
          .setDescription('Sends the first result of a Google Search')
          .addField(config.prefix + 'google <search>','<search> = Google Search')
        var relogembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Relog Help')
          .setDescription('Relogs the bot **Owner Only Command**')
          .addField(config.prefix + 'relog','This command has no arguments')
        var setgameembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Set Game Help')
          .setDescription('Sets ' + config.name + '\'s Game **Owner Only Command**')
          .addField(config.prefix + 'setgame <game>','<game> = Now Playing ---- status')
        var setstatusembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Set Status Help')
          .setDescription('Sets ' + config.name + '\'s Status **Owner Only Command**')
          .addField(config.prefix + `setstatus <status>`,'<status> = `dnd` `online` `idle` or `invisible`')
        var twoballembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('2Ball Help')
          .setDescription('Have your questions answered by a binary randomizer')
          .addField(config.prefix + '2ball <question>','<question> = Question for the 2Ball')
        var earrapeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Earrape Help')
          .setDescription('Will select an earrape track from a randomizer to play in VC')
          .addField(config.prefix + 'earrape','This command has no arguments')
        var avatarembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Avatar Help')
          .setDescription('Displays the Avatar of the @mentioned user')
          .addField(config.prefix + 'avatar <@user>','<@user> = @mentioned user')
        var profilecembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Profile Help')
          .setDescription('Shows information about the @mentioned user')
          .addField(config.prefix + 'profile <@user>','<@user> = @mentioned user')
        var whoisembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('WhoIs Help')
          .setDescription('Shows information about the @mentioned user')
          .addField(config.prefix + 'whois <@user>','<@user> = @mentioned user')
        var warncembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Warn Help')
          .setDescription('Warns an @mentioned user')
          .addField(config.prefix + 'warn <@user> <reason>','<@user> = @mentioned user | <reason> = Reason for warn')
        var friendembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Friend Help')
          .setDescription('Sends a friend request to the author of the message')
          .addField(config.prefix + 'friend','This command has no arguments')
        var youtubeembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('YouTube Help')
          .setDescription('Searches for a video on YouTube *(if you would like to play this video use the* `play` *command)*')
          .addField(config.prefix + 'youtube <yt_video>','<yt_video> = Video Title from Youtube')


        if(helpcommand.length < 1) return message.channel.send({embed: helpembed})
        if(helpcommand === `help`) return message.channel.send({embed: helpcembed})
        if(helpcommand === `ping`) return message.channel.send({embed: pingembed})
        if(helpcommand === `test`) return message.channel.send({embed: testembed})
        if(helpcommand === `info`) return message.channel.send({embed: infoembed})
        if(helpcommand === `uptime`) return message.channel.send({embed: uptimeembed})
        if(helpcommand === `serverinfo`) return message.channel.send({embed: serverinfoembed})
        if(helpcommand === `membercount`) return message.channel.send({embed: membercountembed})
        if(helpcommand === `members`) return message.channel.send({embed: membercountembed})
        if(helpcommand === `channelcount`) return message.channel.send({embed: channelcountembed})
        if(helpcommand === `channels`) return message.channel.send({embed: channelcountembed})
        if(helpcommand === `botinvite`) return message.channel.send({embed: botinviteembed})
        if(helpcommand === `website`) return message.channel.send({embed: websiteembed})
        if(helpcommand === `musicwebsite`) return message.channel.send({embed: musicwebsiteembed})
        if(helpcommand === `sourcecode`) return message.channel.send({embed: sourcecodeembed})
        if(helpcommand === `github`) return message.channel.send({embed: githubembed})
        if(helpcommand === `suggestion`) return message.channel.send({embed: suggestionembed})
        if(helpcommand === `consoleissue`) return message.channel.send({embed: consoleissueembed})
        if(helpcommand === `play`) return message.channel.send({embed: playembed})
        if(helpcommand === `end`) return message.channel.send({embed: endembed})
        if(helpcommand === `stop`) return message.channel.send({embed: pauseembed})
        if(helpcommand === `queue`)  return message.channel.send('I do not support queues at this time.')
        if(helpcommand === `clear`) return message.channel.send('I do not support queues, therefore I do not support clearing queues at this time.')
        if(helpcommand === `say`) return message.channel.send({embed: sayembed})
        if(helpcommand === `saytts`) return message.channel.send({embed: sayttsembed})
        if(helpcommand === `8ball`) return message.channel.send({embed: eightballembed})
        if(helpcommand === `coinflip`) return message.channel.send({embed: coinflipembed})
        if(helpcommand === `flip`) return message.channel.send({embed: coinflipembed})
        if(helpcommand === `roll`) return message.channel.send({embed: rollembed})
        if(helpcommand === `rolldice`) return message.channel.send({embed: rollembed})
        if(helpcommand === `doubleroll`) return message.channel.send({embed: doublerollembed})
        if(helpcommand === `doublerolldice`) return message.channel.send({embed: doublerolldiceembed})
        if(helpcommand === `rage`) return message.channel.send({embed: rageembed})
        if(helpcommand === `error`) return message.channel.send({embed: errorccembed})
        if(helpcommand === `tablelfip`) return message.channel.send({embed: tableflipembed})
        if(helpcommand === `untableflip`) return message.channel.send({embed: untableflipembed})
        if(helpcommand === `shrug`) return message.channel.send({embed: shrugembed})
        if(helpcommand === `notproductive`) return message.channel.send({embed: notproductiveembed})
        if(helpcommand === `bigorder`) return message.channel.send({embed: bigorderembed})
        if(helpcommand === `ban`) return message.channel.send({embed: banembed})
        if(helpcommand === `unban`) return message.channel.send({embed: unbanembed})
        if(helpcommand === `purge`) return message.channel.send({embed: purgeembed})
        if(helpcommand === `kick`) return message.channel.send({embed: kickembed})
        if(helpcommand === `channelcreate`) return message.channel.send({embed: channelcreateembed})
        if(helpcommand === `channeldelete`) return message.channel.send({embed: channeldeleteembed})
        if(helpcommand === `setnick`) return message.channel.send({embed: setnickembed})
        if(helpcommand === `dmuser`) return message.channel.send({embed: dmuserembed})
        if(helpcommand === `dmhacker`) return message.channel.send({embed: dmhackerembed})
        if(helpcommand === `devpage`) return message.channel.send({embed: devpageembed})
        if(helpcommand === `invite`) return message.channel.send({embed: inviteembed})
        if(helpcommand === `unixtime`) return message.channel.send({embed: unixtimeembed})
        if(helpcommand === `moderation`) return message.channel.send({embed: moderationembed})
        if(helpcommand === `channel`) return message.channel.send({embed: channelcountembed}) && message.channel.send({embed: channelcreateembed}) && message.channel.send({channeldeleteembed})
        if(helpcommand === `time`) return message.channel.send({embed: timeembed})
        if(helpcommand === `date`) return message.channel.send({embed: dateembed})
        if(helpcommand === `day`) return message.channel.send({embed: dayembed})
        if(helpcommand === `jsexec`) return message.channel.send({embed: jsexecembed})
        if(helpcommand === `restart`) return message.channel.send({embed: restartembed})
        if(helpcommand === `error-report`) return message.channel.send({embed: errorreportembed})
        if(helpcommand === `errorreport`) return message.channel.send({embed: errorreportembed})
        if(helpcommand === `errreport`) return message.channel.send({embed: errorreportembed})
        if(helpcommand === `err-report`) return message.channel.send({embed: errorreportembed})
        if(helpcommand === `google`) return message.channel.send({embed: googleembed})
        if(helpcommand === `googlesearch`) return message.channel.send({embed: googleembed})
        if(helpcommand === `relog`) return message.channel.send({embed: relogembed})
        if(helpcommand === `re`) return message.channel.send({embed: restartembed}) && message.channel.send({embed: relogembed})
        if(helpcommand === `setgame`) return message.channel.send({embed: setgameembed})
        if(helpcommand === `setstatus`) return message.channel.send({embed: setstatusembed})
        if(helpcommand === `set`) return message.channel.send({embed: setnickembed}) && message.channel.send({embed: setstatusembed}) && message.channel.send({embed: setgameembed})
        if(helpcommand === `moment`) return message.channel.send({embed: dateembed}) && message.channel.send({embed: timeembed}) && message.channel.send({embed: dayembed})
        if(helpcommand === `2ball`) return message.channel.send({embed: twoballembed})
        if(helpcommand === `ball`) return message.channel.send({embed: eightballembed}) && message.channel.send({embed: twoballembed})
        if(helpcommand === `earrape`) return message.channel.send({embed: earrapeembed})
        if(helpcommand === `avatar`) return message.channel.send({embed: avatarembed})
        if(helpcommand === `profile`) return message.channel.send({embed: profilecembed})
        if(helpcommand ===  `whois`) return message.channel.send({embed: whoisembed})
        if(helpcommand === `warn`) return message.channel.send({embed: warncembed})
        if(helpcommand === `friend`) return message.channel.send({embed: friendembed})
        if(helpcommand === `youtube`) return message.channel.send({embed: youtubeembed})
        if(helpcommand === `yt`) return message.channel.send({embed: youtubeembed})
        break;
        case "unban":
        let unbanstaffRoleIDs = message.guild.roles.filter(r => r.name == "Owner" || r.name == 'Co-Owner' || r.name == 'Co Owner' || r.name == "Admin" || r.name == "Admins" || r.name == "Administrator").map(r => r.id);
          let unbanisStaff = false;
        for (const id of unbanstaffRoleIDs) {
          if (message.member.roles.has(id)) {
            unbanisStaff = true;
            break;
    }
    }
    if (unbanisStaff) {
      var info = require("./info.json");;
      var config = require('./config.json');

        var embedreturn = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('Unban Usage')
          .setDescription('You must provide a reason for the UnBan')
            .addField(config.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')

    let unbanMember = message.mentions.users.first();
    let unbanreason = message.content.split(/\s+/g).slice(1, 2).join(" ");
    if(reason.length < 1) return message.channel.send(embedreturn).catch(console.error);
    message.guild.unban(unbanreason);
          message.delete()
          message.channel.sendMessage("The user, " + message.author.toString() + "has unbanned a member.");
          console.log('A user has been UNBANNED on ' + message.guild.name + '.')
        }
        else {
          var config = require('./config.json');
          var info = require("./info.json");;
          var embedpermerror = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Unban Usage')
            .setDescription('This command will only work if you have a role named Owner or Admin.')
            .addField(config.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
            .setFooter('Unban Info ' + info.newversion + '.')

          return message.channel.send({embed: embedpermerror})
        }

           break;
    case "shrug":
    		message.channel.sendFile('https://media.giphy.com/media/ZeNmLY6FISq4M/giphy.gif')
    		break;
    case "notproductive":
    		message.channel.send('https://tenor.com/view/bouncing-weeeeee-gif-3451476')
    		break;
    case "suggestion":
    var config = require("./config.json");
    var github_project_linkembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Suggestion Command Error')
      .setDescription('You must edit the `config.json` file and put your github project link in the section titled `github_project_link`')

    if(config.github_project_link.length < 1) return message.channel.send({embed: github_project_linkembed})
    		message.channel.send('If you would like to submit a suggestion or concern visit the link below.')
    		message.channel.send(config.github_project_link + 'issues')
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
        message.channel.send(':game_die: :game_die: **|** ' + rollyodoubledice())
        break;
      }
      case "doublerolldice":
        {
          message.channel.send(':game_die: :game_die: **|** ' + rollyodoubledice())
          break;
        }
    case "roll":
    {
      message.channel.send(':game_die: **|** ' + rollyodice());
      break;
    }
    case "rolldice":
    {
      message.channel.send(':game_die: **|** ' + rollyodice());
      break;
    }
    function do2ballVoodoo() {
      var rand = ['*Yes*','*No*','*Yes*','*No*','*Yes*','*No*','*Yes*','*No*']
      return rand[Math.floor(Math.random()*rand.length)];
    }
    case "2ball":
    {
      var config = require('./config.json')
      var questionembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setDescription('You must provide a question to ask')
        .addField(config.prefix + '2ball <question>','<question> = Question for the 2Ball')
        let question = message.content.split(' ').slice(1).join(' ')
        if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
        console.log(message.guild.name + ' | ' + moment().format('h:mm:ss a') + ' on ' +  moment().format('MMMM Do YYYY') + ' | ' + question + ' | ' + do2ballVoodoo());
        message.channel.send(':two: :basketball: ' + do2ballVoodoo());
     		break;
      }

    function doMagic8BallVoodoo() {
    var rand = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*'];

    return rand[Math.floor(Math.random()*rand.length)];
}


	case "8ball":
{
    var config = require('./config.json')
    var questionembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setDescription('You must provide a question to ask')
      .addField(config.prefix + '8ball <question>','<question> = Question for the 8Ball')

    let question = message.content.split(' ').slice(1).join(' ')
    if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
    console.log(message.guild.name + ' | ' + moment().format('h:mm:ss a') + ' on ' +  moment().format('MMMM Do YYYY') + ' | ' + question + ' | ' + doMagic8BallVoodoo());
    message.channel.send(':8ball: ' + doMagic8BallVoodoo());
 		break;
}
	function coinflipping() {
	var rand = ['Heads!', 'Tails!', 'Heads!', 'Tails!','Heads!', 'Tails!','Heads!', 'Tails!',]
	return rand[Math.floor(Math.random()*rand.length)];
}

// Later in the code:
	case "coinflip":
{
    message.channel.send('We have, ' + coinflipping());
 		break;
}
  case "flip":
{
  message.channel.send('We have, ' + coinflipping());
  break;
}
case "kys":
  message.channel.send(':ok_hand: :joy: :gun:')
  break;
case "say":
var config = require("./config.json");
var sayembed = new Discord.RichEmbed()
.setColor('FFCE00')
.setTitle('Say Usage')
.setDescription('You must provide a message to say')
.addField(config.prefix + 'say <message>','<message> = Message to say')

let message2say = message.content.split(' ').slice(1).join(' ')
if(message2say.length < 1) return message.channel.send({embed: sayembed}).catch(console.error);
    message.channel.send(message2say)
    message.delete()
          break;

          case "saytts":
          var config = require("./config.json");
          var sayttsembed = new Discord.RichEmbed()
          .setColor('FFCE00')
          .setTitle('SayTTS Usage')
          .setDescription('You must provide a message to say using TTS')
          .addField(config.prefix + 'saytts <messagetts>',':x')

          let message2saytts = message.content.split(' ').slice(1).join(' ')
          if(message2saytts < 1) return message.channel.send({embed: sayttsembed}).catch(console.error);
          message.channel.send(message2saytts, {
        tts: true
        })
          message.delete()
        break;
    case "bigorder":
    	message.channel.send('I\’ll have two number 9\'s, a number 9 large, a number 6 with extra dip, a number 7, two number 4\'s, one with cheese, and a large soda.')
    	message.channel.sendFile('http://pre06.deviantart.net/62e6/th/pre/f/2017/010/3/9/theorder_by_lawlsomedude-dauzlib.png')
    	break;
    case "untableflip":
      message.channel.send('┬─┬﻿ ノ( ゜-゜ノ)')
      break;
    case "tableflip":
    	message.channel.send('(╯°□°）╯︵ ┻━┻ ')
    	message.channel.sendFile('https://media.giphy.com/media/uKT0MWezNGewE/giphy.gif')
    	break;
    case "pause":
      message.channel.send('`Sorry, but I do not support this feature at the moment.`')
      break;
    case "rps":
    var config = require("./config.json");
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
    var rpsitemlengtherrorembed = new Discord.RichEmbed()
      .setTitle('RPS Usage')
      .setColor('FFCE00')
      .setDescription('Please provide an item to *through*')
      .addField(config.prefix + 'rps <rock|paper|scissors>','<rock|paper|scissors> = Rock, Paper, or Scissors')

    let rpsitem = message.content.split(' ').slice(1).join(' ')
      if(rpsitem === "rock") return message.channel.send('I choose...').then(sent => {sent.edit(botrock())}).catch(console.error);
      if(rpsitem === "paper") return message.channel.send('I choose...').then(sent => {sent.edit(botpaper())}).catch(console.error);
      if(rpsitem === "scissors") return message.channel.send('I choose...').then(sent => {sent.edit(botscissors())}).catch(console.error);
      if(rpsitem === "scissor") return message.channel.send('I choose...').then(sent => {sent.edit(botscissors())}).catch(console.error);
      if(rpsitem === "gun") return message.channel.send('>:(').then(sent => {sent.edit(message.author.toString() + ' :gun:')})
      if(rpsitem.length < 1) return message.channel.send({embed: rpsitemlengtherrorembed})
      break;
  //   default:
  //    message.channel.send(" :x: **ERROR 404 COMMAND NOT FOUND** :x: ")
    //  break;

  }
});
client.login(config.token)
