import { Serializer, SerializerOptions, SchemaPiece } from "klasa";
import { applyOptions } from "../lib/Util/Util";
import { Guild, Channel } from "discord.js";

@applyOptions<SerializerOptions>({
	aliases: ["textchannel", "voicechannel", "categorychannel"]
})
export default class extends Serializer {

	checkChannel(data:any, entry:SchemaPiece, language:any, guild:Guild) {
		if (
			entry.type === "channel" ||
			(entry.type === "textchannel" && data.type === "text") ||
			(entry.type === "voicechannel" && data.type === "voice") ||
			(entry.type === "categorychannel" && data.type === "category")
		) return data;
		throw guild.i18n.get("resolver_invalid_channel", { name: entry.key });
	}

	async deserialize(data:any, entry:SchemaPiece, language:any, guild:Guild) {
		if (data instanceof Channel) return this.checkChannel(data, entry, language, guild);
		const channel = Serializer.regex.channel.test(data) ? (guild || this.client).channels.get(Serializer.regex.channel.exec(data)[1]) : null;
		if (channel) return this.checkChannel(channel, entry, language, guild);
		throw guild.i18n.get("resolver_invalid_channel", { name: entry.key });
	}

	serialize(value:any) {
		return value.id;
	}

	stringify(value:any) {
		const c = this.client.channels.get(value) || { name: (value && value.name) } || value;
		return c.name;
	}

};
