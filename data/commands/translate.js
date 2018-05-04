const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const translate = require('translate')
const fs = require('fs')
module.exports.run = (client, message, args, data, game, announcement, colors) => {
    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  fs.readFile(`./data/serverdata/${message.guild.id}/litemode.txt`, function (err, litedata) {
    if (!litedata.includes('true')) {
    message.channel.startTyping()
    const modlog = message.guild.channels.find('name', 'mod-log');
    const langs = ['aa','ab','ae','af','ak','am','an','ar','as','av','ay','az','ba','be','bg','bh','bi','bm','bn','bo','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el','en','eo','es','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv','ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it','iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo','za','zh','zu']
    var lang =  args[1]
    var tmsg = message.content.split(lang).slice(1).join(' ')
    var translate = require('translate')
    translate.engine = 'yandex';
    translate.key = data.translateKey
    var tmsgerror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('Translate Error')
        .setDescription('The message you provided has brought up an unexpected error. [This link may help you](https://www.loc.gov/standards/iso639-2/php/code_list.php)')
    var langerror = new Discord.RichEmbed()
        .setColor(colors.critical)
        .setTitle('ISO 639-1 Language Code Error')
        .setDescription('You must provide a ISO 639-1 Language Code or use the correct English spelling to translate. [This link may help you](https://www.loc.gov/standards/iso639-2/php/code_list.php)')
    
    if(!tmsg) return message.channel.send({embed: tmsgerror}).then(message => {
        message.channel.stopTyping()
    }).catch(err => {
        message.channel.send('An error occured: ' + err)
    })
    if(!lang) return message.channel.send({embed: langerror}).then(message => {
        message.channel.stopTyping()
    }).catch(err => {
        message.channel.send('An error occured: ' + err)
    })
    if(lang.length < 2) return message.channel.send({embed: langerror}).then(message => {
        message.channel.stopTyping()
    }) .catch(err => {
        message.channel.send('An error occured: ' + err)
    })
  /*  if(lang.length > 2) return message.channel.send({embed: langerror}).then(message => {
        message.channel.stopTyping()
    }) */
    if(langs.some(languages => lang.includes(languages))) {
    translate(tmsg, lang).then(text => {
        
        if(text.length > 2000) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```').then(message => {
            message.channel.stopTyping()
        })
        message.channel.send(text).then(message => {
            message.channel.stopTyping()
            console.log(boxen('[Translate] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))
            if(modlog) {
                var translatemlembed = new Discord.RichEmbed()
                    .setColor(colors.system)
                    .setTitle('Translate Command Used')
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    modlog.send({embed: translatemlembed})
            }
        }).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
      }).catch(err => {
        message.channel.send('An error occured: ' + err)
    })
    } else {
        message.channel.send({embed: langerror}).catch(console.error);
    }
} else {
    // LiteMode
    message.channel.startTyping()
    const langs = ['aa','ab','ae','af','ak','am','an','ar','as','av','ay','az','ba','be','bg','bh','bi','bm','bn','bo','bs','ca','ce','ch','co','cr','cs','cu','cv','cy','da','de','dv','dz','ee','el','en','eo','es','et','eu','fa','ff','fi','fj','fo','fr','fy','ga','gd','gl','gn','gu','gv','ha','he','hi','ho','hr','ht','hu','hy','hz','ia','id','ie','ig','ii','ik','io','is','it','iu','ja','jv','ka','kg','ki','kj','kk','kl','km','kn','ko','kr','ks','ku','kv','kw','ky','la','lb','lg','li','ln','lo','lt','lu','lv','mg','mh','mi','mk','ml','mn','mr','ms','mt','my','na','nb','nd','ne','ng','nl','nn','no','nr','nv','ny','oc','oj','om','or','os','pa','pi','pl','ps','pt','qu','rm','rn','ro','ru','rw','sa','sc','sd','se','sg','si','sk','sl','sm','sn','so','sq','sr','ss','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tn','to','tr','ts','tt','tw','ty','ug','uk','ur','uz','ve','vi','vo','wa','wo','xh','yi','yo','za','zh','zu']
    var lang =  args[1]
    var tmsg = message.content.split(lang).slice(1).join(' ')
    var translate = require('translate')
    translate.engine = 'yandex';
    translate.key = data.translateKey
    var tmsgerror = 'The message you provided has brought up an unexpected error. **https://www.loc.gov/standards/iso639-2/php/code_list.php**'
    var langerror = 'You must provide a ISO 639-1 Language Code or use the correct English spelling to translate. **https://www.loc.gov/standards/iso639-2/php/code_list.php**'
    
    if(!tmsg) return message.channel.send(tmsgerror).then(message => {
        message.channel.stopTyping()
    }).catch(err => {
        message.channel.send('An error occured: ' + err)
    })
    if(!lang) return message.channel.send(langerror).then(message => {
        message.channel.stopTyping()
    }).catch(err => {
        message.channel.send('An error occured: ' + err)
    })
    if(lang.length < 2) return message.channel.send(langerror).then(message => {
        message.channel.stopTyping()
    }).catch(err => {
        message.channel.send('An error occured: ' + err)
    })

    if(langs.some(languages => lang.includes(languages))) {
    translate(tmsg, lang).then(text => {
        
        if(text.length > 2000) return message.channel.send('```' + boxen('The message you provided has brought up an unexpected error.', {padding: 1}) + '```').then(message => {
            message.channel.stopTyping()
        }).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
        message.channel.send(text).then(message => {
            message.channel.stopTyping()
            console.log(boxen('[Translate] ' + message.guild.name + ' | ' + message.author.tag, {padding: 1}))

        }).catch(err => {
            message.channel.send('An error occured: ' + err)
        })
      }).catch(err => {
        message.channel.send('An error occured: ' + err)
    })
    } else {
        message.channel.send(langerror).catch(console.error);
    }
}
  });

    

}
module.exports.help = {
    name: "translate",
    usage: "translate <language_code> <text>",
    info: "Translate from english to any language."
}