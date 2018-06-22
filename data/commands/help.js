const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
var helpArg = args[1]
var pages = args[2]
console.log('helpArg | ' + helpArg)
console.log('pages | ' + pages)
  if(message.channel.type === 'dm') {
    var dmArg = args[1]
    var dmHelp = new Discord.RichEmbed()
      .setColor(colors.system)
      .setDescription('To get a list of commands available for regular text channels use `' + data.prefix + 'help`')
	  .addField('**Information**', '`help` `ping` `info`')
	  .addField('**Entertainment**', '`rps`')
    if(dmArg === ('dm')) return message.channel.send({embed: dmHelp})
    var dmhelpembed = new Discord.RichEmbed()
  .setColor(colors.system)
    .setTitle('Sunset Commands')
    .setDescription('To get a list of commands available in DM channels use `' + data.prefix + 'help dm`\n\n**Please note that Sunset 6.1 does not have an updated `help` command for DMs. This will be fixed in 6.1.1**')
    .addField('**Information**','`litemode` `support` `changelog` `dbl` `help` `ping` `info`')
    .addField('**Server Info**','`inspect` `serversettings` `invite` `serverinfo` `avatar` `profile`')
    .addField('**Entertainment**','`translate` `cleverbot` `emojify` `fliptext` `figlet` `say` `2ball` `8ball`')
    .addField('**More Entertainment**', '`copycat` `timer` `urban` `google` `coinflip` `roll`')
    .addField('**Economy**', '`atm` `bal` `pay` `freemoney` `lottery` `rob` `clearmoney`')
    .addField('**Content Generation**', '`morsecode` `binary` `url` `base64` `qrcode` `txt`')
    .addField('**Moderation**','`warn` `warnings` `rules` `channelsettings` `mute` `unmute` `ban` `unban` `kick` `purge` `mkchannel` `delchannel` `setnick`')
    .addField('**Other**','`randomcolor`')
    .addField('**Owner Only Commands**','`jsexec` `flush` `settings` `setmoney`')
   return message.channel.send({embed: dmhelpembed})

  }
  if (!fs.existsSync(`./data/serverdata/${message.guild.id}/litemode.txt`)) {
    fs.writeFileSync(`./data/serverdata/${message.guild.id}/litemode.txt`, 'false', function(err) {
    });
  };
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function(err, litedata) {
    if(!litedata.includes('true')) {
// Regular Sunset
function noHelpArg() {
	var noArg = new Discord.RichEmbed()
	.setColor(colors.system)
	.setTitle('Sunset Help')
	.setDescription('The Swiss-Army Knife of Discord Bots. Sunset can suit all of your needs; whether it\'s for fun, moderation, or an economy, Sunset has your back.\n\n' +
				'**Get help on available commands**\n' +
				'I know how hard it can be to learn how to use commands.\n\n' +
				'`' + data.prefix + 'help commands <page>`\n' +
				'The default page is 1 / ' + data.helpPages + '\n\n' + 
				'You can also use *some* commands in DM Channels. Just use `' +data.prefix + 'help` in a DM with Sunset!\n\n' + 
				'**View the `' + data.newversion + '` changelog**\n' + 
				'`' + data.prefix + 'changelog`\n\n')
	.addField('Other Links', '[HackerHub](https://hacker-hub.com/)\n[About the Developer](https://skylarmccauley.hacker-hub.com/)\n[Sunset Website](https://hacker-hub.com/sunset)')
	.addField('Current Announcement', announcement.announce)
.setThumbnail(client.user.displayAvatarURL)
	message.channel.send({embed: noArg})
}
if(!helpArg) {
	return noHelpArg()
}
if(helpArg.includes('commands')) {
function helpPageOne() {
	var helpPageOne = new Discord.RichEmbed()
			.setTitle('Sunset Command Page 1 / ' + data.helpPages)
			.setColor(colors.system)
			.setDescription('Here\'s the first page of commands use `' + data.prefix + 'help commands <page>` to navigate\n\n' +
						'**2ball** - `Have your questions answered by the mystical 2ball`\n' + 
						'**8ball** - `Have your questions answered by the mystical 8ball`\n' +
						'**announce** - `Make announcements in a seperate channel`\n' +
						'**atm** - `Interact with the Per-Server ATM`\n' + 
						'**avarar** - `View the avatar of yourself or of the mentioned member`\n' + 
						'**bal** - `Check the balance of yourself and other members`\n' + 
						'**ban** - `Ban the mentioned member`\n' + 
						'**base64** - `Encode and Decode the provided message in Base64`\n' + 
						'**binary** - `Encode and Decode the provided message in binary`\n' + 
						'**changelog** - `View the changes in this new version of Sunset`\n' +
						'**channelsettings** - `Modify the metadata of the current channel`\n' + 
						'**clearmoney** - `Go off the grid and clear your entire balance and ATM balance`\n' +
						'**cleverbot** - `Chat with CleverBot through the cleverbot.io library`\n' +
						'**coinflip** - `Flip a coin`\n' + 
						'**console** - `Interact with the Sunset CLI')
			.setFooter('Page 1 / ' + data.helpPages)
			.setAuthor(client.user.username, client.user.displayAvatarURL)
			message.channel.send({embed: helpPageOne})
}
function helpPageTwo() {
	var HelpPageTwo = new Discord.RichEmbed()
		.setTitle('Sunset Command Page 2 / ' + data.helpPages)
		.setColor(colors.system)
		.setDescription('**copycat** - `Make a copycat of yourself`\n' + 
					'**dbl** - `Interact with the Discord Bot List API (Coming Soon)`\n' +
					'**delchannel** - `Delete the current text channel`\n' + 
					'**emojify** - `Emojify the provided message if possible`\n' + 
					'**figlet** - `Figletizes the provided message`\n' +
					'**freemoney** - `Earn freemoney, the payout is randomized between $1 and $50`\n' +
					'**google** - `Search Google with the provided search term Note: some search terms may only work in a channel marked as NSFW`\n' +
					'**help** - `Get documentation on available commands`\n' +
					'**info** - `Get info on Sunset`\n' +
					'**inspect** - `Inspect many types of URLs`\n' + 
					'**invite** - `Get an invite to the server for the provided channel`')
		.setFooter('Page 2 / ' + data.helpPages)
		.setAuthor(client.user.username, client.user.displayAvatarURL)
		message.channel.send({embed: HelpPageTwo})
}
function helpPageThree() {
	 var HelpPageThree = new Discord.RichEmbed()
		.setTitle('Sunset Command Page 3 /' + data.helpPages)
		.setColor(colors.system)
		.setDescription('**kick** - `Kick the mentioned member`\n' +
										'**litemode** - `Toggle Sunset LiteMode`\n' +
										'**lottery** - `Buy a lottery ticket Ticket Prices and Payouts are randomized.`\n' +
										'**mkchannel** - `Make a text, voice, or category channel`\n' +
										'**morsecode** - `Encode and Decode the provided message in Morse Code`\n' +
										'**mute** - `Mute the mentioned member`\n' +
										'**pay** - `Pay using your balance`\n' +
										'**ping** - `Ping Sunset**\n' +
										'**profile** - `View the profile of yourself or of the mentioned member`\n' +
										'**purge** - `Bulk Delete up to 200 messages in the current channel`\n' +
										'**qrcode** - `Encode and Recover QR Codes`\n' +
										'**randomcolor** - `Get a random color in Hex, RGB, LAB, and CMYK`\n' +
										'**reverse** - `Reverse Text`\n' +
										'**rob** - `Rob members for their money`\n' +
										'**roll** - `Roll a die`')
		.setFooter('Page 3 / ' + data.helpPages)
		.setAuthor(client.user.username, client.user.displayAvatarURL)
		message.channel.send({embed: HelpPageThree})
		//.setDescription(
}
function helpPageFour() {
	var HelpPageFour = new Discord.RichEmbed()
		.setTitle('Sunset Command Page 4 / ' + data.helpPages)
		.setColor(colors.system)
		.setDescription('**rps** - `Play Rock, Paper, Scissors with Sunset`\n' +
										'**rules** - `View the rules of the server`\n' +
										'**say** - `Returns the message provided in an embed`\n' +
										'**serverinfo** - `View the current server/guild\'s info`\n' +
										'**serversettings** - `Change how Sunset functions for your server`\n' + 
										'**setnick** - `Set the nickname of the mentioned member`\n' +
										'**softban** - `Bans then unbans the mentioned member`\n' + 
										'**support** - `Give some support to the creator of Sunset`\n' +
										'**timer** - `Set a timer for a maximum of 12 hours`\n' +
										'**translate** - `Translate the provided messages from English to the provided language`\n' +
										'**txt** - `Write and Recover text files`\n' +
										'**unban** - `Unban the mentioned member`\n' +
										'**unmute** - `Unmute the mentioned member`\n' +
										'**urban** - `Search the Urban Dictionary for the provided word`\n' +
										'**url** - `Shorten the provided URL`\n' +
										'**warn** - `Warn the mentioned member`\n' +
										'**warnings** - `Check the warnings of the mentioned user`\n')
		.setFooter('Page 4 / ' + data.helpPages)
		.setAuthor(client.user.username, client.user.displayAvatarURL)
		message.channel.send({embed: HelpPageFour})
}
function helpPageFive() {
	var HelpPageFive = new Discord.RichEmbed()
	.setTitle('Sunset Command Page 5 / ' + data.helpPages)
	.setColor(colors.system)
	.setDescription('**jsexec** - `Execute NodeJS through eval`\n' +
									'**flush** - `Flush parts of Sunset`\n' +
									'**settings** - `Change the settings of Sunset`\n' +
									'**setmoney** - `Set the balance of the mentioned member`')
	.setFooter('Page 5 / ' + data.helpPages)
	.setAuthor(client.user.username, client.user.displayAvatarURL)
	message.channel.send({embed: HelpPageFive})
}
var parsedPages = parseFloat(pages)
var parsedMaxPages = parseFloat(data.helpPages)
if(parsedPages < 1) {
	return helpPageOne()
}
if(parsedPages > parsedMaxPages ) {
	return helpPageOne()
}
	if(!pages) {
	return helpPageOne()
}
	if(parsedPages == 1) {
	return helpPageOne()
}
	if(parsedPages == 2) {
	return helpPageTwo()
}
if(parsedPages == 3) {
	return helpPageThree()
}
if(parsedPages == 4) {
	return helpPageFour()
}
if(parsedPages == 5) {
	return helpPageFive()
}


}
  return noHelpArg()

    } else {
			function noHelpArg() {
				var noArg = new Discord.RichEmbed()
				.setColor(colors.system)
				.setTitle('Sunset Help')
				.setDescription('The Swiss-Army Knife of Discord Bots. Sunset can suit all of your needs; whether it\'s for fun, moderation, or an economy, Sunset has your back.\n\n' +
							'**Get help on available commands**\n' +
							'I know how hard it can be to learn how to use commands.\n\n' +
							'`' + data.prefix + 'help commands <page>`\n' +
							'The default page is 1 / ' + data.helpPages + '\n\n')
				.addField('Other Links', '[HackerHub](https://hacker-hub.com/)\n[About the Developer](https://skylarmccauley.hacker-hub.com/)\n[Sunset Website](https://hacker-hub.com/sunset)')
				.addField('Current Announcement', data.announcement)
			.setThumbnail(client.user.displayAvatarURL)
				message.channel.send({embed: noArg})
			}
			if(!helpArg) {
				return noHelpArg()
			}
			if(helpArg.includes('commands')) {
			function helpPageOne() {
				var helpPageOne = new Discord.RichEmbed()
						.setTitle('Sunset Command Page 1 / ' + data.helpPages)
						.setColor(colors.system)
						.setDescription('Here\'s the first page of commands use `' + data.prefix + 'help commands <page>` to navigate\n\n' +
									'**2ball** - `Have your questions answered by the mystical 2ball`\n' + 
									'**8ball** - `Have your questions answered by the mystical 8ball`\n' +
									'**announce** - `Make announcements in a seperate channel`\n' +
									'**avarar** - `View the avatar of yourself or of the mentioned member`\n' + 
									'**ban** - `Ban the mentioned member`\n' + 
									'**base64** - `Encode and Decode the provided message in Base64`\n' + 
									'**binary** - `Encode and Decode the provided message in binary`\n' + 
									'**channelsettings** - `Modify the metadata of the current channel`\n' + 
									'**cleverbot** - `Chat with CleverBot through the cleverbot.io library`\n' +
									'**coinflip** - `Flip a coin`')
						.setFooter('Page 1 / ' + data.helpPages)
						.setAuthor(client.user.username, client.user.displayAvatarURL)
						message.channel.send({embed: helpPageOne})
			}
			function helpPageTwo() {
				var HelpPageTwo = new Discord.RichEmbed()
					.setTitle('Sunset Command Page 2 / ' + data.helpPages)
					.setColor(colors.system)
					.setDescription('**copycat** - `Make a copycat of yourself`\n' + 
								'**cowsay** - `Returns the provided message in a cowsay code block`\n' + 
								'**cowthink** - `Returns the provided message in a cowthink code block`\n' +
								'**dbl** - `Interact with the Discord Bot List API (Coming Soon)`\n' +
								'**delchannel** - `Delete the current text channel`\n' + 
								'**economysettings** - `Change how the Sunset Economy functions`\n' +
								'**emojify** - `Emojify the provided message if possible`\n' + 
								'**figlet** - `Figletizes the provided message`\n' +
								'**google** - `Search Google with the provided search term Note: some search terms may only work in a channel marked as NSFW`\n' +
								'**help** - `Get documentation on available commands`\n' +
								'**info** - `Get info on Sunset`\n' +
								'**inspect** - `Inspect many types of URLs`\n' + 
								'**invite** - `Get an invite to the server for the provided channel`')
					.setFooter('Page 2 / ' + data.helpPages)
					.setAuthor(client.user.username, client.user.displayAvatarURL)
					message.channel.send({embed: HelpPageTwo})
			}
			function helpPageThree() {
				 var HelpPageThree = new Discord.RichEmbed()
					.setTitle('Sunset Command Page 3 /' + data.helpPages)
					.setColor(colors.system)
					.setDescription('**kick** - `Kick the mentioned member`\n' +
													'**lastqr** - `Recover the most recent QR Code generated`\n' +
													'**litemode** - `Toggle Sunset LiteMode`\n' +
													'**mkchannel** - `Make a text, voice, or category channel`\n' +
													'**morsecode** - `Encode and Decode the provided message in Morse Code`\n' +
													'**mute** - `Mute the mentioned member`\n' +
													'**ping** - `Ping Sunset**\n' +
													'**profile** - `View the profile of yourself or of the mentioned member`\n' +
													'**purge** - `Bulk Delete up to 200 messages in the current channel`\n' +
													'**qrcode** - `Encode and Recover QR Codes`\n' +
													'**randomcolor** - `Get a random color in Hex, RGB, LAB, and CMYK`\n' +
													'**reverse** - `Reverse Text`\n' +
													'**roll** - `Roll a die`')
					.setFooter('Page 3 / ' + data.helpPages)
					.setAuthor(client.user.username, client.user.displayAvatarURL)
					message.channel.send({embed: HelpPageThree})
					//.setDescription(
			}
			function helpPageFour() {
				var HelpPageFour = new Discord.RichEmbed()
					.setTitle('Sunset Command Page 4 / ' + data.helpPages)
					.setColor(colors.system)
					.setDescription('**rps** - `Play Rock, Paper, Scissors with Sunset`\n' +
													'**rules** - `View the rules of the server`\n' +
													'**say** - `Returns the message provided in an embed`\n' +
													'**serverinfo** - `View the current server/guild\'s info`\n' +
													'**serversettings** - `Change how Sunset functions for your server`\n' + 
													'**setnick** - `Set the nickname of the mentioned member`\n' +
													'**softban** - `Bans then unbans the mentioned member`\n' + 
													'**support** - `Give some support to the creator of Sunset`\n' +
													'**timer** - `Set a timer for a maximum of 12 hours`\n' +
													'**translate** - `Translate the provided messages from English to the provided language`\n' +
													'**txt** - `Write and Recover text files`\n' +
													'**unban** - `Unban the mentioned member`\n' +
													'**unmute** - `Unmute the mentioned member`\n' +
													'**urban** - `Search the Urban Dictionary for the provided word`\n' +
													'**url** - `Shorten the provided URL`\n' +
													'**warn** - `Warn the mentioned member`\n' +
													'**warnings** - `Check the warnings of the mentioned user`\n')
					.setFooter('Page 4 / ' + data.helpPages)
					.setAuthor(client.user.username, client.user.displayAvatarURL)
					message.channel.send({embed: HelpPageFour})
			}
			function helpPageFive() {
				var HelpPageFive = new Discord.RichEmbed()
				.setTitle('Sunset Command Page 5 / ' + data.helpPages)
				.setColor(colors.system)
				.setDescription('**jsexec** - `Execute NodeJS through eval`\n' +
												'**flush** - `Flush parts of Sunset`\n' +
												'**settings** - `Change the settings of Sunset`')
				.setFooter('Page 5 / ' + data.helpPages)
				.setAuthor(client.user.username, client.user.displayAvatarURL)
				message.channel.send({embed: HelpPageFive})
			}
			var parsedPages = parseFloat(pages)
var parsedMaxPages = parseFloat(data.helpPages)
if(parsedPages < 1) {
	return helpPageOne()
}
if(parsedPages > parsedMaxPages ) {
	return helpPageOne()
}
	if(!pages) {
	return helpPageOne()
}
	if(parsedPages == 1) {
	return helpPageOne()
}
	if(parsedPages == 2) {
	return helpPageTwo()
}
if(parsedPages == 3) {
	return helpPageThree()
}
if(parsedPages == 4) {
	return helpPageFour()
}
if(parsedPages == 5) {
	return helpPageFive()
}
		}
		return noHelpArg()
      
    }
  });

}
module.exports.help = {
  name: "help",
  info: "Get documentation on all of Sunset's commands",
  usage: "help"
}
