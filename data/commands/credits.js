const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const boxen = require('boxen');
module.exports.run = (client, message, args, data, game, announcement) => {
    const modlog = message.guild.channels.find('name', 'mod-log');
    const creditsembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Credits')
        .addField('Helpers', `${client.users.get("313748991609274368").username}#${client.users.get("313748991609274368").discriminator} and The Discord.js Discord Server`, true)
        .addField('Testers', `${client.users.get("273169968202252289").username}#${client.users.get("273169968202252289").discriminator}, ${client.users.get("250764315253145600").username}#${client.users.get("250764315253145600").discriminator}, ${client.users.get("250764315253145600").username}#${client.users.get("250764315253145600").discriminator}, ${client.users.get("313748991609274368").username}#${client.users.get("313748991609274368").discriminator}, ${client.users.get("255000566634250241").username}#${client.users.get("255000566634250241").discriminator}, ${client.users.get("119208956252913664").username}#${client.users.get("119208956252913664").discriminator}, ${client.users.get("263528837885853697").username}#${client.users.get("263528837885853697").discriminator}`)
        .addField('Code Contributors', `${client.users.get("273169968202252289").username}#${client.users.get("273169968202252289").discriminator} and Felix`)
        message.channel.send({embed: creditsembed})
        console.log(boxen('[Credits] ' + message.guild.name + ' | ' + message.author.tag))
    const creditsmlembed = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('Credits Command Used')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        if(modlog) {
            modlog.send({embed: creditsmlembed})
        }
}
module.exports.help = {
    name: "credits",
    info: "Shows all of the people who helped out with the development of Sunset and Sunset Lite",
    usage: "credits"
}