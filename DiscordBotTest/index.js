const { AudioManager } = require('discordaudio');
const discord = require('discord.js');

const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, CommandInteractionOptionResolver} = require(`discord.js`);
const config = {
    token: 'Your-Secret-Token',
    prefix: '>'
};

const connections = new Map();

const audioManager = new AudioManager();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });

client.once('ready', () => console.log(`${client.user.username} is online!`));

client.on('messageCreate', message => {
    if(message.author.bot || message.channel.type === discord.ChannelType.DM) return;
    
    if(!message.content.startsWith(config.prefix)) return;
    
    let args = message.content.substring(config.prefix.length).split(" ");
    
    const vc = connections.get(message.guild.id);
    message.channel.send(message.author);
    switch(args[0].toLowerCase()){
        case 'spam':
            if(!args[1]) return;
            const taggedUser = message.mentions.users.first();
            const numTimes = Math.max(3,args[2]);
            if(!taggedUser) return;
            for(i = 0; i < numTimes; i++) {
                message.channel.send(`<@${taggedUser.id}>`);
            }
            break;
        case 'pfp':
            if(!args[1]) return;
            const user = args[1];
            let avatarUrl = user.displayAvatarURL();
            return message.channel.send(avatarUrl);
            break;
        case 'play':
            if(!message.member.voice.channel && !message.guild.me.voice.channel) return message.channel.send({content: `Please join a voice channel in order to play a song!`});
            if(!args[1]) return message.channel.send({content: `Please provide a song`});
            const uvc = message.member.voice.channel || message.guild.me.voice.channel;
            audioManager.play(uvc, args[1], {
                quality: 'high',
                audiotype: 'arbitrary',
                volume: 10
            }).then(queue => {
                connections.set(uvc.id, uvc);
                if(queue === false) message.channel.send({content: `Your song is now playing!`});
                else message.channel.send({content: `Your song has been added to the queue!`});
            }).catch(err => {
                console.log(err);
                message.channel.send({content: `There was an error while trying to connect to the voice channel!`});
            });
            break;
        case 'skip':
            if(!vc) return message.channel.send({content: `There is currently nothing playing!`});
            audioManager.skip(vc).then(() => message.channel.send({content: `Successfully skipped the song!`})).catch(err => {
                console.log(err);
                message.channel.send({content: `There was an error while skipping the song!`});
            });
            break;
        case 'stop':
            if(!vc) return message.channel.send({content: `There is currently nothing playing!`});
            audioManager.stop(vc);
            message.channel.send({content: `Player successfully stopped!`});            
            break;
        case 'queue':
            if(!vc) return message.channel.send({content: `There is currently nothing playing!`});
            const queue = audioManager.queue(vc).reduce((text, song, index) => {
                if(song.title) text += `**[${index + 1}]** ${song.title}`;
                else text += `**[${index + 1}]** ${song.url}`;
                return text;
            }, `__**QUEUE**__`);
            const queueEmbed = new discord.MessageEmbed()
            .setColor(`BLURPLE`)
            .setTitle(`Queue`)
            .setDescription(queue);
            message.channel.send({embeds: [queueEmbed]});
            break;
        case 'volume':
            if(!vc) return message.channel.send({content: `There is currently nothing playing!`});
            if(!args[1]) return message.channel.send({content: `Please provide the volume`});
            if(Number(args[1]) < 1 || Number(args[1]) > 10) return message.channel.send({content: `Please provide a volume between 1-10`});
            audioManager.volume(vc, Number(args[1]));
            break;
    }
});

client.login("");
