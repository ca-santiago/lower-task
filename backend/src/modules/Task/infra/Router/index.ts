
import { Router } from 'express'
import { authenticateRequest } from '../../../user/infra/middlewares';
import { 
   createTaskController, delteTaskController, findTaskByContentController,
   updateTaskController, getTasksByOwnerController
} from '../Controllers';

const TaskRouter = Router();

TaskRouter.post('/',
    authenticateRequest,
    (req, res) => createTaskController.execute(req, res)
);

TaskRouter.get('/s/',
    authenticateRequest,
    (req, res) => findTaskByContentController.execute(req, res)
);

TaskRouter.delete('/:id',
    authenticateRequest,
    (req, res) => delteTaskController.execute(req, res)
);

TaskRouter.put('/:id',
    authenticateRequest,
    (req, res) => updateTaskController.execute(req, res)
)

TaskRouter.get('/owner/:id',
    authenticateRequest,
    (req, res) => getTasksByOwnerController.execute(req, res)
)

export default TaskRouter;
