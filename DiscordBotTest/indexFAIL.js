/*
Sources:     https://www.youtube.com/watch?v=qVyqqtwkb8c
             https://www.npmjs.com/package/discordaudio
*/

/* ran 
npm install @discordjs/voice libsodium-wrappers 
npm install ffmpeg-static
npm install @discordjs/opus
npm install discordaudio@latest

*/


const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, CommandInteractionOptionResolver} = require(`discord.js`);

// VC Stuff
const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { AudioManager } = require('discordaudio');
const audioManager = new AudioManager();
// VC Stuff

const prefix = '>';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
client.on("ready", () => {
    
    console.log("Bot is online!");

    client.user.setActivity(`to Troll or not to Troll`, { type: "PLAYING"});

})

client.on("messageCreate", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    // Message array
    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];




    /*************************Commands**********************************/

    // Test Command
    if(command === 'test') {
        message.channel.send("Bot is working" + messageArray[1]);
    }

    if(command === 'spam') {
        const taggedUser = message.mentions.users.first();
        if(messageArray[2] < 1) return;
        const numTimes = Math.max(3,messageArray[2]);
        if(!taggedUser) return;
        for(i = 0; i < numTimes; i++) {
            message.channel.send(`<@${taggedUser.id}>`);
        }
    }
    const listCMDS = [ 'play', 'leave', 'l', 'skip', 'stop', 'queue'];
    if(listCMDS.includes(command)) {
        if(!message.member.voice.channel) return message.channel.send("Please connect to a voice channel!"); 
        //If you are not in the voice channel, then return a message
        //message.channel.send((`${message.member.user.tag} is connected to ${message.member.voice.channel.name}!`));

        /* Joining The VC */
        const connection = joinVoiceChannel(
            {
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
        
            /* Playing the Audio */
            const uvc = message.member.voice.channel || message.guild.me.voice.channel;
            audioManager.play(uvc, messageArray[1], {
                quality: 'high',
                audiotype: 'arbitrary',
                volume: 10
            }).then(queue => {
                if(queue === false) message.channel.send({content: `Your song is now playing!`});
                else message.channel.send({content: `Your song has been added to the queue!`});
            }).catch(err => {
                console.log(err);
                message.channel.send({content: `There was an error while trying to connect to the voice channel!`});
            });

        if(command === 'leave' || command === 'l' ) {
            player.stop();
            connection.disconnect();
            connection.destroy();
        }
    };
    
})


// General ID: 1040430088782610484

client.login("");
