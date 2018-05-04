const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
module.exports.run = (client, message, args, data, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
    var balMember = message.guild.member(message.mentions.users.first());
    var action = args[1]
    var item = args[2]
    var price = args[3]
    var quantity = args[4]
    const modlog = message.guild.channels.find('name', 'mod-log');

   // if(!action) {
        var economy = new Discord.RichEmbed()
            .setColor(colors.system)
            .setTitle('Economy')
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription('This command will be utilized more in the future.')
            .addField('Check your Balance', '`bal`')
            .addField('Rob another Member', '`rob`')
            .addField('Clear your Balance', '`clearmoney`')
            .addField('Attempt to win the Lottery', '`lottery`')
            .addField('Interact with the ATM', '`atm`')
           return message.channel.send({embed: economy})
   /* }
  if(action.includes('sell')) {
    if(message.author.id !== '270375857384587264') return;
    var shop = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle(':|')
        .setDescription('No args provided')
    if(!item) return message.channel.send({embed: shop})

    var itemToSell = {
        product: item,
        cost: price,
        amount: quantity,
        user: message.author.id
    }
    var dataToWrite = JSON.stringify(itemToSell, null, 2);
    fs.readFile('./data/serverdata/shop/shop.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.push({
            product: item,
            cost: price,
            amount: quantity,
            user: message.author.id
        }
        ); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('./data/serverdata/shop/shop.json', json, 'utf8'); // write it back 
    }});

  } */

    } else {
        message.channel.send('This command is not available for Sunset LiteMode')
    }
});

}
module.exports.help = {
    name: "economy",
    usage: "economy",
    info: "Check the economy!"
}