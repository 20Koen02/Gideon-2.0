const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

/**
 * Delay the entire process by specified ms.
 * @param {number} ms Time in ms.
 * @returns {Promise<*>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get a random integer value in the provided range.
 * @since 2.0.0
 * @param {number} min Minimum value of the range.
 * @param {number} max Maximum value of the range.
 * @returns {number} Random value in the range.
 */
function randomInt(min = 1, max = 100) {
    if (typeof min !== "number") throw new TypeError("Miminum for the range must be integer.");
    if (typeof max !== "number") throw new TypeError("Maximum for the range must be integer.");
    if (max <= min) throw new Error("Can't determine the range if min >= max.");
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Verify if the user responded with yes or no.
 * @since 2.0.0
 * @param {Channel} channel The d.js channel instance.
 * @param {User} user The d.js user instance.
 * @param {number} time The time limit to wait for the response.
 * @returns {boolean} Where user choosed yes, no or none.
 */
async function verifyYesNo(channel, user, time = 30000) {
    // The terms accepted as yes and no alternatives...
    const yes = ["yes", "y", "ye", "yeah", "yup", "yea"];
    const no = ["no", "n", "nah", "nope"];

    const filter = res => {
        const value = res.content.toLowerCase();
        return res.author.id === user.id && (yes.includes(value) || no.includes(value));
    };
    const verify = await channel.awaitMessages(filter, { max: 1, time });
    if (!verify.size) return 0;
    const choice = verify.first().content.toLowerCase();
    if (yes.includes(choice)) return true;
    return false;
}

/**
 * Parse the duration timestamp and provide formatted string.
 * @since 2.0.0
 * @param {number} duration The duration timestamp.
 * @param {boolean} [showIn=false] Where to display "In" or not.
 * @returns {string} The parsed duration string.
 * @example
 * const { getDuration } = require('../path/to/this_file');
 * console.log(getDuration(216000000, true))
 * // Output will be "In 2 days and 12 hours"
 */
function getDuration(duration) {
    const seconds = Math.floor(duration / SECOND) % 60;
    if (duration < MINUTE) return seconds === 1 ? "a second" : `${seconds} seconds`;

    const minutes = Math.floor(duration / MINUTE) % 60;
    let output = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (duration >= HOUR) {
        const hours = Math.floor(duration / HOUR);
        output = `${hours.toString().padStart(2, "0")}:${output}`;
    }

    return output;
}

/**
 * Get a random date in between the specified range
 * @since 2.0.0
 * @param {number} start The timestamp since when date can be fetched
 * @param {number} end The timestamp upto which date can be fetched
 * @returns {Date} The random date between the possible range.
 */
function getRandomDate(start, end) {
    end = end || Date.now();
    if (start > end) throw "Please make sure starting date timestamp is lower than ending date timestamp.";
    return new Date(randomInt(start, end));
}

/**
 * Get a random unique entry from an array.
 * <INFO> This function is useful when you want unique random entries from array everytime.
 * 		 As it returns a random entry and the array without that entry.
 * 		 Next time while calling the function the filtered array can be provided.
 * </INFO>
 * @param {*} array The input array.
 * @returns {*} {randomEntry, filterdArray}
 */
function getUniqueRandom(array) {
    const randomized = array.shuffle();
    const randomEntry = randomized.shift();
    return {
        entry: randomEntry,
        array: randomized
    };
}

module.exports = { getDuration, verifyYesNo, randomInt, getRandomDate, delay, getUniqueRandom };
