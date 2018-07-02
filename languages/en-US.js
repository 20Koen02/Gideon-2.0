const Language = require(`${process.cwd()}/structures/Language.js`);

module.exports = class enUSLanguage extends Language {

    constructor(...args) {
        super(...args);

        this.texts = {
            //Weather
            WEATHER_LANGUAGE: "en",

            //8ball
            FORTUNES: [
                "🎱 **⇾** ✅ It is certain.",
                "🎱 **⇾** ✅ It is decidedly so.",
                "🎱 **⇾** ✅ Without a doubt.",
                "🎱 **⇾** ✅ Yes - definitely.",
                "🎱 **⇾** ✅ You may rely on it.",
                "🎱 **⇾** ✅ As I see it, yes.",
                "🎱 **⇾** ✅ Most likely.",
                "🎱 **⇾** ✅ Outlook good.",
                "🎱 **⇾** ✅ Yes.",
                "🎱 **⇾** ✅ Signs point to yes.", 
                "🎱 **⇾** ❓ Reply hazy try again.",
                "🎱 **⇾** ❓ Ask again later.",
                "🎱 **⇾** ❓ Better not tell you now.",
                "🎱 **⇾** ❓ Cannot predict now.",
                "🎱 **⇾** ❓ Concentrate and ask again.",
                "🎱 **⇾** ❌ Don't count on it.",
                "🎱 **⇾** ❌ My reply is no.",
                "🎱 **⇾** ❌ My sources say no.",
                "🎱 **⇾** ❌ Outlook not so good.",
                "🎱 **⇾** ❌ Very doubtful."
            ],

            // Emoji
            MAX_CHARS: "The maximal amount of characters is 25.",
            MIN_CHARS: "Please provide text to turn into emoji",

            //Ping
            PING_FETCH: "Fetching ping...",

            //Urban
            URBAN_DEFINITION: (defenition) => `Definition of: *${defenition}*`,
            URBAN_EXAMPLE: "Example:",
            URBAN_WORD_NOT_FOUND: "❌ I can't find that word in the Urban Dictionary!",

            // Music 
            USER_NOT_IN_VOICE: "❌ You are not in a voice channel!",
            CLIENT_NO_PERMS_CONNECT: "❌ I do not have permissions to connect to your channel!",
            CLIENT_NO_PERMS_SPEAK: "❌ I do not have permissions to speak in your channel!",
            MUSIC_ADD_PLAYLIST: "✅ All songs from the playlist are added to the queue:",
            MUSIC_TOO_LONG_NORMALUSER: "❌ Song is too long! Max length is 15 minutes",
            MUSIC_NO_SONG_FOUND: "❌ I can not find that song",
            VOICE_CONNECTED: "✅ Succesfully joined your channel!",
            MUSIC_ADDED: "✅ Succesfully added song!",
            NO_ARGUMENTS: "❌ Please give me some arguments"
        };
    }
};
