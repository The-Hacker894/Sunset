const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
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
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var rpsmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('RPS Command Used')
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
var rpsmlargembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('RPS Command Used *(' + rpsitem + ')*')
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.avatarURL)
  // removed 
var rpsitemlengtherrorembed = new Discord.RichEmbed()
  .setTitle('RPS Usage')
  .setColor(data.embedcolor)
  .setDescription('Please provide an item to *through*')
  .addField(data.prefix + 'rps <rock|paper|scissors>','<rock|paper|scissors> = Rock, Paper, or Scissors')
  // removed 

const rpsitem = message.content.split(' ').slice(1).join(' ')
  if(rpsitem === "rock") {
    message.channel.send('I choose...').then(sent => {sent.edit(botrock())})
    console.log(boxen('[RPS Rock] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rpsitem + ' | ' + botrock()))
    if(modlog) return modlog.send({embed: rpsmlargembed})
  }
  if(rpsitem === "paper") {
    message.channel.send('I choose...').then(sent => {sent.edit(botpaper())})
    console.log(boxen('[RPS Paper] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rpsitem + ' | ' + botpaper()))    
    if(modlog) return modlog.send({embed: rpsmlargembed})
  }
  if(rpsitem === "scissors") {
    message.channel.send('I choose...').then(sent => {sent.edit(botscissors())})
    console.log(boxen('[RPS Scissors] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rpsitem + ' | ' + botscissors()))    
    if(modlog) return modlog.send({embed: rpsmlargembed})
  }
  if(rpsitem === "scissor") {
    message.channel.send('I choose...').then(sent => {sent.edit(botscissors())})
    console.log(boxen('[RPS Scissoirs] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rpsitem + ' | ' + botscissors()))    
    if(modlog) return modlog.send({embed: rpsmlargembed})
  }
  if(rpsitem === "gun") {
    message.channel.send('>:(').then(sent => {sent.edit(message.author.username + ' :gun:')})
    console.log(boxen('[RPS Gun] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + rpsitem))   
    if(modlog) return modlog.send({embed: rpsmlargembed})
  }
  if(rpsitem.length > 1) {
    message.channel.send({embed: rpsitemlengtherrorembed})
    console.log(boxen('[RPS] ' + message.guild.name + ' | ' + message.author.tag))    
    if(modlog) return modlog.send({embed: rpsmlargembed})
  }

}
module.exports.help = {
  name: "rps",
  info: "Play RPS with Sunset",
  usage: "rps <rock|paper|scissors>"
}
