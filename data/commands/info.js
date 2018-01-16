const prettyMs = require('pretty-ms');
const pusage = require('pidusage')
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
const boxen = require('boxen');
const PythonShell = require('python-shell');
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
let total = 0;
client.guilds.map(g => total += g.memberCount)
  pusage.stat(process.pid, function (err, stat) {
    const cpuusage = parseFloat(Math.round(stat.cpu * 100) / 100).toFixed(2)
    const memusage = parseFloat(Math.round(stat.memory / 1000000 * 100) / 100).toFixed(2)
    PythonShell.run('./data/scripts/temp.py',/* options,*/ function (err, results) { 

var infosembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle(client.user.username + ' Info')
    .setDescription('Please make sure to create a channel called #mod-log for mod-log support.')
    .addField('Announcement', announcement.announce, true)
    .addField('Owner', '`' + client.users.get('270375857384587264').username + '#' + client.users.get('270375857384587264').discriminator + '`', true)
    .addField('Host', '[Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)', true)
    .addField('Library', '[' + data.library + '](https://discord.js.org/)', true )
    .addField('Language', '[' + data.language + '](https://nodejs.org/)', true)
    .addField('Uptime', prettyMs(client.uptime, {verbose: true}), true)
    .addField('CPU Usage', cpuusage + '%', true)
    .addField('Memory Usage', memusage + 'MB', true)
    .addField('Server Temperature', results, true)
    .addField('Total Members', total, true )
    .addField('Sunset Invite', '[Sunset Invite](https://discordapp.com/oauth2/authorize?client_id=' + data.bot_client_id + '&scope=bot&permissions=' + data.bot_permissions + ')', true)
    .addField('Sunset Lite Invite', '[Sunset Lite Invite](https://discordapp.com/oauth2/authorize?client_id=391606660214292482&scope=bot&permissions=' + data.bot_permissions + ')', true)
    .addField('Website', '[Sunset Website](https://hackerhubsite.weebly.com/sunset.html) | [HackerWebServer](https://corporal-cormorant-6710.dataplicity.io/)',true)
    .addField('Server Count', client.guilds.size, true)
    .addField('Version', data.newversion, true)
    .setThumbnail(client.user.displayAvatarURL)
    //.setImage('https://i.imgur.com/ZfQo3rY.gif')
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    // removed 


    message.channel.send({embed: infosembed}).then( () => {
      pusage.unmonitor(process.pid)
    })
  });    
    console.log(boxen('[Info] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
    var infosmlembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Info Command Used')
      .setDescription(message.author.username)
      .setAuthor(message.author.username ,message.author.avatarURL)
      // removed 
if(modlog) return modlog.send({embed: infosmlembed}).catch(console.error);
});
}
module.exports.help = {
  name: "info",
  info: "Get info on Sunset",
  usage: "info"
}
