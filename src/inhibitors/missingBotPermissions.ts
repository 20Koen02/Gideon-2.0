import { Inhibitor, KlasaMessage, Command, util } from "klasa";
import { Permissions, BitField, PermissionString, TextChannel } from "discord.js";
const { FLAGS } = Permissions;

export default class CooldownInhibitor extends Inhibitor {
  private friendlyPerms: any;
  private impliedPermissions: Readonly<BitField<PermissionString>>;
  run(message:KlasaMessage, command:Command) {
    const missing = message.channel.type === 'text' ?
			(message.channel as TextChannel).permissionsFor(this.client.user).missing(command.requiredPermissions, false) :
			this.impliedPermissions.missing(command.requiredPermissions, false);

		if (missing.length) throw message.language.get('inhibitor_missing_bot_perms', { missing: missing.map(key => this.friendlyPerms[key]).join(', ') });

  }
  
  async init() {
    this.impliedPermissions = new Permissions(515136).freeze();

		this.friendlyPerms = Object.keys(FLAGS).reduce((obj:any, key) => {
			obj[key] = util.toTitleCase(key.split('_').join(' '));
			return obj;
		}, {});
  }
}