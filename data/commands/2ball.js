const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');

const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
function do2ballVoodoo() {
  var rand = ['*Yes*','*No*','*Yes*','*No*','*Yes*','*No*','*Yes*','*No*']
  return rand[Math.floor(Math.random()*rand.length)];
}
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
var questionembed = new Discord.RichEmbed()
.setColor(data.embedcolor)
  .setDescription('You must provide a question to ask')
  .addField(data.prefix + '2ball <question>','<question> = Question for the 2Ball')
  .setFooter(embedfooter)
  let question = message.content.split(' ').slice(1).join(' ')
  if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
  message.channel.send(':two: :basketball: ' + do2ballVoodoo());
  console.log(boxen(message.guild.name + ' | ' + embedfooter + ' | ' + question + ' | ' + do2ballVoodoo(), {padding: 1}))
  var twoballmlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('2Ball Command Used')
    .setDescription(message.author.username)
    .addField(question, do2ballVoodoo)
    .setAuthor(message.author.username ,message.author.avatarURL)
    .setFooter(embedfooter)
    if(modlog) return modlog.send({embed: twoballmlembed}).catch(console.error);
}
module.exports.help = {
  name: "2ball",
  info: "Have your questions answered by the mystical 2Ball",
  usage: "2Ball <question>"
}
