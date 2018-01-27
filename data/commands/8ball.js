const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')

const opts = ['*It is certain*','*It is decidedly so*','*Without a doubt*','*Yes definitely*','*You may rely on it*','*As I see it, yes*','*Most likely*','*Outlook good*','*Yes*','*Signs point to yes*','*Reply hazy try again*','*Ask again later*','*Better not tell you now*','*Cannot predict now*','*Concentrate and ask again*','*Don\'t count on it*','*My reply is no*','*My sources say no*','*Outlook not so good*','*Very doubtful*']
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

request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
const botChoice = opts[Number(body)];


console.log(boxen('[8Ball]' + message.guild.name + ' | ' + message.author.tag + ' | ' + question + ' | ' +botChoice , {padding: 1}));
var eightballed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription(':8ball: ' + botChoice)
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  message.channel.send({embed: eightballed})
var eightballmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('8Ball Command Used')
  .setDescription(message.author.username)
  .addField(question, botChoice)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
  if(modlog) return modlog.send({embed: eightballmlembed}).catch(console.error);
});
}
module.exports.help = {
  name: "8ball",
  info: "Have your questions answered by the mystical 8Ball",
  usage: "8Ball <question>"
}
