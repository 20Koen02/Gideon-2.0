import { Schema, model } from "mongoose";
import { IModel, IGideonGuild } from "../../../../typings";

const schema = new Schema({
	guildid: { type: String }
});

schema.statics.findOrCreate = async function (query: any) {
	const result = await this.findOne(query);
	if (!result) return new this(query);
	return result;
};
export const GideonGuild = model<IGideonGuild, IModel<IGideonGuild>>("gideon", schema, "gideonguilds"); 