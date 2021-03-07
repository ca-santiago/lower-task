import { Router } from "express";
import { SpaceRouter, WorkspaceRouter } from "../modules/Workspace/infra/router";

const RouterV1 = Router();

RouterV1.use("/spaces", SpaceRouter);
RouterV1.use("/workspaces", WorkspaceRouter);

export default RouterV1;
