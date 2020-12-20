
import mongoose, { Document } from 'mongoose';
import { TaskPersistenceDTO } from '../../mapper/PersistenceDTO'

export interface TaskDocument extends TaskPersistenceDTO, Document {
  id: string;
}

const TaskModel = new mongoose.Schema<TaskDocument>({
  _id: String,
  content: String,
  createdAt: String,
  title: String,
});

export default mongoose.model<TaskDocument>('Task', TaskModel);
