export class GideonArray<T> extends Array<T> {
  constructor(items?: Array<T>) {
      super(...items);
      Object.setPrototypeOf(this, Object.create(GideonArray.prototype));
  }
  random() {
    return this[Math.floor(Math.random() * this.length)];
  }

  shuffle() {
    let t1, j, ret = this.slice(0), i = ret.length;
    while (--i > 0) {
		  t1 = ret[j = Math.round(Math.random() * i)];
		  ret[j] = ret[i];
      ret[i] = t1;
    }
	  return ret;
  }
};