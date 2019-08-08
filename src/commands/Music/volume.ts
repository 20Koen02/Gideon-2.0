import { applyOptions } from "@lib/Util/Util";
import { CommandOptions, Command, KlasaMessage } from "klasa";


@applyOptions<CommandOptions>({
  desc: (i18n) => i18n.get("desc_volume"),
  usage: "[volume:integer]",
  runIn: ["text"]
})

export default class MusicCommand extends Command {

	async run(message:KlasaMessage, [volume]:[number?]) {
    const { music } = message.guild;
    if (!music.playing) return message.translate("cmd_music_notplaying");
    if (!volume) return message.send(`:speaker: | **Guild's Current Music Volume is:** ${music.volume}`);
    if (volume <= 0 || volume > 100) return message.send(`:x: **Volume can not be lower than 0 or higher than 100.**`);
    
    await music.setVolume(volume);

    return message.send(`:white_check_mark: **Volume has been set to:** ${volume}`);
  }
};
