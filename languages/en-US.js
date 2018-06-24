const Language = require(`${process.cwd()}/structures/Language.js`);

module.exports = class enUSLanguage extends Language {

    constructor(...args) {
        super(...args);

        this.texts = {
            // Music stuffs
            VOICE_NO_CHANNEL_USER: 'You are not connected in a voice channel.',
            VOICE_NO_CHANNEL_BOT: 'I am not connected in a voice channel.',
            VOICE_NOT_SAME_CHANNEL: 'You must be in the same voice channel as me.',
            VOICE_SEARCH_TERM: 'You must provide a search term.',
            VOICE_NOT_FOUND: (string) => `No result found for **${string}**`,
            VOICE_CHOOSE_TRACK: 'Choose the track you want to play, react with `❌` to cancel the process.\n`NOTE`: __You have 15 seconds to make your decision.__\n',
            VOICE_DISCARD: 'Its completely fine if you dont want to listen to music...',
            VOICE_ADDED: (song, user) => `🎧 Added **${song}** as requested by ${user}`,
            VOICE_NOT_CHOOSEN: (user) => `${user}, No song is choosen within the specified time.`,
            VOICE_AUTOPLAY_ENABLE: 'Autoplay has been enabled.',
            VOICE_AUTOPLAY_DISABLE: 'Autoplay has been disabled.',
            VOICE_CONNECTED: (channel) => `Successfully joined the voice channel ${channel}`,
            VOICE_DISCONNECTED: (channel) => `Successfully left the voice channel ${channel}`,
            VOICE_ALREADY_PAUSED: 'The stream is already paused.',
            VOICE_PAUSED: '⏸ Paused',
            VOICE_FIRST_ADD: (prefix) => `Add some songs to the queue first with \`${prefix}add\``,
            VOICE_ALREADY_PLAYING: 'Already Playing',
            VOICE_QUEUE_OVER: '⏹ We\'ve run out of songs! Better queue up some more tunes.',
            VOICE_PLAYING: (song, user) => `🎧 Playing: **${song}** as requested by: ${user}`,
            VOICE_NOT_PLAYING: (status) => `I am not playing a song. Current status: \`${status}\``,
            VOICE_QUEUE_NO_SONG: 'There is no song in the queue.',
            VOICE_NOT_PAUSED: 'The stream is not paused.',
            VOICE_RESUMED: '▶ Resumed',
            VOICE_REPEAT_ENABLE: 'Music will now be repeated.',
            VOICE_REPEAT_DISABLE: 'Music wont be repeated now.',
        };
    }

};
