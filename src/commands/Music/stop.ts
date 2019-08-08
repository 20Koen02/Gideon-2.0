import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_stop"),
  runIn: ["text"]
})

export default class MusicCommand extends Command {

	async run(message:KlasaMessage) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");

    const vc = music.voiceChannel ? music.voiceChannel.members.size <= 4 : true;
    if (await message.hasAtLeastPermissionLevel(3) || vc) {
      await music.destroy();
      return message.send(`:x: **Queue cleared, leaving voice channel.**`);
    } else {
      return message.send(`:x: **There are members in the VC right now, use skip instead!**`);
    }
  }
};
