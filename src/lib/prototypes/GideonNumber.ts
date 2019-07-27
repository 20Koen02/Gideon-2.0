export class GideonNumber extends Number {
  constructor(value:number) {
      super(value);
      Object.setPrototypeOf(this, Object.create(GideonNumber.prototype));
  }
  toHumanString() {
    const thousand = 1000, million = 1000000, billion = 1000000000;
  
    if (this.valueOf() >= billion) return `${trimFloat(this.valueOf() / billion)}b`;
    else if (this.valueOf() >= million) return `${trimFloat(this.valueOf() / million)}m`;
    else if (this.valueOf() >= thousand) return `${trimFloat(this.valueOf() / thousand)}k`;
    else return String(this);
  }
};

const trimFloat = (float:any): number => {
	float = float.toFixed(1);
	// eslint-disable-next-line eqeqeq
	if (float == parseInt(float)) {
		return parseInt(float);
	}
	return float;
}