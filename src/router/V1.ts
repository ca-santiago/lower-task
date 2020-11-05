
import { Router } from 'express'
import TodoRouter from "../modules/todo/infra/Router";

const RouterV1 = Router()

RouterV1.use('/tasks', TodoRouter)

export default RouterV1;
