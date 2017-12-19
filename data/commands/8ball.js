const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const moment = require("moment")
var embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
function doMagic8BallVoodoo() {
var rand = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*'];

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
  .addField(data.prefix + '8ball <question>','<question> = Question for the 8Ball')
  // removed 

let question = message.content.split(' ').slice(1).join(' ')
if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
console.log(boxen(message.guild.name + ' | ' + embedfooter + ' | ' + question + ' | ' + doMagic8BallVoodoo(), {padding: 1}));
message.channel.send(':8ball: ' + doMagic8BallVoodoo());
var eightballmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('8Ball Command Used')
  .setDescription(message.author.username)
  .addField(question, doMagic8BallVoodoo())
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
  if(modlog) return modlog.send({embed: eightballmlembed}).catch(console.error);
}
module.exports.help = {
  name: "8ball",
  info: "Have your questions answered by the mystical 8Ball",
  usage: "8Ball <question>"
}
