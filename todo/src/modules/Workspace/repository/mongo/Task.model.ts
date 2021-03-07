import { Document, model, Schema } from "mongoose";
import { MongooseTypedSchema } from "../../../../shared/types/TypedSchema";
import { TaskRepoDTO } from "../../mapper/task/repo.dto";

interface TaskDocument extends Document, TaskRepoDTO {
  _id: string;
}

const TaskSchemaDef: MongooseTypedSchema<TaskRepoDTO> = {
  _id: String,
  content: String,
  createAt: String,
  owner: String,
  workspace: String,
};

const TaskSchema = new Schema(TaskSchemaDef);

export const TaskModel = model<TaskDocument>("Task", TaskSchema);
