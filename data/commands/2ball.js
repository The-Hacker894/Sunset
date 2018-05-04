const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
  const opts = ['Yes','No','Yes','No','Yes','No','Yes','No']
  const fs = require('fs')

module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {

    
  
  if(!litedata.includes('true')) {
  fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, sscdata) {
  fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
    if (exists) {
     fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, moneydata) {
      fs.readFile(`./data/serverdata/${message.guild.id}/settings/2ballcost.txt`, function(err, ss2bcdata) {
        fs.readFile(`./data/serverdata/${message.guild.id}/settings/2ballpayout.txt`, function(err, ss2bpdata) {

      const parsedMoney = parseFloat(moneydata)
      const parsedCost = parseFloat(ss2bcdata)
      const ballCost = parsedCost
      const parsedMaxPay = ss2bpdata
      const ballPayout = parseFloat(Math.floor(Math.random() * parsedMaxPay) + 10)
      if(parsedMoney < ballCost) {
        var notenoughmoney = new Discord.RichEmbed()
          .setColor(colors.critical)
          .setTitle('Insufficient Funds')
          .setDescription('You do not have the sufficient funds to use the mystical 2Ball\nBalance: `' + sscdata + parsedMoney + '`\nBalance Required: `' + sscdata + ballCost + '`')
          return message.channel.send({embed: notenoughmoney})
      }
  const modlog = message.guild.channels.find('name', 'mod-log');
var questionembed = new Discord.RichEmbed()
.setColor(colors.critical)
  .setDescription('You must provide a question to ask')
  .addField(data.prefix + '2ball <question>','<question> = Question for the 2Ball')
  
  let question = message.content.split(' ').slice(1).join(' ')

  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {

  if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
  const botChoice = opts[Number(body)];

  if(botChoice === 'Yes') {
    const costStage1 = parsedMoney - ballCost
    const reward = costStage1 + ballPayout
    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, reward, function(err) {

  var twoballed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle('2Ball')
  .setDescription(':two: :basketball: ' + botChoice + '\nReward: ' + sscdata + ballPayout + '\nNew Balance: ' + sscdata + reward)
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  message.channel.send({embed: twoballed})
});
  } else {
    const unreward = parsedMoney - ballCost
    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, unreward, function(err) {
      var badtwoball = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('2Ball')
        .setDescription(':two: :basketball: ' + botChoice + '\nCost: ' + sscdata + ballCost + '\nNew Balance: ' + sscdata + unreward)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    message.channel.send({embed: badtwoball})
    })
  }

  console.log(boxen('[2Ball] ' + message.guild.name + ' | ' + message.author.tag + ' | ' + question + ' | ' + botChoice, {padding: 1}))
  var twoballmlembed = new Discord.RichEmbed()
    .setColor(colors.system)
    .setTitle('2Ball Command Used')
    .setDescription(message.author.username)
    .addField(question, botChoice)
    .setAuthor(message.author.username ,message.author.avatarURL)
    if(modlog) return modlog.send({embed: twoballmlembed}).catch(console.error);
});
     });
    });
  });
     } else {
      fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, '0', function(err) {

        if(err) {
            return console.log(err).then(message => {
                message.channel.stopTyping()
            })
        }
        var newbal = new Discord.RichEmbed()
            .setColor(colors.critical)
            .setTitle('Payment Required')
            .setDescription('You do not have the sufficient funds to use the mystical 2Ball\nBalance: `'+ sscdata + '0`\nBalance Required: `' + sscdata +'5`')                               
        console.log("The file was saved!");
        message.channel.send({embed: newbal}).then(message => {
            message.channel.stopTyping()
        })
});
     }
     });
    });
  } else {

  let question = message.content.split(' ').slice(1).join(' ')

  request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {

  if(question.length < 1) return message.channel.send('You must provide a question to ask\n' + '`2ball <question>`').catch(console.error);
  const botChoice = opts[Number(body)];

  if(botChoice === 'Yes') {

  message.channel.send('**You won!**\n:two: :basketball: ' + botChoice)

  } else {
    message.channel.send('**You lost**\n:two: :basketball: ' + botChoice)
  }

  })
  }
  });
}
module.exports.help = {
  name: "2ball",
  info: "Have your questions answered by the mystical 2Ball",
  usage: "2Ball <question>"
}
