const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
  const opts = ['1','2','3','4','5','6']
  const fs = require('fs')

module.exports.run = (client, message, args, data, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
  fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, currency) {


  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const rollmoney = args[1]
  fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
    if (exists) {
      fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, data) {

        const newparseddata = parseFloat(data)
         const newparsedamount = parseFloat(rollmoney)
         const newparsedall = newparseddata + newparsedamount

         var nomoney = new Discord.RichEmbed()
          .setColor(colors.critical)
          .setTitle('Insufficient Funds')
          .setDescription('You must have ' + currency + newparsedamount + ' in funds to use this command')
        var noamountprovided = new Discord.RichEmbed()
          .setColor(colors.critical)
          .setTitle('No Money Amount Provided')
          .setDescription('You must provide an amount of money to use with your roll')
          var notvalidamount = new Discord.RichEmbed()
          .setColor(colors.critical)
          .setTitle('Money Amount Not Valid')
          .setDescription('The Money Amount must be `1` - `6`')

          if(!newparsedamount) return message.channel.send({embed: noamountprovided})
          if(newparsedamount > 6) return message.channel.send({embed: notvalidamount})
          if(newparsedamount < 1) return message.channel.send({embed: notvalidamount})
         if(newparseddata < newparsedamount) return message.channel.send({embed: nomoney})


         request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
    var botChoice = opts[Number(body)];
    const parsedChoice = parseFloat(botChoice)
    const moneyPayout = parsedChoice - newparsedamount
var rollmlembed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle('Roll Commad Used')
  .setDescription(message.author.username)
  .addField(botChoice, 'Money Payout: ' + currency + moneyPayout)
  .setAuthor(message.author.username ,message.author.avatarURL)
  fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, newparseddata + moneyPayout , function(err) {
    if(err) {
        return console.log(err)
    }
    var rolled = new Discord.RichEmbed()
    .setColor(colors.success)
    .setDescription(':game_die: **| ' + botChoice + '**')
    .addField('Money Payout: ', currency + moneyPayout)
    .setAuthor(message.author.username ,message.author.avatarURL)
  message.channel.send({embed: rolled})
  console.log(boxen('[Roll] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + botChoice, {padding: 1}))
  if(modlog) return modlog.send({embed: rollmlembed})
    console.log("The file was saved!");
}); 
});

      });
    }else {
      fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, '0', function(err) {
        var noaccount = new Discord.RichEmbed()
          .setColor(colors.critical)
          .setTitle('No Bank Account Found')
          .setDescription('No Bank Account Found\nCreating new file\nTry using this command again.')
          message.channel.send({embed: noaccount})
    });
  }
  });
});

    } else {
      request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
        var botChoice = opts[Number(body)];

        message.channel.send(':game_die: **| ' + botChoice + '**')
    }); 
    }
  });
  
}
module.exports.help = {
  name: "roll",
  info: "Roll a die",
  usage: "roll <amount>"
}
