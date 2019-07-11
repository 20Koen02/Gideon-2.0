export class GideonString extends String {
  constructor(value:string) {
      super(value);
      Object.setPrototypeOf(this, Object.create(GideonString.prototype));
  }
  toTitleCase() {
    return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  shorten(maxLen?:number) {
    if (!maxLen) return String(this);
    return this.length > maxLen ? `${this.substr(0, maxLen - 3)}...` : String(this);
  }
};