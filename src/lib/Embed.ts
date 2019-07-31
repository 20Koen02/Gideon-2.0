import { MessageEmbed } from "discord.js";
import { KlasaMessage } from "klasa";

export const Embed = ({ client } : KlasaMessage, { footer = true, text, color = 0x36393e } : { footer?: boolean, text?: string, color?:number|string }) => {
  const embed = new MessageEmbed().setColor(color);
  footer ? embed.setFooter(`© ${client.user.username} 2019${text ? ` | ${text}` : ""}`) : null;
  return embed;
};