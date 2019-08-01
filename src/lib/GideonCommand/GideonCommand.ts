import { Command } from "klasa";
import { CommandStore, CommandOptions } from "klasa";
import { ILanguage, i18nStrings } from "typings";
import { ExecFileOptionsWithStringEncoding } from "child_process";

export class GideonCommand extends Command {
  private _desc: (i18n: ILanguage<i18nStrings>) => string | string[];
  constructor(store: CommandStore, file: string[], directory: string, options: CommandOptions) {
    super(store, file, directory, options);
    this._desc = options.desc
  }

  get desc() {
    this.description = this.desc1();
    return (language = this.client.i18n[this.client.config.defaultLang]) => this._desc(language);
  }
  private desc1() : string {
    let a: string;
    let _a = (language = this.client.i18n[this.client.config.defaultLang]) => this._desc(language);
    if(Array.isArray(_a)) a = _a.join(" "); else a = _a.toString();
    return a;
  }
}