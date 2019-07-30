import { Inhibitor, KlasaMessage, Command } from "klasa";

export default class CooldownInhibitor extends Inhibitor {
  async run(message:KlasaMessage, command:Command) {
		const { broke, permission } = await this.client.permissionLevels.run(message, command.permissionLevel);
    if (!permission) throw broke ? message.i18n.get('inhibitor_permissions') : true;
	}
}