import { Document, model, Schema } from "mongoose";
import { MongooseTypedSchema } from "../../../../shared/types/TypedSchema";
import { SpaceRepoDTO } from "../../mapper/space/repo.dto";

const SchemaDef: MongooseTypedSchema<SpaceRepoDTO> = {
  _id: String,
  name: String,
  owner: String,
	maxWorkspaces: Number,
	totalWorkspaces: Number,
};

interface SpaceDocument extends Document, SpaceRepoDTO {
  _id: string;
}
const SpaceSchema = new Schema(SchemaDef);

export const SpaceModel = model<SpaceDocument>("Space", SpaceSchema);
