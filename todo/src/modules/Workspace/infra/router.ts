import { Router } from "express";
import { authenticateRequest } from "./middlewares/authenticate";
import {
  createTaskController,
  createWorkspaceController,
  getSpaceByOwnerController,
} from ".";

// TODO Create router for Workspace
const SpaceRouter = Router();

SpaceRouter.put("/", authenticateRequest, (req, res) =>
  createWorkspaceController.execute(req, res)
);

SpaceRouter.get("/:id", authenticateRequest, (req, res) =>
  getSpaceByOwnerController.execute(req, res)
);

SpaceRouter.put("/:id/tasks", authenticateRequest, (req, res) =>
  createTaskController.execute(req, res)
);

export { SpaceRouter };
