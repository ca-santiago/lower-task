import { Router } from "express";
import { authenticateRequest } from "./middlewares/authenticate";
import {
  createTaskController,
  createWorkspaceController,
  getSpaceByOwnerController,
} from ".";
import {
  deleteTaskController,
  getTasksByWorkspaceController,
  getWorkspacesByOwnerController,
} from "./controllers";

// Space ROUTER SECTION
const SpaceRouter = Router();

SpaceRouter.get("/:id", authenticateRequest, (req, res) =>
  getSpaceByOwnerController.execute(req, res)
);

SpaceRouter.get("/", authenticateRequest, (req, res) => {
  getSpaceByOwnerController.execute(req, res);
});

// Workspace ROUTER SECTION
const WorkspaceRouter = Router();

WorkspaceRouter.put("/", authenticateRequest, (req, res) =>
  createWorkspaceController.execute(req, res)
);

WorkspaceRouter.get("/", authenticateRequest, (req, res) =>
  getWorkspacesByOwnerController.execute(req, res)
);

// Tasks ROUTER SECTION

WorkspaceRouter.put("/:id/tasks", authenticateRequest, (req, res) =>
  createTaskController.execute(req, res)
);

WorkspaceRouter.get("/:wsId/tasks", authenticateRequest, (req, res) =>
  getTasksByWorkspaceController.execute(req, res)
);

WorkspaceRouter.delete(
  "/:wsId/tasks/:taskId",
  authenticateRequest,
  (req, res) => deleteTaskController.execute(req, res)
);

export { SpaceRouter, WorkspaceRouter };
