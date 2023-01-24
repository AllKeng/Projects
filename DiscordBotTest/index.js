/**
 * Created by Allen Keng
 * npm install init (COVERS ALL OF THIS)
 * npm install node-fetch@2
 * npm install discordaudio
 * npm install discord.js
 */

const { AudioManager } = require('discordaudio');
const discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');

const { Client, GatewayIntentBits, EmbedBuilder, ActivityType} = require(`discord.js`);
const config = {
    token: 'Your-Secret-Token',
    prefix: '>'
};

const connections = new Map();
const audioManager = new AudioManager();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

client.once('ready', () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity("over you. >help", {
        type: ActivityType.Watching,
      });
});

client.on('messageCreate', async message => {
    if(message.author.bot || message.channel.type === discord.ChannelType.DM) return;
    
    if(!message.content.startsWith(config.prefix)) return;
    
    let args = message.content.substring(config.prefix.length).split(" ");
    
    const uvc = message.member.voice.channel;
    switch(args[0].toLowerCase()){
        //////////////////////////////////////////////////////////////////////////
        case 'help': 
        // Did not automate because I am lazy. 
        const queueEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`**__Command List__**`)
            .setDescription(`
                **help** : displays the command list \n
                **spam** : pings mentioned user \`>spam @SomeSortOfBot 3\` \n
                **randomint** : returns a random int between 1 and the given number \`>randomint 4\` \n
                **mp3list** : returns list of saved mp3s \n
                **mp3desc** : modifies description of given mp3 file >mp3desc \`<fileName>\` <desc>' \n
                **save** : saves the attached mp3 file \n
                **play** : when in vc, plays mp3 file if saved \`>play JAFrench.mp3\` \n
                **stop** : stops and disconnects bot \`>stop\` \n
                **queue** : displays queue \`>queue\` \n
                **skip** : skips current audio \`>skip\` \n
                 `);
            message.channel.send({embeds: [queueEmbed]});
            break;
        //////////////////////////////////////////////////////////////////////////
        case 'mp3list':
            try {
                var desc = fs.readFileSync(`audioList.txt`,`utf8`);
                desc = "**" + desc.replace( new RegExp("\n","g"),"\n**");
                desc = desc.replace( new RegExp(".mp3 ","g"),".mp3**");
            } 
            catch(err) {
                return message.channel.send('Failed to read audioList.txt');
            }
            const embed2 = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`**__mp3 List__**`)
            .setDescription(desc.substring(0,desc.length-3));
            
            message.channel.send({embeds: [embed2]});
            break;
            //////////////////////////////////////////////////////////////////////////
        case 'mp3desc':
            if(!args[1] || !args[2]) { 
                return message.channel.send('Provide command in form of >mp3desc \`<fileName>\` <desc>');
            }
            try { str = fs.readFileSync(args[1],'utf8') }
            catch(err) {
                return message.channel.send({content: `Please provide a valid mp3 name`});
            };
            var description = message.content.substring(message.content.indexOf(args[2]));
            // Read file into a string
            console.log(description);
            fs.readFile('audioList.txt', 'utf-8', (err, contents) => {
                if (err) {
                    return console.error(err)
                }
                // Replace string occurrences
                var start = contents.substring( contents.indexOf(`${args[1]} :`) );
                var end = start.indexOf(`\n`);
                var find = start.substring(0,end);
                const updated = contents.replace(new RegExp(find,"g"), 
                    `${args[1]} : ${description}`);
                
                // Write back to file
                fs.writeFile('audioList.txt', updated, 'utf-8', err2 => {
                    if (err2) {
                        console.log(err2)
                    }
                    })
                })
            message.channel.send("Description was successfully modified.");
            break;
        //////////////////////////////////////////////////////////////////////////
        case 'spam':
            let numTimes = 3;
            const taggedUser = message.mentions.users;
            if(!args[1] || taggedUser.length < 1) {
                console.log("Exit spam ")
                return;
            }
            if(isNumber(args[args.length-1]) === true) { // checks if last element is a number
                numTimes = Math.min(args[args.length-1],10); // caps at 10 mentions
            }
            let msg = "";
            taggedUser.each( tagged => {
                msg += `<@${tagged.id}> `
            })
            //  console.log(msg + numTimes);
            for(i = 0; i < numTimes; i++) {
                message.channel.send(msg);
            }
            break;
        //////////////////////////////////////////////////////////////////////////
        case 'save': {
            if (message.attachments.size > 0) {
                //let file = message.attachments.first();
                message.attachments.each(file => {
                //message.channel.send( {files: [file]} );
                if(!file.name.endsWith('mp3')) {
                    message.channel.send(`Please provide an mp3 file.`);
                }
                else {
                    fetch(file.proxyURL)
                        .then(res =>
                            res.body.pipe(fs.createWriteStream(`${file.name}`))
                    )
                    // add to list
                    fs.writeFile('audioList.txt', `${file.name} : ${file.name}Desc\n`,  {'flag':'a'},  function(err) {
                        if (err) {
                            return console.error(err);
                        }
                    });
                    message.channel.send(`Saved file \`${file.name}\``);
                    //playAudio(message,uvc,file.name);
                    }
                })
            }
            else {
                message.channel.send('No attachment found');
            }
            break;
        }
        //////////////////////////////////////////////////////////////////////////
        case 'pfp': 
            const taggedUser1 = message.mentions.users.first();
            let currUser = message.author;
            if(taggedUser1) currUser = taggedUser1; 
            return message.channel.send(currUser.displayAvatarURL());
        
        //////////////////////////////////////////////////////////////////////////
        case 'randomint':
            if(!args[1] || isNaN(args[1]) === true || args[1] < 1) {
                return message.reply({
                    content: `You must provide an integer value above 0.`,
                    allowedMentions: {
                        repliedUser: false
                    }    
                });
            }
            let number = Math.floor(Math.random() * Math.floor(args[1])) + 1;
            return message.channel.send(`RandomInt: ${number}`);
        //////////////////////////////////////////////////////////////////////////
        case 'play':
            if(!uvc) return message.channel.send({content: `Please join a voice channel in order to play a song!`});
            if(!args[1]) return message.channel.send({content: `Please provide an mp3 file`});
            try { str = fs.readFileSync(args[1],'utf8') }
            catch(err) {
                return message.channel.send({content: `Please provide a valid mp3 name`});
            };
            setTimeout( err => {
                
                playAudio(message, uvc, args[1]),2000
            });
            break;
        //////////////////////////////////////////////////////////////////////////
        case 'skip':
            if(!message.member.voice.channel) return message.channel.send({content: `Please join a voice channel!`});
            try { 
                audioManager.skip(uvc).then(() => message.channel.send({content: `Successfully skipped the song!`})).catch(err => {
                    console.log(err);
                    message.channel.send({content: `There was an error while skipping the song!`});
                });
              }
            catch(err) {
                return message.channel.send({content: `There is currently nothing playing!`});
            }      
            break;
        //////////////////////////////////////////////////////////////////////////
        case 'stop':
            if(!message.member.voice.channel) return message.channel.send({content: `Please join a voice channel!`});
                try { 
                    audioManager.stop(uvc);
                    message.channel.send({content: `Player successfully stopped!`});  }
                catch(err) {
                    return message.channel.send({content: `There is currently nothing playing!`});
                }            
            break;
        //////////////////////////////////////////////////////////////////////////
        case 'queue':
            if(!message.member.voice.channel) return message.channel.send({content: `Please join a voice channel!`});
                try {
                    const queue = audioManager.queue(uvc).reduce((text, song, index) => {
                        if(song.title) text += `**[${index + 1}]** ${song.title}\n`;
                        else text += `**[${index + 1}]** ${song.url}\n`;
                        return text;
                    }, ``);
                    const queueEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`Queue`)
                    .setDescription(queue);
                    message.channel.send({embeds: [queueEmbed]});
                    }
                catch(err) {
                    return message.channel.send({content: `There is currently nothing playing!`});
                }
            break;
        //////////////////////////////////////////////////////////////////////////
        case 'volume':
            if(!args[1]) return message.channel.send({content: `Please provide the volume`});
            try {
                if(Number(args[1]) < 1 || Number(args[1]) > 10) return message.channel.send({content: `Please provide a volume between 1-10`});
                    audioManager.volume(uvc, Number(args[1]));
            }
            catch(err) { return message.channel.send({content: `There is currently nothing playing!`}); }
            break;
        //////////////////////////////////////////////////////////////////////////
        }
    }
);

/**
 * This function plays the given file name in the voice channel that the author of the message
 * is currently in.
 * @param {*} message in order to send message to the right channel. 
 * @param {*} voicechannel in order to join the right vc and play the audio 
 * @param {*} file in order to play the given audio
 */
function playAudio(message, voicechannel, file) {
    audioManager.play(voicechannel, file, {
        quality: 'high',
        audiotype: 'arbitrary',
        volume: 10
    }).then(queue => {
        connections.set(voicechannel.id, voicechannel);
        if(queue === false) message.channel.send({content: `Your song is now playing!`});
        else message.channel.send({content: `Your song has been added to the queue!`});
    }).catch(err => {
        console.log(err);
        message.channel.send({content: `There was an error while trying to connect to the voice channel!`});
    });
}

/**
 * Unused function that can be used in the future. Downloads the given url image to the directory
 * @param {*} url image to be downloaded
 */
function download(url){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(url.name));
}
/**
 * Checks to see if the given input is a number
 * @param {*} value 
 * @returns 
 */
function isNumber(value) {
    const conv = +value;
    if (conv) {
        return true;
    } else {
        return false;
    }
}

client.login("");
