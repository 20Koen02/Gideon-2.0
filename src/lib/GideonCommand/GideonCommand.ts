import { Command } from "klasa";
import { CommandStore, CommandOptions } from "klasa";
import { ILanguage, i18nStrings } from "typings";

export class GideonCommand extends Command {
  private _desc: (i18n: ILanguage<i18nStrings>) => string | string[];
  constructor(store: CommandStore, file: string[], directory: string, options: CommandOptions) {
    super(store, file, directory, options);
    this._desc = options.desc || (() => "No description given");
    this.description = this.desc1();
  }

  desc(lang:ILanguage<i18nStrings>) {
    return this._desc(lang) as string;
  }
  private desc1() : string {
    let a: string;
    let _a = this.desc(this.client.i18n[this.client.config.defaultLang]);
    if(Array.isArray(_a)) a = _a.join(" "); else a = _a as string;
    return a;
  }
}