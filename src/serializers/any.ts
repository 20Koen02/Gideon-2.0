import { Serializer } from "klasa";
export default class extends Serializer {

	async deserialize(data:any) {
		return data;
	}

};
