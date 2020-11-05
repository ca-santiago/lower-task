
import { Router } from 'express'
import { createTaskController } from '../Controllers';

const TaskRouter = Router();

TaskRouter.post('/', (req, res) => createTaskController.execute(req, res));

export default TaskRouter;
