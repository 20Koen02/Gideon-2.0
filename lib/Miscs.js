const { MessageEmbed } = require('discord.js');
const snek = require('snekfetch');
const { version } = require('../package.json');

/**
 * Some misc functions made for code-duplicaiton reduction.
 */
class Miscs {

	/**
	 * Constructs the Miscs class.
	 * @param {GideonClient} client The discord.js client instance.
	 * @since 2.0.0
	 */
  constructor(client) {
    if (!client) throw new Error('Client is required.');
    this.client = client;
  }

	/**
	 * Custom Embed for the client which looks cool.
	 * @param {Object} [options={}] Custom embed options.
	 * @param {boolean} [options.footer=true] whether to add footer or not.
	 * @param {string} [options.text] custom text to add to footer.
	 * @returns {MessageEmbed} The embed ready to be used directly.
	 */
  Embed(options = {}) {
    if (!options.hasOwnProperty('footer')) options.footer = true;
    if (options.text && typeof options.text !== 'string') throw new Error('Text must be string.');

    const embed = new MessageEmbed()
      .setColor('#36393E');
    if (options.footer === true) {
      embed.setFooter(`© ${this.client.user.username} 2018 ${options.text ? ` | ${options.text}` : ''}`);
    }
    return embed;
  }

	/**
	 * Custom request method expanded from snek.get with user-agent setup.
	 * @param {string} URL The URL to be requested.
	 * @param {string} method The method to call on the API. Can be get, post or whatever snekfetch supports.
	 * @returns {snek} Snekfetch result.
	 */
  request(URL, method = 'get') {
    return snek[method](URL).set('User-Agent', `${this.client.user.username}-v${version} - Koen02#7956`);
  }

	/**
	 * Verify if a valid discord user can be fetched from the provided string|object or not.
	 * @since 2.0.0
	 * @param {Message} message The d.js message.
	 * @param {string} user The user to be checked.
	 * @returns {user} The discord user object.
	 */
  async verifyUser(message, user) {
    let member;
    const idMatch = /(?:<@!?)?([0-9]{17,20})>?/gi.exec(user);
    if (idMatch) return this.client.users.fetch(idMatch[1]);
    if (/(#[0-9]{4})$/.test(user)) member = message.guild.members.find(membr => membr.user.tag.toLowerCase() === user.toLowerCase());
    else member = message.guild.members.find(membr => membr.user.username.toLowerCase() === user.toLowerCase());
    if (member) return member.user;
    throw new Error(`${user} doesnt seems to be valid user`);
  }

	/**
	 * Verify if the provided string is a valid d.js guild member or not.
	 * @since 2.0.0
	 * @param {*} message The d.js message.
	 * @param {*} member The member to be checked.
	 * @returns {member} The discord member object.
	 */
  async verifyMember(message, member) {
    if (!message.guild) throw new TypeError('A member cant be found outside the guild.');
    const user = await this.verifyUser(message, member);
    return message.guild.members.fetch(user);
  }

	/**
	 * Check whether the provided string is valid d.js channel or not.
	 * @param {message} message The d.js message.
	 * @param {string} channelID The string to be checked.
	 * @param {Object} options The options for check.
	 * @returns {Channel} Resolvable d.js channel object.
	 */
  async verifyChannel(message, channelID, options = {}) {
    if (options && typeof options !== 'object') throw new Error('');
    if (options && !options.hasOwnProperty('textOnly')) options.textOnly = true;
    const match = /([0-9]{17,20})/.exec(channelID);
    if (!match) {
      const nameCh = message.guild.channels.find(ch => ch.name.toLowerCase() === channelID.toLowerCase());
      if (nameCh && options.textOnly ? nameCh.type === 'text' : true) return nameCh;
      else throw new Error(`Seems like ${channelID} is not a valid ${options.textOnly ? 'test' : ''} channel.`);
    }
    const id = match[1];
    const check = message.guild.channels.get(id);
    if (!check || check.type !== 'text') throw new Error(`Seems like ${channelID} is not a valid text channel.`);
    return check;
  }

	/**
	 * Verify if the role with provided name or ID exists in the guild.
	 * @param {message} msg The d.js message.
	 * @param {string} name The name to be resolved.
	 * @returns {Role} The role matching the criteria.
	 */
  async verifyRole(msg, name) {
    const match = /^(?:<@&)?(\d{17,21})>?$/gi.exec(name);
    if (match) {
      const id = match[1];
      const role = msg.guild.roles.get(id);
      if (!id) throw new Error(`Seems like \`${name}\` is not a valid role mention/id.`);
      return role;
    }
    const role = msg.guild.roles.filter(rol => rol.name.toLowerCase().includes(name.toLowerCase()));
    if (!role.size) throw new Error(`No role with name \`${name}\` is found.`);
    return role.first();
  }

}

module.exports = Miscs;