
/*
   ________  ___  ___  ________   ________  _______  _________                
 |\   ____\|\  \|\  \|\   ___  \|\   ____\|\  ___ \|\___   ___\              
 \ \  \___|\ \  \\\  \ \  \\ \  \ \  \___|\ \   __/\|___ \  \_|              
  \ \_____  \ \  \\\  \ \  \\ \  \ \_____  \ \  \_|/__  \ \  \               
   \|____|\  \ \  \\\  \ \  \\ \  \|____|\  \ \  \_|\ \  \ \  \              
     ____\_\  \ \_______\ \__\\ \__\____\_\  \ \_______\  \ \__\             
    |\_________\|_______|\|__| \|__|\_________\|_______|   \|__|             
    \|_________|                   \|_________|

*/  
const fs = require("fs");
fs.readFile(`./data/brain/startup.txt`, 'utf8', function(err, data) {
  console.log(data)
})

const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const client = new Discord.Client({autoReconnect:true});
const data = require("./data/brain/data.json");
const datajson = require('./data/brain/data.json')
const announcement = require("./data/brain/announcement.json");
const game = require("./data/brain/game.json");

const prefix = data.prefix
const token = data.token
const request = require("request")
const requestpn = require('request-promise-native');
 
const pusage = require('pidusage')
const DBLToken = data.dbltoken
const moment = require('moment')





// Credits for this code go to Felix, Corbs, Danny, and Jackalope :)
// Mostly Felix and Danny
// Mostly Felix


const botjoinembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('From Sunrise to Sunset I\'ll be there ;)')
  .setDescription('Thank you for inviting Sunset to your server. \n I want you to know that I am **always** recieving updates so you may see some new features pop up here and there.\nI also have a feature to set server-specific rules. All you have to do is send `rules set <rules>` and your done! \nI also log some data for moderation and for quality assurance, but I don\'t thnk that will be a problem.')
  .addField('**Here is the current Announcement**', '```' + announcement.announce + '```')
  .addField('**Current Version**', '```' + data.newversion + '```')
client.on("message", (message) => {

  const args = message.content.split(" ");
  const command = message.content.split(" ")[0]
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if(!command.startsWith(prefix)) return;
  const cmd = client.commands.get(command.slice(prefix.length))
  if(cmd)
    cmd.run(client, message, args, data, game, announcement, datajson)
})
client.on("error", (error) => {
console.log('A WebSocket error has occured: ' + error)
});
client.on("message", (message) => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if(message.content.startsWith(`<@${client.user.id}>`)) {
    var mentionedembed = new Discord.RichEmbed()
      .setColor(data.embedcolor)
      .setTitle('Prefix')
      .setDescription('```' + prefix + '```')
      .setFooter(prefix + 'help')
      message.channel.send({embed: mentionedembed})
  }
  var guild = message.guild
  if (!fs.existsSync(`./data/serverdata/${guild.id}`)) {
    fs.mkdirSync(`./data/serverdata/${guild.id}`);
 }
 if (!fs.existsSync(`./data/serverdata/${guild.id}/settings`)) {
  fs.mkdirSync(`./data/serverdata/${guild.id}/settings`);
}
 if (!fs.existsSync(`./data/serverdata/${guild.id}/base64`)) {
  fs.mkdirSync(`./data/serverdata/${guild.id}/base64`);
}
if (!fs.existsSync(`./data/serverdata/${guild.id}/binary`)) {
fs.mkdirSync(`./data/serverdata/${guild.id}/binary`);
}
if (!fs.existsSync(`./data/serverdata/${guild.id}/economy`)) {
fs.mkdirSync(`./data/serverdata/${guild.id}/economy`);
}
if (!fs.existsSync(`./data/serverdata/${guild.id}/economy/atm`)) {
fs.mkdirSync(`./data/serverdata/${guild.id}/economy/atm`);
}if (!fs.existsSync(`./data/serverdata/${guild.id}/qrcode`)) {
fs.mkdirSync(`./data/serverdata/${guild.id}/qrcode`);
}  
if (!fs.existsSync(`./data/serverdata/${guild.id}/rule`)) {
fs.mkdirSync(`./data/serverdata/${guild.id}/rule`);
}
if (!fs.existsSync(`./data/serverdata/${guild.id}/text`)) {
fs.mkdirSync(`./data/serverdata/${guild.id}/text`);
}
if (!fs.existsSync(`./data/serverdata/${guild.id}/warns`)) {
fs.mkdirSync(`./data/serverdata/${guild.id}/warns`);
}
if (!fs.existsSync(`./data/serverdata/timer/`)) {
  fs.mkdirSync(`./data/serverdata/timer/`);
  }
if (!fs.existsSync(`./data/serverdata/timer/${guild.id}/`)) {
  fs.mkdirSync(`./data/serverdata/timer/${guild.id}/`);
  }
  if (!fs.existsSync(`./data/serverdata/economy/`)) {
    fs.mkdirSync(`./data/serverdata/economy/`);
    }
  if (!fs.existsSync(`./data/serverdata/economy/${guild.id}/`)) {
    fs.mkdirSync(`./data/serverdata/economy/${guild.id}/`);
    }
fs.exists(`./data/serverdata/${guild.id}/economy/${message.author.id}.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/economy/${message.author.id}.txt`, '0', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/economy/atm/${message.author.id}.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/economy/atm/${message.author.id}.txt`, '0', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/currency.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/currency.txt`, '$', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/lotterychance.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/lotterychance.txt`, '0.08', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/lotterypayout.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/lotterypayout.txt`, '5000', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/2ballcost.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/2ballcost.txt`, '10', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/2ballpayout.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/2ballpayout.txt`, '25', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, '50', function(err) {
              });
          }
        });
         fs.exists(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, '10', function(err) {
              });
          }
        });
