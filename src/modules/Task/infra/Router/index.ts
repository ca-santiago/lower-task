
import { Router } from 'express'
import { createTaskController, delteTaskController, findTaskByContentController } from '../Controllers';

const TaskRouter = Router();

TaskRouter.post('/', (req, res) => createTaskController.execute(req, res));

TaskRouter.get('/many', (req, res) => findTaskByContentController.execute(req, res));

TaskRouter.delete('/:id', (req, res) => delteTaskController.execute(req, res));

export default TaskRouter;
