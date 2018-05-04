const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const request = require('request')
const fs = require('fs')
const opts = ['It is certain','It is decidedly so','Without a doubt','Yes definitely','You may rely on it','As I see it, yes','Most likely','Outlook good','Yes','Signs point to yes','Reply hazy try again','Ask again later','Better not tell you now','Cannot predict now','Concentrate and ask again','Don\'t count on it','My reply is no','My sources say no','Outlook not so good','Very doubtful']
const goodChoice = ['It is certain', 'It is decidedly so','Without a doubt','Yes definitely', 'Most likely','Outlook good','Yes','Signs point to yes']
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 

  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {

  
  if(!litedata.includes('true')) {
  fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, sscdata) {
  fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
    if(exists) {
      fs.readFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, 'utf8', function(err, moneydata) {
      fs.readFile(`./data/serverdata/${message.guild.id}/settings/8ballcost.txt`, function(err, ss8bcdata) {
        fs.readFile(`./data/serverdata/${message.guild.id}/settings/8ballpayout.txt`, function(err, ss8bpdata) {
          const parsedMoney = parseFloat(moneydata)
      const parsedCost = parseFloat(ss8bcdata)
      const ballCost = parsedCost
      const parsedMaxPay = ss8bpdata
      const ballPayout = parseFloat(Math.floor(Math.random() * parsedMaxPay) + 15)
      if(parsedMoney < ballCost) {
        var notenoughmoney = new Discord.RichEmbed()
          .setColor(colors.critical)
          .setTitle('Insufficient Funds')
          .setDescription('You do not have the sufficient funds to use the mystical 8Ball\nBalance: `' + sscdata + parsedMoney + '`\nBalance Required: `' + sscdata + ballCost + '`')
          return message.channel.send({embed: notenoughmoney})
      }
  const modlog = message.guild.channels.find('name', 'mod-log');
var questionembed = new Discord.RichEmbed()
  .setColor(colors.critical)
  .setDescription('You must provide a question to ask')
  .addField(data.prefix + '8ball <question>','<question> = Question for the 8Ball')
  // removed 

let question = message.content.split(' ').slice(1).join(' ')

request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
if(question.length < 1) return message.channel.send({embed: questionembed}).catch(console.error);
const botChoice = opts[Number(body)];
const costStage1 = parsedMoney - ballCost
    const reward = costStage1 + ballPayout
    fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, reward, function(err) {


console.log(boxen('[8Ball]' + message.guild.name + ' | ' + message.author.tag + ' | ' + question + ' | ' +botChoice , {padding: 1}));
if(botChoice === goodChoice) {
var eightballed = new Discord.RichEmbed()
  .setColor(colors.system)
  .setTitle('8Ball')
  .setDescription(':white_check_mark: :8ball: ' + botChoice + '\nReward: ' + sscdata + ballPayout + '\nNew Balance: ' + sscdata + reward)
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  message.channel.send({embed: eightballed})


} else {
  const unreward = parsedMoney - ballCost
        fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, unreward, function(err) {
          var badtwoball = new Discord.RichEmbed()
        .setColor(colors.system)
        .setTitle('8Ball')
        .setDescription(':x: :8ball: ' + botChoice + '\nCost: ' + sscdata + ballCost + '\nNew Balance: ' + sscdata + unreward)
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    message.channel.send({embed: badtwoball})
        });
}
});
    });

        });
      });      });
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
            .setDescription('You do not have the sufficient funds to use the mystical 8Ball\nBalance: `'+ sscdata + '0`\nBalance Required: `' + sscdata +'5`')                               
        console.log("The file was saved!");
        message.channel.send({embed: newbal}).then(message => {
            message.channel.stopTyping()
        })
            });

    }

  });

  });
} else {
  // litemode
  var questionembed = 'You must provide a question to ask\n' +
            data.prefix + '8ball <question>\n<question> = Question for the 8Ball'

  let question = message.content.split(' ').slice(1).join(' ')

request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
  const botChoice = opts[Number(body)];
if(question.length < 1) return message.channel.send(boxen(questionembed, {padding: 1})).catch(console.error);

if(botChoice === goodChoice) {
  var eightballed = ':white_check_mark: :8ball: ' + botChoice
    message.channel.send(eightballed)
} else {
  var badtwoball = ':x: :8ball: ' + botChoice
    message.channel.send(badtwoball)
}

})
}
});
}
module.exports.help = {
  name: "8ball",
  info: "Have your questions answered by the mystical 8Ball",
  usage: "8Ball <question>"
}
