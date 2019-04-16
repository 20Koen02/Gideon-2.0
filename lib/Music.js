const klasa = require("klasa");

module.exports = {
    // Export everything from Klasa
    ...klasa,

    // Lib/structures
    MusicCommand: require("./structures/MusicCommand"),
    MusicManager: require("./structures/MusicManager"),
    util: require("./Util"),

    // Export Klasa's util as klasaUtil
    klasaUtil: klasa.util
};
