const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const PythonShell = require('python-shell');
module.exports.run = (client, message, args, data, game, announcement) => {
    
    //you can use error handling to see if there are any errors
    PythonShell.run('./data/scripts/temp.py',/* options,*/ function (err, results) { 
        var temperature = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setTitle('Server Temperature')
            .setDescription(results)
    message.channel.send({embed: temperature})
    });
}
module.exports.help = {
  name: "temp",
  info: "Check the server's temperature",
  usage: "temp"
}
