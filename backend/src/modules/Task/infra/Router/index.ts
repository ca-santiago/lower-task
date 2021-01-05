
import { Router } from 'express'
import { VerifyHeaderToken } from '../../../../shared/infra/middlewares/verifyBearerToken';
import { 
   createTaskController, delteTaskController, findTaskByContentController,
   updateTaskController, getTasksByOwnerController
} from '../Controllers';

const TaskRouter = Router();

TaskRouter.post('/',
    VerifyHeaderToken,
    (req, res) => createTaskController.execute(req, res)
);

TaskRouter.get('/s/',
    VerifyHeaderToken,
    (req, res) => findTaskByContentController.execute(req, res)
);

TaskRouter.delete('/:id',
    VerifyHeaderToken,
    (req, res) => delteTaskController.execute(req, res)
);

TaskRouter.put('/:id',
    VerifyHeaderToken,
    (req, res) => updateTaskController.execute(req, res)
)

TaskRouter.get('/owner/:id',
    VerifyHeaderToken,
    (req, res) => getTasksByOwnerController.execute(req, res)
)

export default TaskRouter;