fs.exists(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, '20', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, '35', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/lotterycost.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/lotterycost.txt`, '500', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/freemoneypayout.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/freemoneypayout.txt`, '50', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/robpayout.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/robpayout.txt`, '.11', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/workwait.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/workwait.txt`, '5000', function(err) {
      });
  }
});
fs.exists(`./data/serverdata/${guild.id}/settings/workpayout.txt`, function(exists) {
  if (!exists) {
      fs.writeFile(`./data/serverdata/${guild.id}/settings/workpayout.txt`, '1000', function(err) {
      });
  }
});

})

client.commands = new Discord.Collection();
  fs.readdir("./data/commands", (err, files) => {
    if(err) console.error(err)
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if(jsFiles.length <= 0) {
      console.log("No commands loaded")
      return;
    }
    console.log('[Commands Loaded] ' + jsFiles.length)

    jsFiles.forEach((f, i) => {
      const props = require("./data/commands/" + f)
      client.commands.set(props.help.name, props)
    })
  })
  client.on("ready", () => {
    
    console.log('[Logged in] ' + client.user.tag)
    console.log('[Time] ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
    console.log('[Announcement] ' + announcement.announce)
    console.log('[Game]', game.game)
    console.log('[Activity]', game.activity)
    pusage.unmonitor(process.pid)
    requestpn.post({
            uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
            headers: {
                Authorization: DBLToken, // Insert token here
            },
            json: true,
            body: {
                server_count: client.guilds.size,
            },
        });
    if(game.activity.includes('PLAYING')) {
      client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'PLAYING' })
      return;
  }
  if(game.activity.includes('STREAMING')) {
      client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'STREAMING' })
      return;
  }
  if(game.activity.includes('LISTENING')) {
      client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'LISTENING' })
      return;
  }
  if(game.activity.includes('WATCHING')) {
      client.user.setActivity(game.game + ' | ' + data.prefix + 'help', { type: 'WATCHING' })
      return;
  }
  if (fs.existsSync(`./data/serverdata/timer/`)) {
    fs.unlinkSync(`./data/serverdata/timer/`);
    }
    if (fs.existsSync(`./data/serverdata/economy/`)) {
      fs.unlinkSync(`./data/serverdata/economy/`);
      }
  });
  client.on('disconnect', event => {
    console.log('[DISCONNECTED] Attempting to reconnecting')
    client.login(token)
  })
  client.on('guildBanAdd', (guild, user) => {
    var modlog = guild.channels.find('name', 'mod-log')
    var announcements = guild.channels.find('name', 'announcements');
    

      var newbanembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('User Banned :hammer:')
        .setDescription('The user ' + user.tag + ' has been met with the Ban Hammer :hammer: ')
        .setAuthor(user.username ,user.avatarURL)
        
      if(modlog) {
        modlog.send({embed: newbanembed}).catch(console.error);
      }
      if (announcements) {
       announcements.send({embed: newbanembed}).catch(console.error);
      }
  });
  client.on('guildMemberUpdate', (message, oMember, nMember) => {
    var modlog = message.guild.channels.find('name', 'mod-log')
    var guildMemberUpdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Guild Member Update')
      .setDescription(oMember + ' | ' + nMember)
      
      if(modlog) return modlog.send({embed: guildMemberUpdateembed}).catch(console.error);
  });
  client.on('guildUpdate', (oGuild, nGuild) => {
    var modlog = oGuild.channels.find('name', 'mod-log')
    var guildupdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Guild Updated')
      .setDescription('The Guild has been updated! \n \n **Before:** ' + oGuild + ' \n \n **After:** ' + nGuild)
      
      if(modlog) return modlog.send({embed: guildupdateembed}).catch(console.error);
  });
  client.on('guildBanRemove', (guild, user) => {
    var modlog = guild.channels.find('name', 'mod-log')
    var announcements = guild.channels.find('name', 'announcements');
    var newunbanembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('User Unbanned')
      .setDescription('The user ' + user.tag + ' has been unbanned')
      .setAuthor(user.username , user.displayAvatarURL)
      
      if(modlog) {
        modlog.send({embed: newunbanembed}).catch(console.error);
      }
      if (announcements) {
       announcements.send({embed: newunbanembed}).catch(console.error);
      }
  });
  client.on("guildDelete", guild => {
    console.log('Removed from 1 server | ' + guild).catch(console.error);
      requestpn.post({
            uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
            headers: {
                Authorization: DBLToken, // Insert token here
            },
            json: true,
            body: {
                server_count: client.guilds.size,
            },
       }); 

  });
  client.on("guildCreate", guild => {
    guild.owner.send({embed: botjoinembed}).catch(console.error);
       requestpn.post({
              uri: `https://discordbots.org/api/bots/${client.user.id}/stats`,
              headers: {
                  Authorization: DBLToken, // Insert token here
              },
              json: true,
              body: {
                  server_count: client.guilds.size,
              },
          });
          if (!fs.existsSync(`./data/serverdata/${guild.id}`)) {
            fs.mkdirSync(`./data/serverdata/${guild.id}`);
         }
         if (!fs.existsSync(`./data/serverdata/${guild.id}/settings`)) {
          fs.mkdirSync(`./data/serverdata/${guild.id}/settings`);
        }
         if (!fs.existsSync(`./data/serverdata/${guild.id}/base64`)) {
          fs.mkdirSync(`./data/serverdata/${guild.id}/base64`);
        }
        if (!fs.existsSync(`./data/serverdata/${guild.id}/binary`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}/binary`);
        }
        if (!fs.existsSync(`./data/serverdata/${guild.id}/economy`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}/economy`);
        }
        if (!fs.existsSync(`./data/serverdata/${guild.id}/economy/atm`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}/economy/atm`);
        }if (!fs.existsSync(`./data/serverdata/${guild.id}/qrcode`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}/qrcode`);
        }  

        if (!fs.existsSync(`./data/serverdata/${guild.id}/rule`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}/rule`);
        }
        if (!fs.existsSync(`./data/serverdata/${guild.id}/text`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}/text`);
        }
        if (!fs.existsSync(`./data/serverdata/${guild.id}/warns`)) {
        fs.mkdirSync(`./data/serverdata/${guild.id}/warns`);
        }
        if (!fs.existsSync(`./data/serverdata/timer/`)) {
          fs.mkdirSync(`./data/serverdata/timer/`);
          }
        if (!fs.existsSync(`./data/serverdata/timer/${guild.id}/`)) {
          fs.mkdirSync(`./data/serverdata/timer/${guild.id}/`);
          }
          if (!fs.existsSync(`./data/serverdata/economy/`)) {
            fs.mkdirSync(`./data/serverdata/economy/`);
            }
          if (!fs.existsSync(`./data/serverdata/economy/${guild.id}/`)) {
            fs.mkdirSync(`./data/serverdata/economy/${guild.id}/`);
            }

        fs.exists(`./data/serverdata/${guild.id}/settings/currency.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/currency.txt`, '$', function(err) {
              });
          }
        }); 
        
        fs.exists(`./data/serverdata/${guild.id}/settings/lotterychance.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/lotterychance.txt`, '0.08', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/lotterycost.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/lotterycost.txt`, '500', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/2ballcost.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/2ballcost.txt`, '10', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/2ballpayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/2ballpayout.txt`, '25', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, '50', function(err) {
              });
          }
        });
         fs.exists(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, '10', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballcost.txt`, '20', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/8ballpayout.txt`, '35', function(err) {
              });
          }
        });
        
        fs.exists(`./data/serverdata/${guild.id}/settings/lotterypayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/lotterypayout.txt`, '5000', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/freemoneypayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/freemoneypayout.txt`, '50', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/robpayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/robpayout.txt`, '.11', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/workwait.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/workwait.txt`, '5000', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/workpayout.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/workpayout.txt`, '1000', function(err) {
              });
          }
        });
        fs.exists(`./data/serverdata/${guild.id}/settings/lightmode.txt`, function(exists) {
          if (!exists) {
              fs.writeFile(`./data/serverdata/${guild.id}/settings/lightmode.txt`, 'false', function(err) {
              });
          }
        });

  });
  client.on('guildMemberAdd', member => {

    var modlog = member.guild.channels.find('name', 'mod-log');
  var announcements = member.guild.channels.find('name', 'announcements');

    var newuserjoinembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Member Announcement')
      .setDescription('A new user has joined the server :D \nPlease welcome ' + member.user.tag + ' !')
      

      if(modlog) {
        modlog.send({embed: newuserjoinembed}).catch(console.error);
      }
      if (announcements) {
       announcements.send({embed: newuserjoinembed}).catch(console.error);
      }
  });
  client.on('guildMemberRemove', member => {
    var modlog = member.guild.channels.find('name', 'mod-log');
  var announcements = member.guild.channels.find('name', 'announcements');
      var olduserjoinembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Member Announcement')
        .setDescription('A user has left the server D: \nPlease say your Farewells to ' + member.user.tag + ' !')
        
        if(modlog) {
          modlog.send({embed: olduserjoinembed}).catch(console.error);
        }
        if (announcements) {
         announcements.send({embed: olduserjoinembed}).catch(console.error);
        }
  });
  client.on('channelUpdate', (oChannel, nChannel) => {
    var modlog = oChannel.guild.channels.find('name', 'mod-log');
      var channelupdateeventembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Channel Updated')
        .setDescription('**Before:** ' + oChannel + '\n **After:**' + nChannel)
        
        if(modlog) return modlog.send({embed: channelupdateeventembed}).catch(console.error);
  });
  client.on('channelPinsUpdate', (channel, time) => {
    var modlog = channel.guild.channels.find('name', 'mod-log');
      var channelpinsupdateembed = new Discord.RichEmbed()
        .setColor('FFCE00')
        .setTitle('Channel Pins Updated')
        .addField(channel.name, time)
        
      if(modlog) return modlog.send({embed: channelpinsupdateembed}).catch(console.error);
  });
  client.on('roleCreate', role => {
    var modlog = role.guild.channels.find('name', 'mod-log');
    var rolecreateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Role Created')
      .setDescription(role)
      
      if(modlog) return modlog.send({embed: rolecreateembed}).catch(console.error);
  });
  client.on('roleDelete', role => {
    var modlog = role.guild.channels.find('name', 'mod-log');
    var roledeleteembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Role Deleted')
      .setDescription(role)
      
      if(modlog) return modlog.send({embed: roledeleteembed}).catch(console.error);
  });
  client.on('roleUpdate', role => {
    var modlog = role.guild.channels.find('name', 'mod-log');
    var roleupdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Role Updated')
      .setDescription(role)
      
      if(modlog) return modlog.send({embed: roleupdateembed}).catch(console.error);
  });
  /*client.on('messageUpdate', (oldMessage, newMessage) => {
    var modlog = oldMessage.guild.channels.find('name', 'mod-log');
    var messageUpdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
     .setTitle("Message Edited")
      .setDescription('Edited by @' + oldMessage.author.username + ' in #' + oldMessage.channel.name + '\n \n **Before:** ' + oldMessage + '\n \n **After:** ' + newMessage)
      
  if(modlog) {
    console.log(' ')
    if(oldMessage.content !== newMessage.content) return modlog.send({embed: messageUpdateembed}).catch(console.error);
  }

  }); */
  client.on('messageDelete', message => {
    var modlog = message.guild.channels.find('name', 'mod-log');
     var messagedelembed = new Discord.RichEmbed()
     .setColor('FFCE00')
     .setTitle('Message Deleted')
     .setDescription(message.author.tag + '\n \n' + message)
     .setAuthor(message.author.username, message.author.displayAvatarURL)
     
     if(modlog) return modlog.send({embed: messagedelembed}).catch(console.error);
  });


client.login(token)
