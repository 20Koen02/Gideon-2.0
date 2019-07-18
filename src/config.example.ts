import { KlasaClientOptions, PermissionLevels } from "klasa";
import { Client } from "discord.js";

export const KlasaConfig: KlasaClientOptions = {
  production: false,
  prefix: "",
  regexPrefix: /^(hey )?(gideon)(,|!)/i,
  readyMessage: (client:Client) => `Successfully initialized. Ready to serve ${client.guilds.size} guild${client.guilds.size === 1 ? '' : 's'}.`,
  disableEveryone: true,
  presence: {
    status: "online",
    activity: {
      name: "gideonbot.xyz",
      type: "WATCHING"
    }
  },

  fetchAllMembers: false,

  commandEditing: true,
	commandLogging: true,
  typing: false,

  pieceDefaults: {
		commands: {
			aliases: [],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			description: '',
			enabled: true,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			promptLimit: 0,
			promptTime: 30000,
			requiredSettings: [],
			requiredPermissions: 0,
			runIn: ['text', 'dm'],
			subcommands: false,
			usage: '',
			quotedStringSupport: false,
			deletable: true
		},
		events: {
			enabled: true,
			once: false
		}
  },

  permissionLevels: new PermissionLevels()
    .add(0, () => true)
    .add(10, (message) => ["255009837002260482", "209609796704403456"].includes(message.author.id) ? true : false)
};

export const token: string = "";

export const mongodb = {
	url: ""
}