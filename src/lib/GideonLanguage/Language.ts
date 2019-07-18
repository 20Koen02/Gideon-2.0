export class Language<LanguageStrings> {
  lang: string;
  strings: LanguageStrings;
  constructor(lang:string, strings:LanguageStrings) {
    this.strings = strings;
    this.lang = lang
  }
}