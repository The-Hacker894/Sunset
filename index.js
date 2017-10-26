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




client.on("ready", () => {
  console.log('The time is ' + Date.now())
  console.log(`Sunset has started setting`)
  client.user.setGame(client.guilds.size + ' servers | ' + config.prefix + 'help')
});
client.on('message', msg => {
  if (msg.content === 'test') {
    msg.channel.send('Test Successful');
    msg.channel.sendFile('https://media.giphy.com/media/8GY3UiUjwKwhO/giphy.gif')
  }
if(msg.content === 'prefix') {
    msg.channel.send("My prefix is " + config.prefix)
  }
});
var disabled = 'This command has been disabled'

client.on("message", message => {
  let args = message.content.substring(prefix.length).split(" ");
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

  switch (args[0].toLowerCase()) {

    case "music":
      var musichembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Music Commands')
        .addField('Commands','`play` `stop` `end`')
        message.channel.send({embed: musichembed})
      break;
      case "ping":
      var config = require("./config.json")
      var pingembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Ping Usage')
        .setDescription(config.prefix + 'ping text or ' + config.prefix + 'ping image')
        .addField(config.prefix + 'ping <image|text>','<image|text> = Test your ping with an image or with text')

      let pingmessage = message.content.split(' ').slice(1).join(' ')
      if(pingmessage.length < 1) return message.channel.send({embed: pingembed})
      if(pingmessage === 'text') return message.channel.send('Pinging...').then(sent => { sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)});
      if(pingmessage === 'image') return message.channel.send('Pinging...').then(sent => { sent.edit('http://madeformakers.org/wp-content/uploads/2016/01/pong.png').then(msg => { msg.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)})});
      message.delete()
      break;
        case "imageping":
          message.channel.send('Pinging...').then(sent => {
            sent.edit('http://madeformakers.org/wp-content/uploads/2016/01/pong.png').then(msg => {
              msg.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
              console.log('Image Ping performed on ' + message.guild.name + ` took ${sent.createdTimestamp - message.createdTimestamp}ms`)
            })
          })
          message.delete()
      break;
      case "volume":
      message.channel.send('I do not support changing the volume at this time')
        break;
      case "play":
      var config = require("./config.json")
      let musictoplay = message.content.split(' ').slice(1).join('')
      let volume2set = message.content.split(/\s+/g).slice(2).join(" ");
      var musiclengtherror = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Music Commands Usage (Play)')
        .setDescription('You must provide a link that is from `youtube.com`')
        .addField(config.prefix + 'play <youtube_link>','<youtube_link> = Link to Youtube Video')

      if(musictoplay.length < 1) return message.channel.send({embed: musiclengtherror}).catch(console.error);

      var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply("You must be in a voice channel.");
    voiceChannel.join()
      .then(connnection => {
        var stream = ytdl(musictoplay, { filter: 'audioonly' });
        message.channel.send(':play_pause: **Now Playing** ' + musictoplay)

        var dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
      });
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


    case "pi":
    var value = eval("Math.PI");
    message.channel.send(value)
    message.delete()
    break;
    case "math":
    message.channel.send(disabled)
    message.delete()
  //    var mathequal = eval(message.content.split(' ').slice(1).join(' '))
  //    message.channel.send('Your answer is ' + mathequal)
    break;
    case "jsexec":
    message.channel.send(disabled)
    message.delete()

    //  var execute = eval(message.content.split(' ').slice(1).join(' '))
  //    var embed = new Discord.RichEmbed()
    //  .setColor("00FF00")
  //    .setTitle("JS Execution")
    //  .addField(':inbox_tray:','**Input**')
  //    .addField(message.content.split(' ').slice(1).join(' '), '↓')
    //  .addField(':outbox_tray:','**Output**')
  //    .addField(execute, '∎')
//    message.channel.sendEmbed(embed)
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
    .setColor('00FF00')
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
        .setColor('00FF00')
        .setDescription('You must have an Adminstrative role')
        .addField(config.prefix + 'setnick <@user> <nick>','<@user> = Mentioned user | <nick> = Nickname')

      return message.channel.send({embed: permerrorembed});
    }

      break;
      case "dmuser":
      var config = require("./config.json")
      var dmuembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must provide a user and a message to send')
        .addField(config.prefix + 'dmuser <@user> <message>','<@user> = Mentioned User | <message> = message to send.')

        let message2send2user = message.content.split(/\s+/g).slice(2).join(" ")
        let user = message.guild.member(message.mentions.users.first())
        if(message2send2user.length < 1) return message.channel.send({embed: dmuembed}).catch(console.error);
        if(user.length < 1) return message.channel.send({embed: dmuembed}).catch(console.error);
        message.guild.member(user).sendMessage('A message from the user ' + message.author.toString() + ' has arrived!')
        message.guild.member(user).sendMessage(message2send2user)
        message.channel.send('Message sent to ' + user + ' successfully!')
        break;
    case "setgame":
    var gameembed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setDescription('You must provide a status *or game* for Sunset')
      .addField(config.prefix + 'setgame <game>','<game> = Can be anything really')

    let playgame = message.content.split(' ').slice(1).join(' ')
    if(playgame.length < 1) return message.channel.send({embed: gameembed}).catch(console.error);
        client.user.setGame(playgame)
        message.delete()
        message.channel.send('Set Game Status to ' + playgame)
      break;

    case "website":
      var websiteembed = new Discord.RichEmbed()
        .setColor('008080')
          .setTitle('Sunset Website')
            .setURL('https://sites.google.com/view/sunset-discordbot/home')
          message.channel.send({embed: websiteembed})

        break;
    case "musicwebsite":
      var mwebsiteembed = new Discord.RichEmbed()
        .setColor('008080')
        .setTitle('HackerBot Music Website')
        .setURL('https://sites.google.com/view/hackerbot-music/home')
        message.channel.send({embed: mwebstieembed})
        break;
    case "devpage":
      var devpageembed = new Discord.RichEmbed()
        .setColor('008080')
        .setTitle('TheHacker894 Dev Page')
        .setURL('https://sites.google.com/view/thehacker-dev-page/home')
        message.channel.send({embed: devpageembed})
        break;
    case "consoleissue":
    var ciembed = new Discord.RichEmbed()
      .setColor(`00FF00`)
      .setDescription('You must provide an issue')
      .addField(config.prefix + 'consoleissue <issuereport>','<issuereport> = Your issue')

    let issuereport = message.content.split(' ').slice(1).join(' ')
    if(issuereport.length < 1) return message.channel.send({embed: ciembed}).catch(console.issue);
      console.log('Issue report: ' + issuereport + ' from ' + message.guild.name + '.')
      message.delete()
      message.channel.send('Issue Reported to console')
      message.channel.send('Thank you :)')
      break;

    case ":O":
      message.channel.send('>:O')

      break;
    case ":o":
      message.channel.send('>:o')
      break;
    case ":D":
      message.channel.send('>:D')

      break;

    case ":I":
      message.channel.send('>:I')

      break;
    case ":0":
      message.channel.send('>:0')
      break;
    case ":(":
      message.channel.send(">:(")
      break;
    case ":)":
      message.channel.send(">:)")
      break;
    case ":d":
      message.channel.send(">:d")
        break;
        case ":l":
          message.channel.send(">:l")
            break;
      case "rage":
          message.channel.send('https://giphy.com/gifs/glee-image-wiki-wvQIqJyNBOCjK')
          break;
          case "uptime":
        let seconds = client.uptime / 1000 + ' seconds'
        let minutes = client.uptime / 60000 + ' minutes'
        let hours = client.uptime / 3600000 + ' hours'
        let days = client.uptime / 86400000 + ' days'
        let uptimeformat = message.content.split(' ').slice(1).join(' ')

        var uptimeembed = new Discord.RichEmbed()
        .setColor(`00FF00`)
        .setTitle('Sunset Uptime')
        .addField('Uptime Seconds', seconds)
        .addField('Uptime Minutes', minutes)
        .addField('Uptime Hours', hours)
        .addField('Uptime Days', days)

        var secondupembed = new Discord.RichEmbed()
        .setColor(`00FF00`)
        .setTitle('Sunset Uptime (Seconds)')
        .addField('Uptime Seconds', seconds)

        var minuteupembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Sunset Uptime (Minutes)')
        .addField('Uptime Minutes', minutes)

        var hourupembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Sunset Uptime (Hours)')
        .addField('Uptime Hours', hours)

        var dayupembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Sunset Uptime (Days)')
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
        .setColor('00FF00')
        .setTitle('Server Info')
        .addField('Server Name', message.guild.name)
        .addField('Server ID', message.guild.id)
        .addField('Server Region', message.guild.region)
        .addField('Member Count', message.guild.memberCount)
        .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
        .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
        .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
        .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `)
        .addField('Channel Count', message.guild.channels.size)
        message.channel.send({embed: serverinfembed})
        break;
      case "membercount":
      var mcembed = new Discord.RichEmbed()
      .setColor('00FF00')
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
      .setColor('00FF00')
      .setTitle('Member Count')
      .addField('Member Count', message.guild.memberCount)
      .addField('Online Member Count', message.guild.presences.filter(p=>p.status == 'online').size)
      .addField('Idle Member Count', message.guild.presences.filter(p=>p.status == 'idle').size)
      .addField('Do Not Disturb Count', message.guild.presences.filter(p=>p.status == 'dnd').size)
      .addField('Offline Member Count', `${message.guild.memberCount - message.guild.presences.filter(p=>p.status == 'online').size - message.guild.presences.filter(p=>p.status == 'idle').size - message.guild.presences.filter(p=>p.status == 'dnd').size} `)
      message.channel.send({embed: mcembed})
      break;
      case "channelcount":
        var ccembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Channel Count')
        .addField('Channel Count', message.guild.channels.size)
        message.channel.send({embed: ccembed})
        break;
      case "channels":
      var cembed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setTitle('Channel Count')
      .addField('Channel Count', message.guild.channels.size)
      message.channel.send({embed: cembed})
      break;
      case "servername":
        var snembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Server Name')
        .addField('Server Name', message.guild.name)
        message.channel.send({embed: snembed})
        break;
      case "serverid":
        var siembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Server ID')
        .addField('Server ID', message.guild.id)
        message.channel.send({embed: siembed})
        break;
      case "success":
        message.channel.sendFile('https://cdn.discordapp.com/attachments/216032723851018251/346777021780590612/meme.png')

        break;
      case "warn":
      var config = require("./config.json");
      var warnembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must supply a reason and a mentioned user.')
        .addField(config.prefix + 'warn <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for warn')

      let reason = message.content.split(/\s+/g).slice(2).join(" ");
      let usertowarn = message.guild.member(message.mentions.users.first());
      console.log(reason);
        if(reason.length < 1) return message.channel.send({embed: warnembed})
        if(message.mentions.users.size < 1) return message.channel.send({embed: warnembed}).catch(console.error);

        var permerrorembed = new Discord.RichEmbed()
        .setColor(00000)
        .addField('Action','Warning')
        .addField('User:', usertowarn)
        .addField('Moderator', message.author.toString())
        .addField('Reason', reason)
        message.channel.send({embed: permerrorembed})
        break;


      case "dmhacker":
      var config = require("./config.json");
      var dmhembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setDescription('You must provide a message to send to TheHacker894')
        .addField(config.prefix + 'dmhacker <DM>','<DM> = Direct Message to send to TheHacker894')
      let message4hacker = message.content.split(' ').slice(1).join(' ')
      if(message4hacker.length < 1) return message.channel.send({embed: dmhembed}).catch(console.error);
        message.delete()
        client.users.get('270375857384587264').send('A message from the user ' + message.author.toString() + ' has arrived.')
        client.users.get('270375857384587264').send(message4hacker)
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
        .setColor('00FF00')
        .setDescription('You need to provide a member to ban and a reason for the ban')
        .addField(config.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')

        let banMember = message.guild.member(message.mentions.users.first());
          let banreason = message.content.split(/\s+/g).slice(2).join(" ");
          if(banreason.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
          if(banMember.length < 1) return message.channel.send({embed: embedreturn}).catch(console.error);
		        message.guild.member(banMember).ban(banreason);
              message.delete()
              var embedaction = new Discord.RichEmbed()
              .setColor(00000)
              .addField('Action','Ban')
              .addField('User:', banMember)
              .addField('UserID for Unban', userid4unban)
              .addField('Moderator', message.author.toString())
              .addField('Reason', banreason)
              message.channel.send({embed: embedaction})
              console.log('A user has been BANNED on ' + message.guild.name + '.')

            } else {
              var config = require("./config.json");
              var info = require("./info.json");
              var embedpermreturn = new Discord.RichEmbed()
             .setColor("FFA500")
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
  var info = require("./info.json");
var newembed = new Discord.RichEmbed()
.setColor("FFA500")
.setTitle('Kick Usage')
.setDescription('You provide a member to kick and a reason', true)
.addField(config.prefix + 'kick <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for kick', true)
.setFooter("Version " + info.newversion + " (Kick Usage)","https://cdn.discordapp.com/avatars/342054071060004884/04f1a7a65bd8467eb928e82b33e6d010.webp?size=1024")

  let kickMember = message.guild.member(message.mentions.users.first());
  let reason = message.content.split(/\s+/g).slice(2).join(" ");
  if(reason.length < 1) return message.channel.send({embed: newembed}).catch(console.error);
  if(kickMember.length < 1) return message.channel.send({embed: newembed}).catch(console.error);

  var embedaction = new Discord.RichEmbed()
  .setColor(00000)
  .addField('Action','Kick')
  .addField('User:', kickMember)
  .addField('Moderator', message.author.toString())
  .addField('Reason', reason)
  message.channel.send({embed: embedaction})
      message.delete()
      message.guild.member(kickMember).kick(reason);{
        message.channel.send("The user, " + message.author.toString() + " has kicked a member for " + reason + ".");
      }
    }
    else {
      var config = require("./config.json");{
        var info = require('./info.json');
    var embedreturn = new Discord.RichEmbed()
    .setColor("FFA500")
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
            .setColor('00FF00')
            .setDescription('You must provide a number of message to purge; 2 - 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge')

          var lengthtoobig = new Discord.RichEmbed()
            .setColor('00FF00')
            .setDescription('The amount of messages to purge cannot be greater than 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge (cannot be greater than 100)')

          var purgetoosmall = new Discord.RichEmbed()
            .setColor('00FF00')
            .setDescription('The amount of messages to purge can be as small as 2 but larger than 100')
            .addField(config.prefix + 'purge <amount>','<amount> = Messages to purge (2 - 100)')

          let purgearg = message.content.split(' ').slice(1).join(' ')
          if(purgearg = 1) return message.channel.send({embed: purgetoosmall})
          if(purgearg.length < 1) return message.channel.send({embed: lengthtoosmall}).catch(console.error);
          if(purgearg.length > 100) return message.channel.send({embed: lengthtoobig}).catch(console.error);
          message.delete()
          message.guild.member(message.channel.bulkDelete(purgearg))
    } else {
      var config = require("./config.json");
      var permembed = new Discord.RichEmbed()
        .setColor('00FF00')
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
      .setColor('00FF00')
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
            .setColor('00FF00')
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
      var scembed = new Discord.RichEmbed()
      .setColor('40E0D0')
      .setTitle('Sunset Source Code')
      .setDescription('Here you can view and download the source code. Please note that the GitHub Source Code gets updated every week.')
      .setURL('https://github.com/Mr-Hacker894/Sunset')
      message.channel.send({embed: scembed})
      break;
	  case "github":
		  var gembed = new Discord.RichEmbed()
		  .setColor('40E0d0')
		  .setTitle('Sunset Github Page')
		  .setDescription('Here you can view the Sunset github page.')
		  .setURL('https://github.com/Mr-Hacker894/Sunset')
		  message.channel.send({embed: gembed})
            break;

      case "invite":
      	message.channel.send('Here is the invite to the server requested by,' + message.author.toString() + ".")
    	var inembed = new Discord.RichEmbed()
    	.setColor('008080')
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
    	message.channel.send("Here is an invite for Sunset requested by, " + message.author.toString() + ".")
    	var binvembed = new Discord.RichEmbed()
    	.setColor('40E0D0')
    	.setTitle('Sunset Invite')
    	.setURL('https://discordapp.com/oauth2/authorize?client_id=371097223942897665&scope=bot&permissions=2146958591')
    	message.channel.send({embed: binvembed})
    	break;
    case "info":

    var info = require("./info.json");
	var config = require("./config.json");
    	var infoembed = new Discord.RichEmbed()
    	.setColor("ffff00")
    	.setTitle('Sunset Info')
    	.addField('Owner', config.owner)
    	.addField('Library', info.library)
      .addField('Language', info.language)
      .addField('Description', info.description)
      .addField('Uptime', client.uptime / 1000 + 's')
      .addField('Servers', client.guilds.size)
      	.addField('Helpers', '@Google Drive#0831, @Bloxxer_DTC#1958, The Discord.js Discord Server', false)
    	.addField('Testers', '@Corbs#9620, Ion#8844, @Google Drive#0831, @Shadow The  |「Dimensions™」#5869, @Jackalope#6413', false)
    	.addField('Version', info.newversion)
      .setThumbnail('https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg')
      .setFooter("Version " + info.newversion,"https://images-ext-1.discordapp.net/external/Z1krf1ZBQTM3mDkke47xThwIF4GEFG0doRAdKRVHgnY/%3Fsize%3D128/https/cdn.discordapp.com/avatars/342054071060004884/4b83b2aa5970b8d34db71fd986abfe30.jpg")
		message.channel.send({embed: infoembed})
    	break;
      case "help":
      let helpcommand = message.content.split(' ').slice(1).join(' ')
      var info = require("./info.json")
      var config = require("./config.json");
      var helpembed = new Discord.RichEmbed()
        .setColor('FFFF00')
        .setTitle('Commands')
        .setDescription(config.prefix + 'help <command> to get help with all commands listed here with the exclusion of the **WIP** commands.')
        .addField('**Information**','`help` `ping` `test` `info` `uptime` `serverinfo`')
        .addField('**Bot Information**','`botinvite` `website` `musicwebsite` `sourcecode` `github` `suggestion` `consoleissue`')
        .addField('**Music**','`play` `skip` `pause` `queue` `end` `stop`')
        .addField('**Entertainment**','`say` `saytts` `8ball` `coinflip` `flip` `roll`')
        .addField('**Memes**','`rage` `error` `tableflip` `untableflip` `shrug` `notproductive` `bigorder`')
        .addField('**Moderation**','`ban` `unban` `kick` `purge` `channelcreate` `channeldelete` `setnick`')
        .addField('**Other**','`dmhacker` `dmuser` `devpage` `invite` `unixtime`')
        .addField('**WIP**','`warn` `mute`')


        var helpcembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setTitle('Help Help')
        .setDescription('Get a list of commands available with Sunset')
        .addField(config.prefix + 'help <command>','<command> = command from help')
        var pingembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Ping Help')
          .setDescription('Test the bot\'s ping')
          .addField(config.prefix + 'ping <text|image>','<text|image> = ')
        var testembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Test Help')
          .setDescription('Test Command to see if Sunset is working')
          .addField(config.prefix + 'test','This command has no arguments')
        var infoembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Info Help')
          .setDescription('Gives info on Sunset')
          .addField(config.prefix + 'info','This command has no arguments')
        var uptimeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Uptime Help')
          .setDescription('Gives total Uptime of Sunset')
          .addField(config.prefix + 'uptime <timeformat>','<timeformat> = Seconds, Minutes, etc,...')
        var serverinfoembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Server Info Help')
          .setDescription('Gives info on the current server')
          .addField(config.prefix + 'severinfo','This command has no arguments')
        var botinviteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Bot Invite Help')
          .setDescription('Sends an OAuth Invite for Sunset')
          .addField(config.prefix + 'botinvite','This command has no arguments')
        var websiteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Website Help')
          .setDescription('Sends a link to the Sunset Website')
          .addField(config.prefix + 'website','This command has no arguments')
        var musicwebsiteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Music Website Help')
          .setDescription('Sends a link to the Sunset Music Website')
          .addField(config.prefix + 'musicwebsite','This command has no arguments')
        var sourcecodeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Source Code Help')
          .setDescription('Sends a link to the Sunset Source')
          .addField(config.prefix + 'sourcecode','This command has no arguments')
        var githubembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('GitHub Help')
          .setDescription('Sends a link the Sunset GitHub Page')
          .addField(config.prefix + 'github','This command has no arguments')
        var suggestionembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Suggestion Help')
          .setDescription('Sends a link to the GitHub Issues Page')
          .addField(config.prefix + 'suggestion','This command has no arguments')
        var consoleissueembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Console Issue Help')
          .setDescription('Send a console issue report directly to the console')
          .addField(config.prefix + 'consoleissue <issuereport>','<issuereport> = Issue to report to the console')
        var sayembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle("Say Help")
          .setDescription('Say a message through Sunset')
          .addField(config.prefix + 'say <message>','<message> = Message to say')
        var sayttsembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('SayTTS Help')
          .setDescription('Say a message through Sunset with Text To Speech')
          .addField(config.prefix + 'saytts <ttsmessage>','<ttsmessage> = TTS Message to say')
        var eightballembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('8Ball Help')
          .setDescription('Ask the mystical 8Ball your :fire: burnining :fire: questions')
          .addField(config.prefix + '8ball <question>','<question> = Question to ask the mystical 8Ball')
        var coinflipembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Coinflip Help')
          .setDescription('Flip a coin; Heads or Tails')
          .addField(config.prefix + 'flip','This command has no arguments')
        var rollembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('RollDice Help')
          .setDescription('Roll the die *(or dice)*')
          .addField(config.prefix + 'roll','This command has no arguments')
        var rageembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Rage Help')
          .setDescription('Sends a Rage GIF')
          .addField(config.prefix + 'rage','This command has no agruments')
        var errorccembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Error Help')
          .setDescription('Sends an Error with the color provided')
          .addField(config.prefix + 'error <color>','<color> = Any color from the rainbow')
        var tableflipembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Table Flip Help')
          .setDescription('Sends a fipped table')
          .addField(config.prefix + 'tableflip','This command has no arguments')
        var untableflipembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('UnTable Flip Help')
          .setDescription('Sends a unflipped table')
          .addField(config.prefix + 'untableflip','This command has no arguments')
        var shrugembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Shrug Help')
          .setDescription('Sends a shrug')
          .addField(config.prefix + 'shrug','This command has no arguments')
        var notproductiveembed = new Discord.RichEmbed()
            .setColor('00FF00')
            .setTitle('Not Productive Help')
            .setDescription('A summary of what you did over the summer')
            .addField(config.prefix + 'notproductive','This command has no arguments')
        var bigorderembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Big Order Help')
          .setDescription('Big Smokes\'s Big Order')
          .addField(config.prefix + 'bigorder','This command has no arguments')
        var banembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Ban Help')
          .setDescription('Bans a User')
          .addField(config.prefix + 'ban <@user> <reason>','<@user> = Mentioned User | <reason> = Reason for Ban')
        var unbanembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Unban Help')
          .setDescription('Unbans a User')
          .addField(config.prefix + 'unban <userid>','<userid> = User\'s guild ID')
        var purgeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Purge Help')
          .setDescription('Deletes up to 100 Messages')
          .addField(config.prefix + 'purge <amount>','<amount> = amount of messages to purge')
        var kickembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Kick Help')
          .setDescription('Kick a user')
          .addField(config.prefix + 'kick <@user> <reason>','<@user> = @Mentioned User | <reason> = Reason for Kick')
        var channelcreateembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Channel Create Help')
          .setDescription('Create a channel')
          .addField(config.prefix + 'channelcreate <name>','<name> = Name for Channel Creation')
        var channeldelete = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Channel Delete Help')
          .setDescription('Delete a channel')
          .addField(config.prefix + 'channeldelete','This command has no arguments')
        var setnickembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Set Nick Help')
          .setDescription('Set the Nickname of a user or bot *(with the correct permissions)*')
          .addField(config.prefix + 'setnick <@user> <nickname>','<@user> = @Mentioned User ! <nickname> = Nickname to set for the user or bot')
        var dmuserembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('DMUser Help')
          .setDescription('DM a user through Sunset; **This command does not work globally**')
          .addField(config.prefix + 'dmuser <@user> <message>','<@user> = @Mentioned User | <message> = Message to send to user')
        var dmhackerembed =  new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('DMHacker Help')
          .setDescription('DM TheHacker894')
          .addField(config.prefix + 'dmhacker <message>','<message> = Message to send to TheHacker894')
        var devpageembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Dev Page Help')
          .setDescription('Sends a link to TheHacker894 Dev Page')
          .addField(config.prefix + 'devpage','This command has no arguments')
        var inviteembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Invite Help')
          .setDescription('Sends an Invite Link to the HackerWorld Discord Server')
          .addField(config.prefix + 'invite','This command has no arguments')
        var unixtimeembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Unix Time Help')
          .setDescription('Sends the amount of ticks passed since 1/1/1970 on EDT')
          .addField(config.prefix + 'unixtime','This command has no arguments')

        var playembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Music Command Help (Play)')
          .setDescription('Play some music from YouTube')
          .addField(config.prefix + 'play <youtube_url>','<youtube_url> = URL from Youtube')

        var endembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Music Command Help (End)')
          .setDescription('End the music that is playing *(has the same functionality as the **stop** command)')
          .addField(config.prefix + 'end','This command has no arguments')

        var stopembed = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Music Command Help (Stop)')
          .setDescription('Stop the music that is playing *(has the same functionality as the **end** command)')
          .addField(config.prefix + 'stop','This command has no arguments')

        if(helpcommand.length < 1) return message.channel.send({embed: helpembed})
        if(helpcommand === `help`) return message.channel.send({embed: helpcembed})
        if(helpcommand === `ping`) return message.channel.send({embed: pingembed})
        if(helpcommand === `test`) return message.channel.send({embed: testembed})
        if(helpcommand === `info`) return message.channel.send({embed: infoembed})
        if(helpcommand === `uptime`) return message.channel.send({embed: uptimeembed})
        if(helpcommand === `serverinfo`) return message.channel.send({embed: serverinfoembed})
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
      var info = require("./info.json");
      var config = require('./config.json');

        var embedreturn = new Discord.RichEmbed()
          .setColor('00FF00')
          .setTitle('Unban Usage')
          .setDescription('You must provide a reason for the UnBan')
            .addField(config.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')

    let unbanMember = message.mentions.users.first();
    let unbanreason = message.content.split(/\s+/g).slice(1, 2).join(" ");
    if(reason.length < 1) return message.channel.sendEmbed(embedreturn).catch(console.error);
    message.guild.unban(unbanreason);
          message.delete()
          message.channel.sendMessage("The user, " + message.author.toString() + "has unbanned a member.");
          console.log('A user has been UNBANNED on ' + message.guild.name + '.')
        }
        else {
          var config = require('./config.json');
          var info = require("./info.json");
          var embedpermerror = new Discord.RichEmbed()
            .setColor('0080FF')
            .setTitle('Unban Usage')
            .setDescription('This command will only work if you have a role named Owner or Admin.')
            .addField(config.prefix + 'unban <userid> <reason>','<userid> = User\'s Guild ID | <reason> = Reason for Unban')
            .setFooter('Unban Info ' + info.newversion + '.')

          return message.channel.sendEmbed(embedpermerror)
        }

           break;
    case "dexforums":
      message.channel.send('https://dexforums.wixsite.com/home')
    break;
    case "shrug":
    		message.channel.sendFile('https://media.giphy.com/media/ZeNmLY6FISq4M/giphy.gif')
    		break;
    case "notproductive":
    		message.channel.send('https://tenor.com/view/bouncing-weeeeee-gif-3451476')
    		break;
    case "suggestion":
    		message.channel.send('If you would like to submit a suggestion or concern visit one, or both, of the links below.')
    		message.channel.send('https://github.com/Mr-Hacker894/Sunset/issues')
    		break;
    function rollyodice() {
      var rand = ['**1**','**2**','**3**','**4**','**5**','**6**']

    return rand[Math.floor(Math.random()*rand.length)];
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
    function doMagic8BallVoodoo() {
    var rand = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*'];

    return rand[Math.floor(Math.random()*rand.length)];
}

// Later in the code:
	case "8ball":
{
    var questionembed = new Discord.RichEmbed()
      .setColor('00FF00')
      .setDescription('You must provide a question to ask')
      .addField('>8ball <question>','<question> = Question for the 8Ball')

    let question = message.content.split(' ').slice(1).join(' ')
    if(question.length < 1) return message.channel.sendEmbed(questionembed).catch(console.error);
    console.log(message.guild.name + ' | ' + Date.now() + ' | ' + question + ' | ' + doMagic8BallVoodoo);
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
.setColor('00FF00')
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
          .setColor('00FF00')
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
    case "dannyslife":
    	message.channel.send('Here is the biography about DannyBoi')
    	var dlembed = new Discord.RichEmbed()
    	.setColor('000000')
    	.setTitle('Danny\'s Life')
    	.setURL('https://drive.google.com/file/d/0B3AjZwDXKX8fY0RUVTZUV0RrNGs/view?usp=sharing')
    	message.channel.send({embed: dlembed})
    	break;
    case "pause":
      message.channel.send('`Sorry, but I do not support this feature at the moment, but you can invite Sunset Music`')
      message.channel.send('https://discordapp.com/oauth2/authorize?client_id=365255372480446465&scope=bot&permissions=2146958591')
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
      .setColor('00FF00')
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
