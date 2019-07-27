import { applyOptions } from "../../lib/Util/Util";
import { CommandOptions, Command } from "klasa";
import { Embed } from "../../lib/Embed";
import { KlasaMessage } from "klasa";
import { GideonCommand } from "../../lib/GideonCommand/GideonCommand";

@applyOptions<CommandOptions>({
  aliases: ["commands"],
  guarded: true,
  description: language => language.get("COMMAND_HELP_DESCRIPTION"),
  desc: lang => lang.get("cmd_help"),
  usage: "(Command:command)"
})

export default class HelpCommand extends GideonCommand {

  async init() {
    this.createCustomResolver("command", (arg, possible, message) => {
      if (!arg || arg === "") return undefined;
      return this.client.arguments.get("command").run(arg, possible, message);
    });
  }

    async run(msg:KlasaMessage, [cmnd]:[Command]) {
        const embed = Embed(msg, {});

        if (cmnd) {
            embed
                .setTitle(`${cmnd.name} command`)
                .setDescription(
                    [
                        `_**Help**_ | __**${cmnd.name}**__`,
                        cmnd.description,
                        ``,
                        "_**Command Usage**_",
                        `\`${this.client.options.prefix}${cmnd.usage}\``,
                        cmnd.aliases.length ? `\n_**Aliases**_\n${cmnd.aliases.map(cmd => `${cmd}`).join(", ")}\n` : ""
                    ].join("\n")
                );
            return msg.sendEmbed(embed);
        }

        const help = await this.buildHelp(msg);

        embed
            .setTitle(`${this.client.user.username}'s commands`)
            .setDescription(
                `Type \`${this.client.options.prefix}help <commandName>\` for detailed information about a command.`
            );
        for (const cat of Object.keys(help)) {
            embed.addField(
                `**→ ${cat} [${help[cat].length}]**`,
                help[cat]
                    .sort()
                    .map((cmd: string) => `\`${cmd}\``)
                    .join(", ")
            );
        }
        return msg.sendEmbed(embed);
    }

    async buildHelp(message:KlasaMessage) {
        const help: any = {};

        const filteredList = this.client.commands.filter(cmd => !cmd.hidden);

        await Promise.all(
            filteredList.map(command =>
                this.client.inhibitors
                    .run(message, command, true)
                    .then(() => {
                        if (!help.hasOwnProperty(command.category)) help[command.category] = [];
                        help[command.category].push(command.name);
                    })
                    .catch(() => null)
            )
        );
        return help;
    }
};
