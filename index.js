const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const client = new Discord.Client();
const data = require("./data/brain/data.json");
const announcement = require("./data/brain/announcement.json");
const game = require("./data/brain/game.json");
const warn = require("./data/brain/warn.json");
const warnedinfo = require("./data/brain/warnedinfo.json");
const fs = require("fs");
const prefix = data.prefix
const token = data.token
const request = require("request")
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
// const Attachment = require('discord.js').Attachment
const requestpn = require('request-promise-native');
const pusage = require('pidusage')

const botjoinembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('From Sunrise to Sunset I\'ll be there ;)')
  .setDescription('Thank you for inviting Sunset to your server. \n I want you to know that I am **always** recieving updates so you may see some new features pop up here and there. \n I also log some data for moderation and for quality assurance, but I don\'t thnk that will be a problem.')
  .addField('**Here is the current Announcement**', '```' + announcement.announce + '```')
  .addField('**Current Version**', '```' + data.newversion + '```')
client.on("message", (message) => {

  const args = message.content.split(" ");
  const command = message.content.split(" ")[0]
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if(!command.startsWith(prefix)) return;
  const cmd = client.commands.get(command.slice(prefix.length))
  if(cmd)
    cmd.run(client, message, args, data, game, announcement, warn, warnedinfo)

})
client.on("message", (message) => {
  if(message.content.startsWith(`<@${client.user.id}>`)) {
    var mentionedembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Prefix')
      .setDescription('```' + prefix + '```')
      message.channel.send({embed: mentionedembed})
  }
})
client.on("message", function(message) {
  var Attachment = (message.attachments).array();
  Attachment.forEach(function(attachment) {
    console.log(attachment.url);
  })
})

client.commands = new Discord.Collection();
  fs.readdir("./data/commands", (err, files) => {
    if(err) console.error(err)
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if(jsFiles.length <= 0) {
      console.log("No commands loaded")
      return;
    }
    console.log('[Commands Loaded] ' + jsFiles.length)

    jsFiles.forEach((f, i) => {
      const props = require("./data/commands/" + f)
      client.commands.set(props.help.name, props)
    })
  })
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
      if(modlog) {
        modlog.send({embed: newbanembed})
      }
      if (announcements) {
       announcements.send({embed: newbanembed})
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
      if(modlog) {
        modlog.send({embed: newunbanembed})
      }
      if (announcements) {
       announcements.send({embed: newunbanembed})
      }
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

      if(modlog) {
        modlog.send({embed: newuserjoinembed})
      }
      if (announcements) {
       announcements.send({embed: newuserjoinembed})
      }
  });
  client.on('guildMemberRemove', member => {
    var modlog = member.guild.channels.find('name', 'mod-log');
  var announcements = member.guild.channels.find('name', 'announcements');
      var olduserjoinembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Member Announcement')
        .setDescription('A user has left the server D: \nPlease say your Farewells to ' + member + '!')
        .setFooter(embedfooter)
        if(modlog) {
          modlog.send({embed: olduserjoinembed})
        }
        if (announcements) {
         announcements.send({embed: olduserjoinembed})
        }
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


client.login(token)
