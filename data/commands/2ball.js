const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
  const opts = ['*Yes*','*No*','*Yes*','*No*','*Yes*','*No*','*Yes*','*No*']

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
  
  let question = message.content.split(' ').slice(1).join(' ')

  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {

  if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
  const botChoice = opts[Number(body)];

  var twoballed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setDescription(':two: :basketball: ' + botChoice)
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  message.channel.send({embed: twoballed})

  console.log(boxen('[2Ball] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + question + ' | ' + botChoice, {padding: 1}))
  var twoballmlembed = new Discord.RichEmbed()
    .setColor(data.embedcolor)
    .setTitle('2Ball Command Used')
    .setDescription(message.author.username)
    .addField(question, botChoice)
    .setAuthor(message.author.username ,message.author.avatarURL)
    if(modlog) return modlog.send({embed: twoballmlembed}).catch(console.error);
});
}
module.exports.help = {
  name: "2ball",
  info: "Have your questions answered by the mystical 2Ball",
  usage: "2Ball <question>"
}
