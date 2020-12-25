
import mongoose, { Document } from 'mongoose';
import { MongooseTypedSchema } from '../../../../shared/types/TypedSchema';
import { TaskPersistenceDTO } from '../../mapper/PersistenceDTO'

export interface TaskDocument extends TaskPersistenceDTO, Document {
  _id: string
}

const TaskSchemaDef: MongooseTypedSchema<TaskPersistenceDTO> = {
  _id: String,
  content: String,
  createdAt: String,
  title: String,
  owner: String,
}

const TaskSchema = new mongoose.Schema(TaskSchemaDef);
export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);
