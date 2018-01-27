const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const client = new Discord.Client({autoReconnect:true});
const data = require("./data/brain/data.json");
const announcement = require("./data/brain/announcement.json");
const game = require("./data/brain/game.json");
const warn = require("./data/brain/warn.json");
const warnedinfo = require("./data/brain/warnedinfo.json");
const fs = require("fs");
const prefix = data.prefix
const token = data.token
const request = require("request")
const requestpn = require('request-promise-native');
const pusage = require('pidusage')
const DBLToken = data.dbltoken
const moment = require('moment')


var dataPath = './data/'
var base64filesPath = './data/base64files/'
var binaryfilesPath = './data/binaryfiles/'
var qrcodePath = './data/qrcode/'
var scriptsPath = './data/scripts/'
var textfilesPath = './data/textfiles/'

if (!fs.existsSync(dataPath)) {
 console.log('Could not find the ./data/ folder')
 process.exit(0)
}
if (!fs.existsSync(base64filesPath)) {
console.log('Could not find the ./data/base64files/ folder')
process.exit(0)
}
if (!fs.existsSync(binaryfilesPath)) {
console.log('Could not find the ./data/binaryfiles/ folder')
process.exit(0)
}
if (!fs.existsSync(qrcodePath)) {
console.log('Could not find the ./data/qrcode/ folder')
process.exit(0)
}
if (!fs.existsSync(scriptsPath)) {
console.log('Could not find the ./data/scripts/ folder')
process.exit(0)
}
if (!fs.existsSync(textfilesPath)) {
console.log('Could not find the ./data/textfiles/ folder')
process.exit(0)
}


// Credits for this code go to Felix, Corbs, Danny, and Jackalope :)
// Mostly Felix and Danny


const botjoinembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('From Sunrise to Sunset I\'ll be there ;)')
  .setDescription('Thank you for inviting Sunset to your server. \n I want you to know that I am **always** recieving updates so you may see some new features pop up here and there.\nI also have a feature to set server-specific rules. All you have to do is send `rules set <rules>` and your done! \nI also log some data for moderation and for quality assurance, but I don\'t thnk that will be a problem.')
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
    console.log('[Logged in] ' + client.user.tag)
    console.log('[Time] ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
    console.log('[Announcement] ' + announcement.announce)
    pusage.unmonitor(process.pid)
   requestpn.post({
           uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
           headers: {
               Authorization: DBLToken, // Insert token here
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
        .setDescription('The user ' + user.tag + ' has been met with the Ban Hammer :hammer: ')
        .setAuthor(user.username ,user.avatarURL)
        
      if(modlog) {
        modlog.send({embed: newbanembed}).catch(console.error);
      }
      if (announcements) {
       announcements.send({embed: newbanembed}).catch(console.error);
      }
  });
  client.on('guildMemberUpdate', (message, oMember, nMember) => {
    var modlog = message.guild.channels.find('name', 'mod-log')
    var guildMemberUpdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Guild Member Update')
      .setDescription(oMember + ' | ' + nMember)
      
      if(modlog) return modlog.send({embed: guildMemberUpdateembed}).catch(console.error);
  });
  client.on('guildUpdate', (oGuild, nGuild) => {
    var modlog = oGuild.channels.find('name', 'mod-log')
    var guildupdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Guild Updated')
      .setDescription('The Guild has been updated! \n \n **Before:** ' + oGuild + ' \n \n **After:** ' + nGuild)
      
      if(modlog) return modlog.send({embed: guildupdateembed}).catch(console.error);
  });
  client.on('guildBanRemove', (guild, user) => {
    var modlog = guild.channels.find('name', 'mod-log')
    var announcements = guild.channels.find('name', 'announcements');
    var newunbanembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('User Unbanned')
      .setDescription('The user ' + user.tag + ' has been unbanned')
      .setAuthor(user.username , user.displayAvatarURL)
      
      if(modlog) {
        modlog.send({embed: newunbanembed}).catch(console.error);
      }
      if (announcements) {
       announcements.send({embed: newunbanembed}).catch(console.error);
      }
  });
  client.on("guildDelete", guild => {
    console.log('Removed from 1 server | ' + guild).catch(console.error);
      requestpn.post({
            uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
            headers: {
                Authorization: DBLToken, // Insert token here
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
                  Authorization: DBLToken, // Insert token here
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

    var newuserjoinembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Member Announcement')
      .setDescription('A new user has joined the server :D \nPlease welcome ' + member + '!')
      

      if(modlog) {
        modlog.send({embed: newuserjoinembed}).catch(console.error);
      }
      if (announcements) {
       announcements.send({embed: newuserjoinembed}).catch(console.error);
      }
  });
  client.on('guildMemberRemove', member => {
    var modlog = member.guild.channels.find('name', 'mod-log');
  var announcements = member.guild.channels.find('name', 'announcements');
      var olduserjoinembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Member Announcement')
        .setDescription('A user has left the server D: \nPlease say your Farewells to ' + member + '!')
        
        if(modlog) {
          modlog.send({embed: olduserjoinembed}).catch(console.error);
        }
        if (announcements) {
         announcements.send({embed: olduserjoinembed}).catch(console.error);
        }
  });
  client.on('channelUpdate', (oChannel, nChannel) => {
    var modlog = oChannel.guild.channels.find('name', 'mod-log');
      var channelupdateeventembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Channel Updated')
        .setDescription('**Before:** ' + oChannel + '\n **After:**' + nChannel)
        
        if(modlog) return modlog.send({embed: channelupdateeventembed}).catch(console.error);
  });
  client.on('channelPinsUpdate', (channel, time) => {
    var modlog = channel.guild.channels.find('name', 'mod-log');
      var channelpinsupdateembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Channel Pins Updated')
        .addField(channel.name, time)
        
      if(modlog) return modlog.send({embed: channelpinsupdateembed}).catch(console.error);
  });
  client.on('roleCreate', role => {
    var modlog = role.guild.channels.find('name', 'mod-log');
    var rolecreateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Role Created')
      .setDescription(role)
      
      if(modlog) return modlog.send({embed: rolecreateembed}).catch(console.error);
  });
  client.on('roleDelete', role => {
    var modlog = role.guild.channels.find('name', 'mod-log');
    var roledeleteembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Role Deleted')
      .setDescription(role)
      
      if(modlog) return modlog.send({embed: roledeleteembed}).catch(console.error);
  });
  client.on('roleUpdate', role => {
    var modlog = role.guild.channels.find('name', 'mod-log');
    var roleupdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Role Updated')
      .setDescription(role)
      
      if(modlog) return modlog.send({embed: roleupdateembed}).catch(console.error);
  });
  /*client.on('messageUpdate', (oldMessage, newMessage) => {
    var modlog = oldMessage.guild.channels.find('name', 'mod-log');
    var messageUpdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
     .setTitle("Message Edited")
      .setDescription('Edited by @' + oldMessage.author.username + ' in #' + oldMessage.channel.name + '\n \n **Before:** ' + oldMessage + '\n \n **After:** ' + newMessage)
      
  if(modlog) {
    console.log(' ')
    if(oldMessage.content !== newMessage.content) return modlog.send({embed: messageUpdateembed}).catch(console.error);
  }

  }); */
  client.on('messageDelete', message => {
    var modlog = message.guild.channels.find('name', 'mod-log');
     var messagedelembed = new Discord.RichEmbed()
     .setColor('FFCE00')
     .setTitle('Message Deleted')
     .setDescription(message.author.tag + '\n \n' + message)
     .setAuthor(message.author.username, message.author.displayAvatarURL)
     
     if(modlog) return modlog.send({embed: messagedelembed}).catch(console.error);
  });


client.login(token)
