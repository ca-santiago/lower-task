import { Router } from "express";
import { SpaceRouter } from "../modules/Workspace/infra/router";

const RouterV1 = Router();

RouterV1.use("/workspaces", SpaceRouter);

export default RouterV1;
