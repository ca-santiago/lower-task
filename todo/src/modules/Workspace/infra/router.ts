import { Router } from "express";
import { createWorkspaceController, getSpaceByOwnerController } from ".";
import { authenticateRequest } from "./middlewares/authenticate";

const SpaceRouter = Router();

SpaceRouter.put("/", authenticateRequest, (req, res) =>
  createWorkspaceController.execute(req, res)
);

SpaceRouter.get("/:id",
  authenticateRequest,
	(req, res) => getSpaceByOwnerController.execute(req, res)
);

export { SpaceRouter };
