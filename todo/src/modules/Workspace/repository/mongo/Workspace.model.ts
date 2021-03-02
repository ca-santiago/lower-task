import { Document, Schema, model } from "mongoose";
import { MongooseTypedSchema } from "../../../../shared/types/TypedSchema";
import { WorkspaceRepoDTO } from "../../mapper/workspace/repo.dto";

export interface WorkspaceDocument extends Document, WorkspaceRepoDTO {
  _id: string;
}

const WsSchemaDef: MongooseTypedSchema<WorkspaceRepoDTO> = {
  _id: String,
  owner: String,
  name: String,
  maxCollaborators: Number,
  maxTasks: Number,
  collabs: [
    {
      id: String,
      email: String,
      name: String,
    },
  ],
};
const WsSchema = new Schema(WsSchemaDef);

export const WorkspaceModel = model<WorkspaceDocument>("Workspace", WsSchema);
