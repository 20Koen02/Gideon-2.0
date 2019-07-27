import { Command } from "klasa";
import { CommandStore, CommandOptions } from "klasa";
import { ILanguage, i18nStrings } from "../../../typings";

export class GideonCommand extends Command {
  private _desc: (i18n: ILanguage<i18nStrings>) => string | string[];
  constructor(store: CommandStore, file: string[], directory: string, options: CommandOptions) {
    super(store, file, directory, options);
    this._desc = options.desc
  }

  get desc() {
    return (language = this.client.i18n[this.client.config.defaultLang]) => this._desc(language);
  }
}