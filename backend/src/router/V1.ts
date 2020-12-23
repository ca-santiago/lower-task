
import { Router } from 'express'
import TaskRouter from "../modules/Task/infra/Router";
import { UserRouter } from '../modules/user/infra/Router';

const RouterV1 = Router()

RouterV1.use('/tasks', TaskRouter)
RouterV1.use('/users', UserRouter)

export default RouterV1;
