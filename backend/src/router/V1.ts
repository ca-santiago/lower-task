import { Router } from "express";
import TaskRouter from "../modules/Task/infra/Router";

const RouterV1 = Router()

RouterV1.use('/tasks', TaskRouter)

export default RouterV1;
